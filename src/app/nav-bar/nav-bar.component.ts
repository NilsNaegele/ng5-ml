import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  template: `
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" [routerLink]="['/home']">Angular 5 ML</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <a class="nav-link" [routerLink]="['/collector']">Collector<span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" [routerLink]="['/rating']">Rating</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" [routerLink]="['/notifier']">Notifier</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" [routerLink]="['/evidence']">Evidence</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" [routerLink]="['/ai']">AI</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" [routerLink]="['/report']">Report</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" [routerLink]="['/autopilot']">AutoPilot</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" [routerLink]="['/accuracy']">Accuracy</a>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
  `,
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  constructor() { }

}
