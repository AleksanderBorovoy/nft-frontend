import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-faraway-button',
  template: ` <button class="faraway-submit" mat-button [disabled]="disabled">
    <div class="d-flex align-center">
      <span>{{ text }}</span>
      <mat-spinner
        *ngIf="showSpinner"
        class="ml-16"
        diameter="20"
        color="accent"
      ></mat-spinner>
    </div>
  </button>`,
  styleUrls: ['./faraway-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FarawayButtonComponent {
  @Input()
  public disabled: boolean | undefined | null;

  @Input()
  public showSpinner?: boolean | undefined | null;

  @Input()
  public text?: string;
}
