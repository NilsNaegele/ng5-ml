import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
  template: `
        <div class="container-fluid">
          <div class="row">
          <div class="col-md-12">
          <nav class="nav nav-tabs" id="myTab" role="tablist">
            <a class="nav-item nav-link active" id="nav-setting-tab"
               data-toggle="tab" href="#nav-settings" role="tab"
               aria-controls="nav-setting" aria-selected="true">
               <i class="material-icons">settings</i>
               </a>
            <a class="nav-item nav-link" id="nav-template-tab"
               data-toggle="tab" href="#nav-template" role="tab"
               aria-controls="nav-template" aria-selected="false">my template</a>
            <a class="nav-item nav-link" id="nav-atemplate-tab"
               data-toggle="tab" href="#nav-atemplate" role="tab"
               aria-controls="nav-atemplate" aria-selected="false">another one</a>
          </nav>
          </div>
          </div>
          <div class="row">
          <div class="col-md-12">
          <div class="tab-content" id="nav-tabContent">
          <div class="tab-pane fade show active" id="nav-settings" role="tabpanel"
            aria-labelledby="nav-setting-tab">
            <app-report-template></app-report-template>
          </div>
          <div class="tab-pane fade" id="nav-template" role="tabpanel"
               aria-labelledby="nav-template-tab">Placeholder for Reports Content</div>
          <div class="tab-pane fade" id="nav-atemplate" role="tabpanel"
               aria-labelledby="nav-atemplate-tab">Further Placeholder</div>
          </div>
          </div>
          </div>
       </div>
  `,
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
