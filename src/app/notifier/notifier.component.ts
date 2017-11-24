import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument,
         AngularFirestoreCollection } from 'angularfire2/firestore';

import { NotifierService } from './notifier.service';
import { NotifierConfig } from './notifier.config';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-notifier',
  template: `
            <div class="container-fluid">
                  <h3>Notifier:</h3>
                  <div class="row">
                    <div class="col-md-6">
                    <h3>Current Settings</h3>
                      <div class="input-group input-group-lg">
                        <span class="input-group-addon form-control">
                          <input type="checkbox" name="news"
                                 [(ngModel)]="model.notify"
                                 (ngModelChange)="updateDataBase(model.notify)"
                                 aria-label="Checkbox for news">
                          &nbsp;Find, Rate && Save News
                        </span>
                      </div>
                    <div class="input-group input-group-lg mt-2">
                      <span class="input-group-addon form-control">
                        Notify me via:
                      </span>
                      <div class="btn-group">
                        <select class=" btn btn-danger btn-lg"
                        [(ngModel)]="model.notifier" name="notifier"
                        (ngModelChange)="updateDataBase(model.notifier)">
                        <option *ngFor="let notifier of notifiers"
                            [value]="notifier">
                            {{ notifier }}
                        </option>
                        </select>
                      </div>
                    </div>
                    <div class="input-group input-group-lg mt-2">
                      <span class="input-group-addon form-control">
                        News threshold:
                      </span>
                      <div class="btn-group">
                      <select class=" btn btn-primary btn-lg"
                      [(ngModel)]="model.threshold" name="threshold"
                      (ngModelChange)="updateDataBase(model.threshold)">
                      <option *ngFor="let threshold of thresholds"
                          [value]="threshold">
                          {{ threshold }}
                      </option>
                      </select>
                      </div>
                    </div>
                 </div>
                    <div class="col-md-6">
                        <h3>Suggested News</h3>
                        <div class="media" *ngFor="let ratedNews of ratedNewsItems | async | orderBy:'rank':true">
                          <img class="mr-3" src="https://www.gamepoint.com/images/common/icons/icon_news_medium.png" alt="news image">
                            <div class="media-body">
                            <h5 class="mt-0">{{ ratedNews?.title }}</h5>
                            {{ ratedNews?.description }}
                            <p><b>Date:</b> {{ ratedNews?.date }}</p>
                            <p *ngIf="ratedNews?.rank === 0; else elseBlock">Ranking: {{ ratedNews?.rank }}</p>
                            <ng-template #elseBlock>
                            <p class="d-inline-block bg-danger text-light">Ranking: {{ ratedNews?.rank }}</p>
                            </ng-template>
                            <a href="{{ ratedNews.link }}" target="_blank">
                                (read more)
                            </a>
                            </div>
                        </div>
                   </div>
                </div>
          </div>
  `,
  providers: [ NotifierService ],
  styleUrls: ['./notifier.component.css']
})
export class NotifierComponent implements OnInit {
  private notifierConfigDoc: AngularFirestoreDocument<NotifierConfig>;
  private notify: Array<boolean> = [true, false];

  private ratedNewsCollection: AngularFirestoreCollection<any>;
  ratedNewsItems: Observable<any[]>;

  notifiers: Array<string> = ['App', 'Email', 'SMS', 'Phone'];
  thresholds: string[] = ['High Rating', 'Medium Rating', 'Low Rating'];
  model = new NotifierConfig(false, 'App', 'Low Rating');
  notifierConfig: Observable<NotifierConfig>;

  constructor(private afs: AngularFirestore, private notifierService: NotifierService) {
    this.notifierConfigDoc = afs.doc<NotifierConfig>('Notifier/1');
    this.notifierConfig = this.notifierConfigDoc.valueChanges();

    this.ratedNewsCollection = afs.collection<any>('RatedNews');
    this.ratedNewsItems = this.ratedNewsCollection.valueChanges();

  }

  // fetch stored settings from db and initialize the component's private variables with them
  updateView() {
    this.notifierConfig.subscribe(snapshot => {
      if (snapshot) {
        this.model = {
          'notify': snapshot.notify,
          'notifier': snapshot.notifier,
          'threshold': snapshot.threshold
        };
      } else {
        this.notifierConfigDoc.set(this.model);
      }
      // schedule cron job based on values of view
      const notify = this.model.notify;
      const notifier = this.model.notifier;
      const threshold = this.model.threshold;
      if (notify === true) {
        this.notifierService.scheduler(notifier, threshold);
      }
    });
  }

  // listen to elements change event and persist any changes to firebase database
  updateDataBase(value: any): void {
      switch (value) {
        case true || false:
        this.model.notify = value;
        break;
        case 'App' || 'Email' || 'SMS' || 'Phone':
        this.model.notifier = value;
        break;
        case 'High Rating' || 'Medium Rating' || 'Low Rating':
        this.model.threshold = value;
        break;
      }
      this.notifierConfigDoc.update(this.model);

  }

  ngOnInit() {
    this.updateView();
  }

}
