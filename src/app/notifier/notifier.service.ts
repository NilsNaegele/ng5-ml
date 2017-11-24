import { Injectable } from '@angular/core';
import { CollectorService } from '../collector/collector.service';
import { RatingService } from '../rating/rating.service';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class NotifierService {
  private cron = require('node-cron');
  private threshold = [1, 5, 10];
  private ratedNewsCollection: AngularFirestoreCollection<any>;
  private items: Observable<any[]>;

  private eraseFactor = 12; // .5 day
  private maintenance: Observable<any[]>;

  private task;

  constructor(private collectorService: CollectorService,
              private ratingService: RatingService,
              private afs: AngularFirestore) {
                this.ratedNewsCollection = afs.collection<any>('RatedNews', ref => ref.orderBy('rank', 'asc'));
                this.items = this.ratedNewsCollection.valueChanges();
                this.maintenance = this.ratedNewsCollection.snapshotChanges().map(actions => {
                        return actions.map(a => {
                          const data = a.payload.doc.data();
                          const id = a.payload.doc.id;
                          return { id, ...data };
                        });
                });
              }

  scheduler(notifier: string, threshold: string) {
      const self = this;
      this.task = this.cron.schedule('* */23 * * *', function () {
        self.removeOldNews();
        self.collectRateNotify(notifier, threshold);
      });
  }

  removeOldNews() {
    this.maintenance.subscribe(snapshots => {
        snapshots.forEach((snapshot) => {
            const date = snapshot.date;
            if (this.isObsoleteNews(date) === true) {
              this.ratedNewsCollection.doc(snapshot.id).delete();
            }
        });
    });
  }

  isObsoleteNews(newsDate) {
    const eraseFactor = this.eraseFactor * 60 * 60 * 1000;
    const now = new Date().getTime();
    const then = new Date(newsDate).getTime();

    if ((now - then) > eraseFactor) {
      return true;
    }
    return false;
  }

  // implement logic for collect, rate and notification of news
  collectRateNotify(notifier: string, threshold: string): void {
    const thresholdRank = this.thresholdToRank(threshold);
    this.collectorService.getHeadlines().subscribe(data => {
      data.forEach((item: any) => {
        const trendRank = this.ratingService.ratingLogic.rateTrends(item.title + item.description);
        const dateRank = this.ratingService.ratingLogic.rateDate(item.pubDate);
        const newsRank = trendRank + dateRank;
        if (newsRank >= thresholdRank) {
          const ratedItem = {
            'title': item.title,
            'description': item.description ? item.description : '',
            'rank': newsRank,
            'date': item.pubDate ? item.pubDate : '',
            'link': item.link
          };
          this.ratedNewsCollection.add(ratedItem);
          if (notifier === 'Email') {
            this.emailNotification(ratedItem);
          }
        }
      });
    });

  }

  thresholdToRank(threshold: string): number {
    let rank = this.threshold[0];
    if (threshold === 'High Rating') { rank = this.threshold[2]; }
    if (threshold === 'Medium Rating') { rank = this.threshold[1]; }
    return rank;
  }

  emailNotification(ratedItem): void {
    console.log('email notification: ', ratedItem);
    // https://github.com/firebase/functions-samples/tree/master/email-confirmation
  }

}
