import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
        <div class="container-fluid">
            <h4>Home Component</h4>
        </div>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
