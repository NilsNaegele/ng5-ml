import { Pipe, PipeTransform } from '@angular/core';

import { News } from '../models/news';
@Pipe({
  name: 'orderBy',
  pure: false
})
export class OrderByPipe implements PipeTransform {
  transform(input: Array<News>, property: string, order: boolean): Array<News> {
        if (!input) { return []; }
        input.sort((a: News, b: News) => {
          return order ? b[property] - a[property] : a[property] - b[property];
        });
        return input;
  }
}
