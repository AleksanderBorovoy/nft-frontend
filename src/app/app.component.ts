import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { UploadContractComponent } from './components/upload-contract/upload-contract.component';
import { LoaderService } from './loader.service';
import { EthService } from './eth.service';
import { CardService } from './card.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public readonly throttle = 300;
  public readonly scrollDistance = 1;
  public readonly scrollUpDistance = 2;

  public readonly contractDeploing$$ = this.loaderService.contractDeploing$$;
  public readonly walletAddress$$ = this.ethService.walletAddress$$;
  public readonly contractAddress$$ = this.ethService.contractAddress$$;

  constructor(
    private dialog: MatDialog,
    private loaderService: LoaderService,
    private ethService: EthService,
    private cardSerivice: CardService
  ) {}

  public get walletAddressExists(): boolean {
    return this.walletAddress$$.value.address != null;
  }

  public onScrollDown(load?: number): void {
    this.cardSerivice.loadMore(load);
  }

  public async openDeployContractDialog(): Promise<void> {
    this.dialog.open(UploadContractComponent, {
      minWidth: '350px',
      width: '770px',
      maxHeight: '95vh',
      disableClose: true,
    });
  }
}
