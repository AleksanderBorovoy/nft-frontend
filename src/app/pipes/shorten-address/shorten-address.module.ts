import { NgModule } from '@angular/core';
import { ShortedAddressPipe } from './shorted-address.pipe';

@NgModule({
  declarations: [ShortedAddressPipe],
  exports: [ShortedAddressPipe],
})
export class ShortenAddressModule {}
