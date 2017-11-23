import { Injectable } from '@angular/core';
import { CollectorService } from '../collector/collector.service';
import { RatingService } from '../rating/rating.service';

import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

@Injectable()
export class NotifierService {
  private cron = require('node-cron');
  private task;

  constructor(private collectorService: CollectorService,
              private ratingService: RatingService,
              private afs: AngularFirestore) {}

  scheduler() {

  }

  // implement logic for collect, rate and notification of news
  collectRateNotify(notifier, threshold) { }

}
