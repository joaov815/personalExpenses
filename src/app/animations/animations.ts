import { trigger, transition, style, animate, state } from "@angular/animations";

export const slide = trigger('slide', [
  transition(':enter', [
    style({ transform: 'translateX(-100%)', opacity: 0 }),
    animate(
      '300ms ease-in-out',
      style({ transform: 'translateX(0)', opacity: 1 })
    ),
  ]),
  transition(':leave', [
    animate(
      '300ms ease-in-out',
      style({ transform: 'translateX(-100%)', opacity: 0 })
    ),
  ]),
]);
export const expandContent = trigger('expandContent', [
  state('withSidebar', style({ width: 'calc(100% - 15rem)' })),
  state('full', style({ width: '100%' })),
  transition('withSidebar <=> full', animate('300ms ease-in-out')),
]);
