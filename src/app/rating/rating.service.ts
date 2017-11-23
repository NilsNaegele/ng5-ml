import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { News, NewsId } from '../models/news';
import { Rating } from '../models/rating';
import { RatingLogic } from './rating.logic';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class RatingService implements OnInit {
  private newsCollection: AngularFirestoreCollection<News>;
  newsItems: Observable<News[]>;

  private trends: Rating[] = [];
  protected numberOfTrends = 20;

  constructor(private ratingLogic: RatingLogic, private afs: AngularFirestore) {
    this.newsCollection = afs.collection<any>('Collector');
    this.newsItems = this.newsCollection.valueChanges();
    this.trends = ratingLogic.getTrends(this.numberOfTrends);
  }
  ngOnInit(): void {
    this.getNews();
  }

  getNews(): Observable<News[]> {
    return this.newsItems;
  }

  getTrends(): Rating[] {
    return this.trends;
  }

  rateNews(): News[] {
    const news: News[] = [];
    this.newsItems.subscribe(snapshots => {
                snapshots.forEach((snapshot) => {
                  let newsRank = 0;
                  const title = snapshot.title;
                  const desc = snapshot.description === undefined ? '' : snapshot.description;
                  const date = snapshot.pubDate;
                  const link = snapshot.link;
                  newsRank = this.ratingLogic.rateTrends(`${title} ${desc}`) + this.ratingLogic.rateDate(date);
                  news.push({
                    title: title,
                    link: link,
                    description: desc,
                    rank: newsRank
                  });
                });
              });
          return news;
        }
    }
