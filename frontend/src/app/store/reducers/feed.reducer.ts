import { Action, createReducer, on } from '@ngrx/store';
import { FeedDto } from '../../models/feed.model';
import * as fromActions from '../actions/feed.actions';

export interface FeedState {
  feed?: FeedDto;
}

export const initialState: FeedState = {
  feed: undefined,
};

const reducerFunction = createReducer(
  initialState,
  on(fromActions.GetFeedSuccess, (state, { feed }) => ({
    ...state,
    feed,
  })),
);

export function reducer(state: FeedState | undefined, action: Action): FeedState {
  return reducerFunction(state, action);
}
