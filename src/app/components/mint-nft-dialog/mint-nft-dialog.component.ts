import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import * as web3 from 'web3';

export const isAddress = (control: any): ValidationErrors | null => {
  return !web3.default.utils.isAddress(control.value)
    ? { invalidAddress: true }
    : null;
};

@Component({
  selector: 'app-mint-nft-dialog',
  templateUrl: './mint-nft-dialog.component.html',
  styleUrls: ['./mint-nft-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MintNftDialog {
  public to = new FormControl('', [Validators.required, isAddress]);
  public image = new FormControl('', Validators.required);

  constructor(public dialogRef: MatDialogRef<MintNftDialog>) {}

  public mint(): void {
    const data = {
      to: this.to.value,
      tokenUri: {
        image: this.image.value,
      },
    };

    this.dialogRef.close(data);
  }

  public get submitDisabled(): boolean {
    return this.to.invalid || this.image.invalid;
  }

  public getToErrorMessage(): string | undefined {
    if (!this.to.touched) {
      return;
    }

    if (this.to.hasError('required')) {
      return 'field is required';
    }

    return this.to.hasError('invalidAddress')
      ? 'Not a valid address. Try sth like 0x94C0f7Af5EF25868cE59071e3e47248Cbf933545'
      : '';
  }

  public getImageErrorMessage(): string | undefined {
    if (!this.image.touched) {
      return;
    }

    return this.to.hasError('required') ? 'field is required' : '';
  }
}
