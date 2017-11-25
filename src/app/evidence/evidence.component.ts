import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { News } from '../models/news';
import { EvidenceService } from './evidence.service';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-evidence',
  template: `
            <div class="container-fluid">
              <div class="row">
              <div class=col-md-5>
              <div class="card">
              <h4 class="card-header">Available News Items</h4>
                <div class="card-body">
                    <h4 class="card-title" *ngFor="let news of ratedNewsItems | async">
                        <div class="input-group">
                          <span class="input-group-addon">
                            <input type="radio" (click)="onSelect(news, true)"
                            aria-label="Radio button for following span">
                          </span>
                          <span class="form-control alert alert-warning">{{ news.title }}
                          <a href="{{ news.link}}" target="_blank">(more)</a>
                          </span>
                        </div>
                    </h4>
                    <div class="card-text">
                    <div class="input-group">
                        <input type="text" class="form-control" #urlBox
                        placeholder="Search for other URL News/Article here ..." aria-label="Search for...">
                        <span class="input-group-btn">
                        <button class="btn btn-warning text-white" (click)="onSelect(urlBox.value, false)"
                        type="button">Go!</button>
                        </span>
                    </div>
                    </div>
                </div>
             </div>
             <ul class="list-group mt-3">
                 <li class="list-group-item list-group-item-action active">Nominated keywords for corpus</li>
                 <li class="list-group-item">
                 <div class="input-group">
                    <input type="text" [(ngModel)]="supportKeywords" class="form-control" placeholder="Comma separated support keywords"
                      aria-label="Support keywords">
                 </div>
                 </li>
                 <li class="list-group-item">
                 <div class="input-group">
                    <input type="text" [(ngModel)]="mainKeyword" class="form-control" placeholder="Keyword of interest"
                      aria-label="Keyword interest">
                 </div>
                 </li>
                 <li class="list-group-item list-group-item-action">
                 <button type="submit" (click)="buildCorpus()" class="btn btn-dark btn-lg btn-block">
                 Fetch Articles For Corpus
                 </button>
                 </li>
            </ul>
            <div class="card mt-3 text-white bg-danger mb-3">
                  <h4 class="card-header">Extracted Contents:</h4>
                      <div class="card-body">
                            <div class="card-text">
                              {{ evidenceService.article }}
                              </div>
                      </div>
           </div>
        </div>
              <div class="col-md-7">
              <table class="table table-responsive-lg table-hover">
              <thead>
                  <tr class="bg-dark text-white">
                      <th colspan="6">
                      Processing Words ( corpus: {{ evidenceService.corpusSize }} items -
                                         vocabulary: {{ evidenceService.vocabularySize }} words )
                      </th>
                      <th colspan="1">
                      <button (click)="calculateIDFs()" type="button"
                              class="btn btn-default active">Calculate IDFs</button>
                      </th>
                  </tr>
                  <tr class="bg-dark text-white text-center">
                    <th scope="col">#</th>
                    <th scope="col">Words</th>
                    <th scope="col">Count</th>
                    <th scope="col">Normalized</th>
                    <th scope="col">IDF</th>
                    <th scope="col">TFIDF(C)</th>
                    <th scope="col">TFIDF(N)</th>
                 </tr>
            </thead>
            <tbody *ngFor="let w of evidenceService.words; let i = index; let even = even;
                    let odd = odd; let first = first; let last = last;">
              <tr class="text-white text-center" [class.bg-primary]="even" [class.bg-success]="odd"
                [class.bg-warning]="last" [class.bg-danger]="first">
                <th scope="row">{{ i + 1 }}</th>
                <td>{{ w.word }}</td>
                <td>{{ w.count }}</td>
                <td>{{ w.normalized }}</td>
                <td>{{ w.idf }}</td>
                <td>{{ w.tfidf_C }}</td>
                <td>{{ w.tfidf_N }}</td>
              </tr>
              </tbody>
              </table>
              </div>
              </div>
            </div>
  `,
  providers: [ EvidenceService ],
  styleUrls: ['./evidence.component.css']
})
export class EvidenceComponent implements OnInit {
  private ratedNewsCollection: AngularFirestoreCollection<News>;
  ratedNewsItems: Observable<News[]>;

  supportKeywords = '';
  mainKeyword = '';

  constructor(public evidenceService: EvidenceService,
              private afs: AngularFirestore) {
    this.ratedNewsCollection = afs.collection<News>('RatedNews', ref => ref.orderBy('rank', 'desc').limit(5));
    this.ratedNewsItems = this.ratedNewsCollection.valueChanges();

  }

  onSelect(item: any, isRadio: boolean) {
    // this.resetCounters();
    const URL = isRadio ? item.link : item;
    if (!URL) { return; }
    if (isRadio) {
    // this.evidenceService.wordAnalyzer(URL);
    }
  }

  calculateIDFs() {
    console.log('calculateIDFs clicked');
    // this.evidenceService.saveInverseDocumentFrequency();
  }

  buildCorpus() {
    if (this.supportKeywords && this.mainKeyword) {
      console.log(this.supportKeywords, this.mainKeyword);
      // this.evidenceService.corpusBuilder(this.mainKeyword, this.supportKeywords);
      this.supportKeywords = '';
      this.mainKeyword = '';
    }
  }

  analyzeWords(link: string) {
      this.evidenceService.wordAnalyzer(link);
  }

  ngOnInit() {
    this.ratedNewsItems.subscribe(rate => {
          if (rate && rate.length > 0) {
          this.analyzeWords(rate[0].link);
        }
    });
  }

}
