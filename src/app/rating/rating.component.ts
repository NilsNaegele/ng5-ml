import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  template: `
            <div class="container-fluid">
              <h4>Rating Component</h4>
            </div>
  `,
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
