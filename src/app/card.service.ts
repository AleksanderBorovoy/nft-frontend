import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  concatMap,
  debounceTime,
  delay,
  filter,
  Subject,
  tap,
  throttleTime,
} from 'rxjs';
import { EthService } from './eth.service';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  public idsAccumulator: number[] = [];
  public cards$$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  public nftTrigger$$ = new Subject<number>();

  constructor(private ethService: EthService) {
    this.nftTrigger$$
      .pipe(
        delay(100),
        filter((id) => !this.idsAccumulator.find((accumId) => accumId === id)),
        tap((id) => this.idsAccumulator.push(id)),
        concatMap(async (id) => {
          let image;
          let owner;
          try {
            const tokenUri = await this.ethService
              .getContract()
              ?.functions.tokenURI(id);
            owner = await this.ethService.getContract()?.functions.ownerOf(id);
            image = JSON.parse(tokenUri as unknown as string).image.replace(
              'ipfs://',
              'https://ipfs.io/ipfs/'
            );
          } catch {
            this.idsAccumulator = this.idsAccumulator.filter(
              (accumId) => accumId !== id
            );
          } finally {
            return {
              image: image,
              owner,
              id,
            };
          }
        }),
        filter((res) => !!res.owner)
      )
      .subscribe((result) => {
        this.cards$$.next([...this.cards$$.value, result]);
      });

    this.loadMore(4);
  }

  public loadMore(load?: number): void {
    const start = this.cards$$.value.length;

    for (let i = start; i < start + (load ?? (start ? 4 : 0)); ++i) {
      this.nftTrigger$$.next(i);
    }
  }
}
