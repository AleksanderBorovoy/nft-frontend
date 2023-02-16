import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';

import { map } from 'rxjs/operators';

import { LoaderService } from '../../loader.service';
import { EthService } from '../../eth.service';

import hljs from 'highlight.js';

@Component({
  selector: 'app-upload-contract',
  templateUrl: './upload-contract.component.html',
  styleUrls: ['./upload-contract.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadContractComponent {
  public name = new FormControl('', Validators.required);
  public symbol = new FormControl('', Validators.required);
  public contractDeploing$$ = this.loaderService.contractDeploing$$;

  constructor(
    public dialogRef: MatDialogRef<UploadContractComponent>,
    private loaderService: LoaderService,
    private ethService: EthService,
    private http: HttpClient
  ) {}

  code$ = this.http
    .get(`assets/contract.sol`, { responseType: 'arraybuffer' })
    .pipe(
      map((response) => {
        let enc = new TextDecoder('utf-8');
        return hljs.highlightAuto(enc.decode(response)).value;
      })
    );

  public get formInvalid(): boolean {
    return this.name.invalid || this.symbol.invalid;
  }

  public async deploy(): Promise<void> {
    await this.ethService.deployContract(
      this.name.value ?? '',
      this.symbol.value ?? ''
    );

    this.dialogRef.close();
  }
}
