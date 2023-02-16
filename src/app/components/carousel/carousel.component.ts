import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselComponent implements OnInit {
  customOptions: OwlOptions = {
    autoplay: true,
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 600,
    navText: ['&#8249', '&#8250;'],
    slideTransition: 'linear',
    autoplaySpeed: 18000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      760: {
        items: 3,
      },
      1000: {
        items: 4,
      },
    },
    nav: true,
  };

  public slides = [
    {
      alt: 'img 1',
      src: 'https://faraway.com/_next/static/media/faraway_platform_expanded.cea4f5a3.webp',
      textFirstLine: 'DEPLOY',
      textSecondLine: 'CONTRACT',
    },
    {
      alt: 'img 2',
      src: 'https://faraway.com/_next/static/media/image.740ffbcc.webp',
      textFirstLine: 'MINT',
      textSecondLine: 'NFT',
    },
    {
      alt: 'img 3',
      src: 'https://faraway.com/_next/static/media/frrag_expanded.14c940e9.webp',
      textFirstLine: 'CHECK',
      textSecondLine: 'EVENTS',
    },
    {
      alt: 'img 4',
      src: 'https://faraway.com/_next/static/media/image.a0035a37.webp',
      textFirstLine: 'CONNECT',
      textSecondLine: 'WALLET',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
