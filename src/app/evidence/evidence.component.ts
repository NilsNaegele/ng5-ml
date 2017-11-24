import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
              <table class="table table-hover">
              <thead>
                  <tr class="bg-dark text-white">
                      <th colspan="3">Processing Words</th>
                  </tr>
                  <tr class="bg-dark text-white">
                    <th scope="col">#</th>
                    <th scope="col">Words</th>
                    <th scope="col">Raw Value</th>
                 </tr>
            </thead>
            <tbody *ngFor="let w of evidenceService.words; let i = index; let even = even;
                    let odd = odd; let first = first; let last = last;">
              <tr class="text-white" [class.bg-primary]="even" [class.bg-success]="odd"
                [class.bg-warning]="last" [class.bg-danger]="first">
                <th scope="row">{{ i + 1 }}</th>
                <td>{{ w.key }}</td>
                <td>{{ w.value }}</td>
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
              private afs: AngularFirestore,
              private http: HttpClient) {
    this.ratedNewsCollection = afs.collection<News>('RatedNews', ref => ref.orderBy('rank', 'desc').limit(1));
    this.ratedNewsItems = this.ratedNewsCollection.valueChanges();

  }

  analyzeWords(link: string) {
      this.evidenceService.wordAnalyzer(link);
      this.getYahooQueryURL(link).subscribe(data => console.log(data.query.results.result));
  }

  getYahooQueryURL(link) {
     return this.http.get<any>(`
        https://query.yahooapis.com/v1/public/yql?q=select * from htmlstring where
        url='${link}'and xpath='//*[contains(@class,"paragraph")]|//p'&format=json
        &diagnostics=true&env=store://datatables.org/alltableswithkeys&callback=`);
  }


  ngOnInit() {
    this.ratedNewsItems.subscribe(rate => {
          this.analyzeWords(rate[0].link);
    });
  }

}
