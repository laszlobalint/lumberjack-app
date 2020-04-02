import { ActionReducerMap } from '@ngrx/store';
import * as fromFeed from '../store/reducers/feed.reducer';

export interface State {
  feed: fromFeed.FeedState;
}

export const reducers: ActionReducerMap<State> = {
  feed: fromFeed.reducer,
};

export * from './actions';
export * from './effects';
