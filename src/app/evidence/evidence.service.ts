import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable()
export class EvidenceService {
  words = [ { key: 'w1', value: 1}, { key: 'w2', value: 2} ];

  constructor(private http: HttpClient) { }

  wordCounts(url) {
    // get a url subscribe to its response and call other
    // functions to count words and their occurences in it.
    // ideally it will return an array of objects
    return this.words;
  }

  wordAnalyzer(link: string) {
    // this.getYahooQueryURL(link).subscribe(data => console.log(data.query.results.result));
  }

  getYahooQueryURL(link) {
     return this.http.get<any>(`
        https://query.yahooapis.com/v1/public/yql?q=select * from htmlstring where
        url='${link}'and xpath='//*[contains(@class,"paragraph")]|//p'&format=json
        &diagnostics=true&env=store://datatables.org/alltableswithkeys&callback=`);
  }

  getArticle(url) {}

}
