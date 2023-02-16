import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import * as web3 from 'web3';

export const isAddress = (control: any): ValidationErrors | null => {
  return { invalidAddress: !web3.default.utils.isAddress(control.value) };
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

  getToErrorMessage() {
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

  getImageErrorMessage() {
    if (!this.image.touched) {
      return;
    }

    return this.to.hasError('required') ? 'field is required' : '';
  }
}
