import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-home',
  template: `
        <div class="container-fluid">
            <button class="btn btn-primary" (click)="toggle()">Toggle</button>
            <h3 [@someCoolAnimation]="bindingVar">Tolerance, enlightenment, progress ...</h3>
        </div>
  `,
  animations: [
      trigger('someCoolAnimation', [
        transition('* => fadeIn', [
          style({ opacity: 0 }),
          animate(2000, style({ opacity: 1 }))
        ]),
        transition('* => fadeOut', [
          animate(2000, style({ opacity: 0 }))
        ])
      ])
  ]
})
export class HomeComponent {
  bindingVar = '';

  fadeIn() {
    this.bindingVar = 'fadeIn';
  }

  fadeOut() {
    this.bindingVar = 'fadeOut';
  }

  toggle() {
    this.bindingVar === 'fadeOut' ? this.fadeIn() : this.fadeOut();
  }


}
