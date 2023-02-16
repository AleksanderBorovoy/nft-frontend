import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { SpinnerOverlayComponent } from './components/spinner-overlay/spinner-overlay.component';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private overlayRef?: OverlayRef;
  private renderer: Renderer2;

  public contractDeploing$$ = new BehaviorSubject(false);

  constructor(
    private overlay: Overlay,
    private rendererFactory: RendererFactory2
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  showSpinner() {
    if (!this.overlayRef) {
      const config = new OverlayConfig({
        hasBackdrop: true,
        backdropClass: 'transparent-backdrop',
      });

      this.overlayRef = this.overlay.create(config);
      this.renderer.addClass(
        this.overlayRef.overlayElement,
        'full-screen-overlay'
      );
      this.overlayRef.attach(new ComponentPortal(SpinnerOverlayComponent));
    }
  }

  hideSpinner() {
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.overlayRef = undefined;
    }
  }
}
