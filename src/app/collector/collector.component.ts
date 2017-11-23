import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { CollectorService } from './collector.service';
import { News } from '../models/news';

import { Observable } from 'rxjs/Observable';



@Component({
  selector: 'app-collector',
  template: `
            <div [class.container-fluid]="isContainer">
              <div class="row">
                <h4>{{ caption }}</h4>

                <!--<ul>
                    <li *ngFor="let news of newsItems | async">
                      {{ news.title }}
                    </li>
                </ul>-->

              </div>
              <div class="row">
                <ul class="list-group">
                    <li [hidden]="cbox.checked" [style.backgroundColor]="odd ? '#ffe6e6' : '#e6ffe6'"
                    class="list-group-item"
                    *ngFor="let headline of headlines | async; let idx = index; let odd = odd;">
                            <input type="checkbox" #cbox
                             (change)="onChange(headline)">
                             {{ idx + 1 }} - {{ headline.title }}
                             {{ headline.pubDate }}
                             <a href="{{ headline.link }}" target="_blank">(read more)</a>
                    </li>
                </ul>
              </div>
            </div>
  `,
  providers: [ CollectorService ],
  styleUrls: ['./collector.component.css']
})
export class CollectorComponent {
  isContainer = true;
  caption = 'Some news worth investigating';
  headlines: Observable<News[]>;
  private newsCollection: AngularFirestoreCollection<any>;
  newsItems: Observable<News[]>;

  constructor(private collectorService: CollectorService, afs: AngularFirestore) {
    this.headlines = collectorService.getHeadlines();
    // console.log(this.headlines);
    this.newsCollection = afs.collection<News>('Collector');
    this.newsItems = this.newsCollection.valueChanges();
  }

  onChange(headline): void {
    this.newsCollection.add(headline);
  }

}
