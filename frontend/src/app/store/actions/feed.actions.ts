import { createAction, props } from '@ngrx/store';
import { FeedDto } from './../../models/feed.model';

export const GetFeed = createAction('[Root] Get Feed');
export const GetFeedSuccess = createAction('[Root] Get Feed Success', props<{ feed: FeedDto }>());
