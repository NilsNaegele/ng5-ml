import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { environment } from '../../environments/environment';
import { Corpus } from '../models/corpus';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EvidenceService {
  private corpusCollection: AngularFirestoreCollection<any>;
  private corpusItems: Observable<Corpus[]>;
  private idfsCollection: AngularFirestoreCollection<any>;
  private idfsItems: Observable<any[]>;

  corpusSize = 342;
  vocabularySize = 0;
  words = [];
  article = '';

  constructor(private http: HttpClient, private afs: AngularFirestore) {
    this.corpusCollection = afs.collection<Corpus>('Evidence-Corpus-Articles');
    this.corpusItems = this.corpusCollection.valueChanges();

    this.idfsCollection = afs.collection<any>('Evidence-Corpus-IDFs');
    this.idfsItems = this.idfsCollection.valueChanges();
  }

  corpusBuilder(mainKeyword, supportKeywords) {
    // 1. fetch links for each keyword
    // 2. pass the link for extracting contents
    // 3. save them under corpus for further calculation
    this.resetCounters();
    const keywords = this.setKeywordArray(mainKeyword, supportKeywords);
    keywords.forEach((keyword: any) => this.fetchLinks(keyword));
  }

  setKeywordArray(mainKeyword, supportKeywords): string[] {
    let keywords = [];
    if (supportKeywords) {
      keywords = supportKeywords.split(',');
      keywords.forEach(keyword => {
        keywords.push(`${mainKeyword}, ${keyword}`);
      });
      keywords.unshift(mainKeyword);
      return keywords;
    }
  }

  fetchLinks(keyword) {
        environment.timeSpans.forEach((period) => {
          this.getSearchResults(this.getGoogleQueryUrl(keyword, period))
          .subscribe(data => data.forEach((item) => {
            this.wordAnalyzer(item.link);
          }));
        });
  }

  getGoogleQueryUrl(keyword: string, range: any): string {
    return `https://www.googleapis.com/customsearch/v1?key=${environment.googleSearchConfig.apiKey}
            &cx=${environment.googleSearchConfig.cx}&q=${keyword}&sort=${range.sort}&dateRestrict${range.span}`;
  }

  getSearchResults(url: string): Observable<any> {
    return this.http.get<any>(url).map(data => data.items);
  }

  resetCounters() {
    this.article = null;
    this.words = [];
  }

  wordCounts(url) {
    // get a url subscribe to its response and call other
    // functions to count words and their occurences in it.
    // ideally it will return an array of objects
    return this.words;
  }

  wordAnalyzer(link: string) {
    this.getArticle(this.getYahooQueryURL(link)).subscribe(data => {
      this.resetCounters();
      this.findKey(data, 'content');
      if (this.article) {
        this.evaluateWords(this.countInstances(this.extractWords(this.article))).then(words => {
          this.corpusCollection.add({article: this.article, link: link, bag_of_words: words });
        });
      }
      // this.words = this.evaluateWords(this.countInstances(this.extractWords(this.article)));
      // console.log(this.words);
    });
  }

  saveInverseDocumentFrequency() {
    const uniqueBagOfWords = {};

    // remove previous IDFs calculations every time a new article is added
    // this.IDF remove
    this.idfsCollection.snapshotChanges().map(snapshot => {
      this.corpusSize = snapshot.length;
      snapshot.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
      });
      snapshot.forEach(item => {
        item.payload['bag_of_words'].forEach(w => {
          uniqueBagOfWords.hasOwnProperty(w.word) ?
          uniqueBagOfWords[w.word]++ : uniqueBagOfWords[w.word] = 1;
        });
      });
      const words = Object.keys(uniqueBagOfWords);
      this.vocabularySize = words.length;
      words.forEach(word => {
        const idf = Math.abs(Math.log2(this.corpusSize / uniqueBagOfWords[word] + 1));
        this.idfsCollection.add({'word': word, 'doc_with_word': uniqueBagOfWords[word], 'IDF': idf});
        this.words.some((item) => {
          if (item.word === word) {
            item['idf'] = idf.toFixed(4);
            item['tfidf_C'] = (idf * item.count).toFixed(4);
            item['tfidf_N'] = (idf * item.normalized).toFixed(4);
            return true;
          }
        });
      });
    });
  }

  saveInverseDocumentFrequencyTest() {
     const corpusSize = 100;
     const docsWithWords = 55;
     return Math.log2(corpusSize / (1 + docsWithWords));
  }

  evaluateWords(instances) {
      const normFactor = this.calculateNorm(instances);
      this.vocabularySize = instances.length;
      return Promise.all(instances
        .filter((f) => f.word.length < 20)
        .map((w) => {
          const normalized = w.count / normFactor;
          const inverseDocumentFrequency = this.saveInverseDocumentFrequencyTest();
          w['normalized'] = normalized.toFixed(4);
          w['idf'] = inverseDocumentFrequency.toFixed(4);
          w['tfidf_N'] = (normalized * inverseDocumentFrequency).toFixed(4);
          w['tfidf_C'] = (w.count * inverseDocumentFrequency).toFixed(4);
          this.words.push(w);
          return w;
      }));
  }

  calculateNorm(rawWords: Array<any>): number {
    let total = 0;
    rawWords.forEach((word) => {
      total += word.count * word.count;
    });
    return Math.sqrt(total);
  }

  extractWords(article: string): Array<string> {
        // remove all symbols
        const pure = article.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()<>""]/g, '').toLowerCase();
        // extract all words between white spaces
        return pure.split(/\s+/);
  }

  countInstances(allWords: string[]) {
      // create object for word instances and counts
      const instances = {};
      allWords.forEach((word) => {
          if (instances.hasOwnProperty(word)) {
              instances[word]++;
          } else {
            instances[word] = 1;
          }
      });
      return this.sortWords(instances);
  }

  sortWords(instances): {word: string, count: number}[] {
    const words = [];
    const sortedWords = Object.keys(instances).sort((a, b) => instances[b] - instances[a]);
    sortedWords.forEach((word) => words.push({ word: word, count: instances[word] }));
    return words;
  }


  findKey(object, string) {
    for (const key of Object.keys(object)) {
      if (object[key] && typeof(object[key]) === 'object') {
        this.findKey(object[key], string);
      }
      if (key === string || typeof(key) === 'string' && key !== 'class'
              && key !== 'id' && key !== 'href') {
        this.article += object[key] + ' ';
      }
    }
    this.article = this.article.replace(/div|Article__paragraph|Article__pad|class/gi, '');
  }


  getYahooQueryURL(link): string {
     return `
        https://query.yahooapis.com/v1/public/yql?q=select * from htmlstring where
        url='${link}'and xpath='//*[contains(@class,"paragraph")]|//p'&format=json
        &diagnostics=true&env=store://datatables.org/alltableswithkeys&callback=`;
  }

  getArticle(url: string): Observable<any> {
    return this.http.get<any>(url).map(data => data.query.results);

  }

}
