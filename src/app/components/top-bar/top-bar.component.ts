import { ChangeDetectionStrategy, Component } from '@angular/core';

import * as ethers from 'ethers';
import { BehaviorSubject } from 'rxjs';

import { CardService } from '../../card.service';
import { EthService } from '../../eth.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBarComponent {
  private provider$$: BehaviorSubject<ethers.providers.Web3Provider | null> =
    this.ethService.provider$$;
  public walletAddress$$: BehaviorSubject<{ address: string | null }> =
    this.ethService.walletAddress$$;

  constructor(
    private ethService: EthService,
    private cardService: CardService
  ) {
    let ethereum = (window as any).ethereum;

    if (ethereum == null) return;

    this.provider$$.next(
      new ethers.providers.Web3Provider((window as any).ethereum)
    );

    this.provider$$.value?.listAccounts().then((accounts) => {
      if (accounts.length > 0) {
        this.walletAddress$$.next({
          address: accounts[0],
        });
        this.connectWallet();
      } else {
        this.walletAddress$$.next({
          address: accounts[0],
        });
      }
    });

    (window as any).ethereum.on('accountsChanged', (accounts: string[]) => {
      if (accounts[0]) {
        this.walletAddress$$.next({ address: accounts[0] });
        this.cardService.loadMore(4);
      } else {
        this.walletAddress$$.next({ address: null });
      }
    });
  }

  public async connectWallet(): Promise<void> {
    await this.ethService.connectWallet();
  }
}
