import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
  template: `
        <div class="container-fluid">
          <h4>Report Component</h4>
       </div>
  `,
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
