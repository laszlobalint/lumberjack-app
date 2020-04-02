import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { FeedService } from '../../services';
import * as fromActions from '../actions/feed.actions';

@Injectable()
export class FeedEffects {
  getFeed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.GetFeed),
      mergeMap(() => this.feedService.get().pipe(map(feed => fromActions.GetFeedSuccess({ feed })))),
    ),
  );

  constructor(private readonly actions$: Actions, private readonly feedService: FeedService) {}
}
