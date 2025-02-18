import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { add, substract } from '../../../../store/counter/counter.actions';
import { RootState } from '../../../../store';
import {
  selectCounterState,
  selectCounterValue,
} from '../../../../store/counter/counter.selectors';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-counter',
  standalone: false,
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss',
})
export class CounterComponent {
  value$: Observable<number>;

  constructor(private store: Store<RootState>) {
    this.value$ = this.store.select(selectCounterValue);
  }

  onAdd(): void {
    // Quiero dispara la accion...
    this.store.dispatch(add());
  }

  onSubstract(): void {
    this.store.dispatch(substract());
  }
}
