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
                    <h4>Evidence:</h4>
              </div>
              <div class="row">
              <table class="table table-responsive-lg table-hover">
              <thead>
                  <tr class="bg-dark text-white">
                      <th colspan="7">Processing Words</th>
                  </tr>
                  <tr class="bg-dark text-white text-center">
                    <th scope="col">#</th>
                    <th scope="col">Words</th>
                    <th scope="col">Raw</th>
                    <th scope="col">Normalized Value</th>
                    <th scope="col">IDF Factor</th>
                    <th scope="col">TFIDF(C)</th>
                    <th scope="col">TFIDF(N)</th>
                 </tr>
            </thead>
            <tbody *ngFor="let w of evidenceService.words; let i = index; let even = even;
                    let odd = odd; let first = first; let last = last;">
              <tr class="text-white text-center" [class.bg-primary]="even" [class.bg-success]="odd"
                [class.bg-warning]="last" [class.bg-danger]="first">
                <th scope="row">{{ i + 1 }}</th>
                <td>{{ w.word | truncate:30 }}</td>
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
  `,
  styleUrls: ['./evidence.component.css']
})
export class EvidenceComponent implements OnInit {
  private ratedNewsCollection: AngularFirestoreCollection<News>;
  ratedNewsItems: Observable<News[]>;

  constructor(public evidenceService: EvidenceService,
              private afs: AngularFirestore) {
    this.ratedNewsCollection = afs.collection<News>('RatedNews', ref => ref.orderBy('rank', 'desc').limit(1));
    this.ratedNewsItems = this.ratedNewsCollection.valueChanges();

  }

  analyzeWords(link: string) {
      this.evidenceService.wordAnalyzer(link);
  }

  ngOnInit() {
    this.ratedNewsItems.subscribe(rate => {
          this.analyzeWords(rate[0].link);
    });
  }

}
