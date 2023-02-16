import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardService } from 'src/app/card.service';

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsListComponent {
  public readonly cards$$ = this.cardSerivice.cards$$;

  constructor(private cardSerivice: CardService) {}

  public errorHandler(event: any): void {
    event.target.src =
      'https://i.seadn.io/gae/bWpfop0qo8VQFO8d39KnKdNhn2OBfgbUCDWXcMI9Tf0h6Im6PrNC9xT2W-VRv9hNZ571AFvy5VUEzBIBuNQXagmSE6T9_UACOvGmrQ?auto=format&w=500';
  }
}
