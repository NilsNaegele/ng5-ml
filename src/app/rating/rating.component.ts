import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { RatingLogic } from './rating.logic';
import { RatingService } from './rating.service';

import { Rating } from '../models/rating';
import { News } from '../models/news';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-rating',
  template: `
            <div class="container-fluid">
              <div class="row">
                <div class="col-md-3">
                  <ul class="list-group">
                      <h3 class="list-group-item active">Hot Trends</h3>
                      <li class="list-group-item d-flex justify-content-between align-items-center"
                          *ngFor="let trend of trends">
                          {{ trend.keyword }}
                          <span class="badge badge-primary badge-pill">
                          {{ trend.rank }}
                          </span>
                      </li>
                  </ul>
                </div>
                <div class="col-md-4">
                  <h3>Collected News (Collector Component)</h3>
                  <div *ngFor="let news of collectedNews | async; let odd = odd;">
                        <div *ngIf="news.description" class="alert alert-danger" role="alert"
                        [style.backgroundColor]="odd ? '#ffe6ff' : '#ffccff'">
                        <h5 class="alert-heading">{{ news.description }}</h5>
                        </div>
                  </div>
                </div>
                <div class="col-md-5">
                  <h3>Ranked News (Rating Component)</h3>
                  <div class="alert alert-primary" role="alert"
                      *ngFor="let rated of ratedNews | orderBy:'rank':true">
                    <h4 class="alert-heading">{{ rated.title }}</h4>
                     <p *ngIf="rated.rank < 2; else elseBlock">Ranking: {{ rated.rank }}</p>
                     <ng-template #elseBlock>
                     <p class="d-inline-block bg-danger text-light">Ranking: {{ rated.rank }}</p>
                     </ng-template>
                     <hr>
                    <a class="alert-link" href="{{ rated.link }}" target="_blank">
                    read more
                    </a>
                  </div>
                </div>
              </div>
            </div>
  `,
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit  {
  trends: Rating[] = [];
  collectedNews: Observable<News[]>;
  ratedNews: News[] = [];


  constructor(private ratingService: RatingService,
              private ratingLogic: RatingLogic,
              private afs: AngularFirestore) { }

  getNews(): void {
    // this.collectedNews = this.ratingService.getNews();
    this.collectedNews = this.afs.collection<News>('Collector').valueChanges();
  }

  getTrends(): void {
    this.trends = this.ratingService.getTrends();
  }

  // rateNews() {
  //   this.ratedNews = this.ratingService.rateNews();
  // }

  rateNews(): void {
    this.collectedNews.subscribe(snapshots => {
                snapshots.forEach((snapshot) => {
                  let newsRank = 0;
                  const title = snapshot.title;
                  const desc = snapshot.description === undefined ? '' : snapshot.description;
                  const date = snapshot.pubDate;
                  const link = snapshot.link;
                  newsRank = this.ratingLogic.rateTrends(`${title} ${desc}`) + this.ratingLogic.rateDate(date);
                  this.ratedNews.push({
                    title: title,
                    link: link,
                    description: desc,
                    rank: newsRank
                  });
                });
              });
        }

  ngOnInit(): void {
    this.getNews();
    this.getTrends();
    this.rateNews();
  }

}
