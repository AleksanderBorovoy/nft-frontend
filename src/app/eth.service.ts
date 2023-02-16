import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as ethers from 'ethers';
import ContractArtifact from '../assets/NFTCollection.json';
import FactoryArtifact from '../assets/NFTFactory.json';
import { NFTCollection } from '../../../nft-collection/typechain-types/contracts/NFTCollection';
import { Factory } from '../../../nft-collection/typechain-types/contracts/Factory';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root',
})
export class EthService {
  public walletAddress$$: BehaviorSubject<{ address: string | null }> =
    new BehaviorSubject<{ address: string | null }>({ address: null });

  public provider$$: BehaviorSubject<ethers.providers.Web3Provider | null> =
    new BehaviorSubject<ethers.providers.Web3Provider | null>(null);

  public contractName$$: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );

  public contractSymbol$$: BehaviorSubject<string> =
    new BehaviorSubject<string>('');

  private contract$$: BehaviorSubject<NFTCollection | null> =
    new BehaviorSubject<NFTCollection | null>(null);

  public contractAddress$$: BehaviorSubject<string | null> =
    new BehaviorSubject<string | null>(null);
  constructor(private loaderService: LoaderService) {
    this.contractAddress$$.next(localStorage.getItem('contractAddress'));
  }

  public getContractFactory(): ethers.ethers.ContractFactory {
    return ethers.ContractFactory.fromSolidity(
      ContractArtifact,
      this.getSigner()
    );
  }

  public getFactoryFactory(): ethers.ethers.ContractFactory {
    return ethers.ContractFactory.fromSolidity(
      FactoryArtifact,
      this.getSigner()
    );
  }

  public getSigner(): ethers.ethers.providers.JsonRpcSigner | undefined {
    return this.provider$$.value?.getSigner();
  }

  public getContractAddress(): string | null {
    return localStorage.getItem('contractAddress');
  }

  public getContract() {
    if (
      !this.getContractAddress() ||
      !this.getSigner() ||
      !this.walletAddress$$.value
    ) {
      return;
    }

    if (this.contract$$.value == null) {
      this.contract$$.next(
        new ethers.Contract(
          this.getContractAddress() as string,
          ContractArtifact,
          this.getSigner() as ethers.ethers.providers.JsonRpcSigner
        ) as unknown as NFTCollection
      );
    }

    return this.contract$$.value;
  }

  public getFactoryContract() {
    return new ethers.Contract(
      '0x1496f5b56a9D9A4225d4F3DFD0cFc2081657494a',
      FactoryArtifact,
      this.getSigner() as ethers.ethers.providers.JsonRpcSigner
    ) as unknown as Factory;
  }

  public async connectWallet(): Promise<void> {
    if (this.provider$$.value == null) {
      this.provider$$.next(
        new ethers.providers.Web3Provider((window as any).ethereum)
      );
    }

    let addresses = await this.provider$$.value?.send(
      'eth_requestAccounts',
      []
    );
    if (addresses[0]) this.walletAddress$$.next({ address: addresses[0] });
  }

  public async deployContract(name: string, symbol: string): Promise<void> {
    let contractAddress;
    try {
      this.loaderService.showSpinner();
      let transaction = await this.getFactoryContract().deployCollection(
        name,
        symbol
      );
      await transaction.wait();
      let tr = await this.provider$$.value?.getTransactionReceipt(
        transaction.hash
      );
      contractAddress = tr?.logs![0].address;
    } finally {
      this.loaderService.hideSpinner();
    }
    this.loaderService.contractDeploing$$.next(true);
    try {
      this.contractAddress$$.next(contractAddress ?? '');
      this.contractName$$.next(name);
      this.contractSymbol$$.next(symbol);
      localStorage.setItem(
        'contractAddress',
        this.contractAddress$$.value ?? ''
      );
    } finally {
      this.loaderService.contractDeploing$$.next(false);
    }
  }

  public updateNameAndSymbol() {
    this.getContract()
      ?.functions.name()
      .then((name) => this.contractName$$.next(name as unknown as string));

    this.getContract()
      ?.functions.symbol()
      .then((symbol) =>
        this.contractSymbol$$.next(symbol as unknown as string)
      );
  }
}
