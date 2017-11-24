import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class EvidenceService {
  words = [];
  private article = '';

  constructor(private http: HttpClient) { }

  wordCounts(url) {
    // get a url subscribe to its response and call other
    // functions to count words and their occurences in it.
    // ideally it will return an array of objects
    return this.words;
  }

  wordAnalyzer(link: string) {
    this.getArticle(this.getYahooQueryURL(link)).subscribe(data => {
      this.findKey(data, 'content');
      this.words = this.evaluateWords(this.countInstances(this.extractWords(this.article)));
      // console.log(this.words);
    });
  }

  saveInverseDocumentFrequency(instance) {
    const corpusSize = 1000;
    const docsWithWords = 55;
    return Math.log2(corpusSize / (1 + docsWithWords));
  }

  evaluateWords(instances): Array<any> {
      const words = [];
      const normFactor = this.calculateNorm(instances);
      instances.forEach((instance) => {
        const normalized = instance.count / normFactor;
        const inverseDocumentFrequency = this.saveInverseDocumentFrequency(instance);
        words.push({
          word: instance.word,
          count: instance.count,
          normalized: normalized.toFixed(5),
          idf: inverseDocumentFrequency.toFixed(5),
          tfidf_N: (normalized * inverseDocumentFrequency).toFixed(5),
          tfidf_C: (instance.count * inverseDocumentFrequency).toFixed(5)
        });
      });
      return words;
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
