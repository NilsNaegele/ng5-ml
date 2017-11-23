import { Injectable } from '@angular/core';
import { CollectorService } from '../collector/collector.service';
import { RatingService } from '../rating/rating.service';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class NotifierService {
  private cron = require('node-cron');
  private threshold = [2, 5, 10];
  private itemsCollection: AngularFirestoreCollection<any>;
  private items: Observable<any[]>;
  private task;

  constructor(private collectorService: CollectorService,
              private ratingService: RatingService,
              private afs: AngularFirestore) {
                this.itemsCollection = afs.collection<any>('RatedNews');
                this.items = this.itemsCollection.valueChanges();
              }

  scheduler(notifier: string, threshold: string) {
    // stop previous tasks
    // if (this.task != null) {
      // this.task.stop();
      console.log('in scheduler before cron job');
      const self = this;
      this.task = this.cron.schedule('* */12 * * *', function () {
        console.log('in scheduler method in notifier service');
        self.collectRateNotify(notifier, threshold);
      });

    // }

  }

  // implement logic for collect, rate and notification of news
  collectRateNotify(notifier, threshold): void {
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
          this.itemsCollection.add(ratedItem);
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
