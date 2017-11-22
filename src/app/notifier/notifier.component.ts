import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifier',
  template: `
            <div class="container-fluid">
                  <h5>{{ data.collector }}</h5>
                  <h5>{{ data.rating }}</h5>
            </div>
  `,
  styleUrls: ['./notifier.component.css']
})
export class NotifierComponent implements OnInit {

  data = {
    collector: 'collecting data',
    rating: 'rating data'
  };

  constructor() { }

  ngOnInit() {
  }

}
