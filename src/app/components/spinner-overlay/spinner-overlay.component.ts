import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner-overlay',
  template: '<mat-spinner></mat-spinner>',
  styles: [
    `
      :host {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.2);
        z-index: 999;
        width: 100vw;
        height: 100vh;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerOverlayComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
