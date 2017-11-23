import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Rating } from '../models/rating';

@Injectable()
export class RatingLogic {
    private apiURL = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20%20from%20json%20where%20url%3D%22http%3A%2F%2Fhawttrends.appspot.com%2Fapi%2Fterms%2F%22&format=json&diagnostics=true&callback=';
    private trends: Rating[] = [];

    constructor(private http: HttpClient) { }

    getTrends(count: number): Rating[] {
      const trends: Rating[] = [];
      this.http.get<any>(this.apiURL)
               .toPromise()
               .then(data => data.query.results.json._)
               .then((data) => {
                 for (let i = 0; i < count; i++) {
                   trends.push({'keyword': data[i], 'rank': count - i});
                 }
               })
               .catch((err: HttpErrorResponse) => {
                 if (err.error instanceof Error) {
                   // client side or network error
                   console.log('An error occured:', err.error.message);
                 } else {
                   // backend unsuccessful response code
                   // response body may contain clues as to what went wrong
                   console.log(`Backend returned code ${err.status}, body is: ${err.error}`);
                 }
               });
               this.trends = trends;
               return trends;
     }

    // rate a given news item based on the trends
    rateTrends(newsItem: string): number {
      let trendsRank = 0;
      this.trends.forEach((trend) => {
          if (newsItem.toLowerCase().indexOf(trend.keyword.toLowerCase()) > 0) {
            trendsRank += 1;
          }
      });
      return trendsRank;
    }

    // rate a given news item based on publication date
    rateDate(newsDate: string): number {
      const last24Hours = 86400000; // 24*60*60*1000
      const now = new Date().getTime();
      const then = new Date(newsDate).getTime();
      return (now - then) < last24Hours ? 1 : 0;
     }

}
