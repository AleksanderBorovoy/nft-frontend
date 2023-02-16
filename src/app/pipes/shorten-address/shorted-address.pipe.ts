import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortedAddress',
})
export class ShortedAddressPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    return `${value.substring(0, 6)}...${value.substring(35)}`;
  }
}
