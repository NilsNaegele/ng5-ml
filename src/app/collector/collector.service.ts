import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class CollectorService implements OnInit {

        private apiURL = 'https://query.yahooapis.com/v1/public/yql?q=select%20title%2Clink%2Cdescription%2CpubDate%20from%20rss%20where%20url%3D%22http%3A%2F%2Frss.cnn.com%2Frss%2Fedition.rss%3Fformat%3Dxml%22&format=json&diagnostics=true&callback=';

        constructor(private http: HttpClient) {}

        getHeadlines(): Observable<any> {
          return this.http.get<any>(this.apiURL)
                          .map(data => data.query.results.item);
        }

        ngOnInit(): void {
          this.getHeadlines();
        }

}
