import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
          <div class="container-fluid">
            <app-nav-bar></app-nav-bar>
            <div class="container mt-5">
                <router-outlet></router-outlet>
            </div>
          </div>

  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}
