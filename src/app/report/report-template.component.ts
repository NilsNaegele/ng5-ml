import { Component } from '@angular/core';


@Component({
  selector: 'app-report-template',
  template: `
  <div id="accordion" role="tablist">
  <div class="card">
    <div class="card-header" role="tab" id="headingOne">
      <h5 class="mb-0">
        <a data-toggle="collapse" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          my template
        </a>
        <button class="btn btn-default btn-sm float-right" type="button" (click)="delete()">
        <i class="material-icons">delete_forever</i>
        </button>
        <button class="btn btn-default btn-sm float-right" type="submit" (click)="save()">
        <i class="material-icons">save</i>
        </button>
      </h5>
    </div>
    <div id="collapseOne" class="collapse show" role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">
      <div class="card-body">
        <div class="row">
          <div class="col-md-5">
            <h3>General Settings</h3>
            <div class="jumbotron">
                <div class="form-group">
                  <label for="exampleFormControlInput1">Template name</label>
                  <input type="text" class="form-control"
                        id="exampleFormControlInput1" placeholder="my template">
                </div>
                <div class="row">
                  <div class="col-md-4">
                  <div class="input-group">
                    <span class="input-group-addon">
                      <input type="checkbox" aria-label="Checkbox for Corpus Size">
                    </span>
                    Corpus Size
                  </div>
                  </div>
                  <div class="col-md-4">
                  <div class="input-group text-sm">
                    <span class="input-group-addon">
                      <input type="checkbox" aria-label="Checkbox for Vocabulary Size">
                    </span>
                    Vocabulary Size
                  </div>
                  </div>
                  <div class="col-md-4">
                  <div class="input-group">
                    <span class="input-group-addon">
                      <input type="checkbox" aria-label="Checkbox for Print Button">
                    </span>
                    Print Button
                  </div>
                  </div>
                </div>
              </div>
            <h3>Corpus Settings</h3>
            <div class="jumbotron">
                <div class="row">
                <div class="input-group">
                  <span class="input-group-btn">
                    <div class="btn btn-secondary" type="button">Top</div>
                  </span>
                  <input type="text" class="form-control" placeholder="5" aria-label="frequency words">
                  <span class="input-group-btn">
                    <div class="btn btn-secondary" type="button">Frequent words in the Corpus</div>
                  </span>
                  </div>
                </div>
                <div class="row mt-2">
                <div class="input-group">
                  <span class="input-group-btn">
                    <div class="btn btn-dark" type="button">Top</div>
                  </span>
                  <input type="text" class="form-control" placeholder="5" aria-label="frequency idfs">
                  <span class="input-group-btn">
                    <div class="btn btn-dark" type="button">IDFs in the Corpus</div>
                  </span>
                  </div>
                </div>
                <div class="row mt-3">
                <div class="col-md-4">
                <div class="input-group">
                  <span class="input-group-addon">
                    <input type="checkbox" aria-label="Checkbox for Longest">
                  </span>
                  Longest
                </div>
                </div>
                <div class="col-md-4">
                <div class="input-group text-sm">
                  <span class="input-group-addon">
                    <input type="checkbox" aria-label="Checkbox for Avg Size">
                  </span>
                  Avg.
                </div>
                </div>
                <div class="col-md-4">
                <div class="input-group">
                  <span class="input-group-addon">
                    <input type="checkbox" aria-label="Checkbox for Shortest">
                  </span>
                  Shortest
                </div>
                </div>
                </div>
              </div>
          </div>
          <div class="col-md-7">
            <h3>Cluster Settings</h3>
            <div class="jumbotron">
                <div class="row">
                  <div class="col-md-6">
                    <div class="float-right font-weight-bold">Show graph for:</div>
                  </div>
                  <div class="col-md-6">
                  <div class="input-group">
                    <span class="input-group-addon">
                      <input type="checkbox" aria-label="Checkbox for Root Node">
                    </span>
                    Root node (main Keyword)
                  </div>
                  <div class="input-group">
                    <span class="input-group-addon">
                      <input type="checkbox" aria-label="Checkbox for Cluster Centers">
                    </span>
                    Cluster centers (Insight keywords)
                  </div>
                  <div class="input-group">
                    <span class="input-group-addon">
                      <input type="checkbox" aria-label="Checkbox for Article Nodes">
                    </span>
                    Article nodes
                  </div>
                  </div>
                  <div class="col-md-2">
                    <div class="font-weight-bold">Show:</div>
                  </div>
                  <div class="col-md-3">
                    <div class="input-group">
                      <span class="input-group-addon">
                        <input type="checkbox" aria-label="Article Size">
                      </span>
                      Article
                    </div>
                    </div>
                    <div class="col-md-3">
                      <div class="input-group">
                        <span class="input-group-addon">
                          <input type="checkbox" aria-label="Distance from Cluster Center">
                        </span>
                        Cluster
                      </div>
                      </div>
                      <div class="col-md-3">
                        <div class="input-group">
                          <span class="input-group-addon">
                            <input type="checkbox" aria-label="URL">
                          </span>
                          URL
                        </div>
                        </div>
                </div>
                <div class="row">
                <div class="input-group">
                  <span class="input-group-btn">
                    <div class="btn btn-secondary" type="button">List of</div>
                  </span>
                  <input type="text" class="form-control" placeholder="6" aria-label="top phrases root node">
                  <span class="input-group-btn">
                    <div class="btn btn-danger" type="button">phrases in article which contain root node (Main Keyword)</div>
                  </span>
                  </div>
                  <div class="input-group">
                    <span class="input-group-btn">
                      <div class="btn btn-secondary" type="button">List of</div>
                    </span>
                    <input type="text" class="form-control" placeholder="8" aria-label="top phrases cluster center">
                    <span class="input-group-btn">
                      <div class="btn btn-warning text-white" type="button">phrases in article which contain cluster center</div>
                    </span>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>
  `
})
export class ReportTemplateComponent {

  save() {
    console.log('save clicked');
  }
  delete() {
    console.log('delete clicked');
  }

 }
