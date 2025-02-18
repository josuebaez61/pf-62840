import { ActionReducerMap } from '@ngrx/store';
import {
  counterFeatureKey,
  counterReducer,
  CounterState,
} from './counter/counter.reducer';

export interface RootState {
  [counterFeatureKey]: CounterState;
}

export const rootReducer: ActionReducerMap<RootState> = {
  [counterFeatureKey]: counterReducer,
};
