import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { AppComponent } from './app.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { MintNftDialog } from './components/mint-nft-dialog/mint-nft-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  MatFormFieldModule,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
} from '@angular/material/form-field';
import { UploadContractComponent } from './components/upload-contract/upload-contract.component';
import { SpinnerOverlayComponent } from './components/spinner-overlay/spinner-overlay.component';
import {
  FullscreenOverlayContainer,
  OverlayContainer,
  OverlayModule,
} from '@angular/cdk/overlay';
import { FarawayButtonComponent } from './components/faraway-button/faraway-button.component';
import { HttpClientModule } from '@angular/common/http';

import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CardsListComponent } from './components/cards-list/cards-list.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ShortenAddressModule } from './pipes/shorten-address/shorten-address.module';
import { CardsHeaderComponent } from './components/cards-header/cards-header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { WelcomeComponent } from './components/welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    MintNftDialog,
    UploadContractComponent,
    SpinnerOverlayComponent,
    FarawayButtonComponent,
    CarouselComponent,
    CardsListComponent,
    CardsHeaderComponent,
    FooterComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CarouselModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    OverlayModule,
    HttpClientModule,
    InfiniteScrollModule,
    ShortenAddressModule,
    MatProgressBarModule,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
    { provide: OverlayContainer, useClass: FullscreenOverlayContainer },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    hljs.registerLanguage('javascript', javascript);
  }
}
