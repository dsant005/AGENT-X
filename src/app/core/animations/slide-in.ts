import { trigger, transition, style, query, animateChild, group, animate } from '@angular/animations';

const slideInTransition = [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 36,
        left: 0,
        width: '100%'
      })
    ]),
    query(':enter', [
      style({ left: '-100%'})
    ]),
    query(':leave', animateChild()),
    group([
      query(':leave', [
        animate('200ms ease-out', style({ left: '100%'}))
      ]),
      query(':enter', [
        animate('200ms ease-out', style({ left: '0%'}))
      ])
    ]),
    query(':enter', animateChild()),
  ];

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('* => *', [...slideInTransition, style({ position: 'relative', height: 195 })]),
  ]);
