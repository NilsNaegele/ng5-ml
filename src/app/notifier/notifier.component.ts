import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

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
                        <div>some news suggestion content here</div>
                   </div>
                </div>
          </div>
  `,
  styleUrls: ['./notifier.component.css']
})
export class NotifierComponent implements OnInit {
  private notifierConfigCollection: AngularFirestoreCollection<any>;
  private notify: Array<boolean> = [true, false];
  notifiers: Array<string> = ['App', 'Email', 'SMS', 'Phone'];
  thresholds: string[] = ['High Rating', 'Medium Rating', 'Low Rating'];
  model = new NotifierConfig(false, 'App', 'Low Rating');
  notifierConfig: Observable<any>;

  constructor(private afs: AngularFirestore) {
    this.notifierConfigCollection = afs.collection<NotifierConfig>('Notifier');
    this.notifierConfig = this.notifierConfigCollection.valueChanges();
    // this.updateView();
  }

  // fetch stored settings from db and initialize the component's private variables with them
  updateView() {
    this.notifierConfig.subscribe(snapshot => {
      if (snapshot) {
        console.log(snapshot);
        this.model = {
          'notify': snapshot[0].notify,
          'notifier': snapshot[0].notifier,
          'threshold': snapshot[0].threshold
        };
        console.log(this.model);
      } else {
        this.notifierConfigCollection.add(this.model);
      }
      // schedule cron job based on values of view
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
      if (this.model.notify !== undefined &&
          this.model.notifier !== undefined &&
          this.model.threshold !== undefined) {
      // this.updateItem();
      console.log('hello world');
    }
  }

  ngOnInit() {
    this.updateView();
  }

}
