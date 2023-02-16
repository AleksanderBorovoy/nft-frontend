import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { NFTCollection } from '../../../../../nft-collection/typechain-types/contracts/NFTCollection';
import { MintNftDialog } from 'src/app/components/mint-nft-dialog/mint-nft-dialog.component';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { EthService } from 'src/app/eth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-cards-header',
  templateUrl: './cards-header.component.html',
  styleUrls: ['./cards-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsHeaderComponent {
  public transactionLoader = false;
  public name$$: BehaviorSubject<string> = this.ethService.contractName$$;

  public symbol$$: BehaviorSubject<string> = this.ethService.contractSymbol$$;
  public signer: any;
  public contractAddress$$ = this.ethService.contractAddress$$;
  private contract: NFTCollection | null | undefined =
    this.ethService.getContract();

  @Output()
  private readonly nftMinted: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    public dialog: MatDialog,
    private ethService: EthService,
    private cdr: ChangeDetectorRef
  ) {
    this.ethService.updateNameAndSymbol();
  }

  async openDialog() {
    const dialogRef = this.dialog.open(MintNftDialog, {
      minWidth: '350px',
      width: '600px',
    });

    const data = await lastValueFrom(dialogRef.afterClosed());

    if (data && this.contract) {
      try {
        const mint = await this.contract.mint(
          data.to,
          JSON.stringify(data.tokenUri)
        );
        this.transactionLoader = true;
        this.cdr.markForCheck();
        await mint.wait();
        this.nftMinted.emit(1);
      } catch (e) {
        console.log(e, 'error');
      } finally {
        this.transactionLoader = false;
      }
    }
  }
}
