import {Injectable, signal} from '@angular/core';

export interface CartAddEvent {
  payload: any;
  timestamp: number;
}

@Injectable({providedIn: 'root'})
export class CartEventBusService {
  private cartAddSignal = signal<CartAddEvent | null>(null);

  readonly cartEvent = this.cartAddSignal.asReadonly();

  emitCartAdd(data: any) {
    this.cartAddSignal.set({
      payload: data,
      timestamp: Date.now() // to ensure the signal changes
    });
  }
}
