import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { combineLatest, of } from 'rxjs';

import { map, mergeMap, switchMap, tap } from 'rxjs/operators';

import { ContentSet, CreatePost, DeletePost, EditPost, FetchDetailedPost, FetchPosts, PostContentFetched, PostCreated, PostDeleted, PostFetched, PostsFetched, PostUpdated, SetContent } from '../domain/actions';
import { PostsHttpService } from '../services/posts.http.service';


@Injectable()
export class PostEffects {

  constructor(private actions$: Actions, private postsHttpService: PostsHttpService, private snackBar: MatSnackBar) {}

  @Effect()
  public readonly fetchPosts$ = this.actions$.pipe(
    ofType(FetchPosts.TYPE),
    switchMap(() => this.postsHttpService.getPosts().pipe(map(posts => new PostsFetched(posts))))
  );

  @Effect()
  public readonly fetchDetailedPost$ = this.actions$.pipe(
    ofType(FetchDetailedPost.TYPE),
    switchMap(action =>
      combineLatest(
        this.postsHttpService.getPost((action as FetchDetailedPost).id),
        this.postsHttpService.getPostContent((action as FetchDetailedPost).id)
      ).pipe(
        mergeMap(([ post, postContent ]) => of(new PostFetched(post), new PostContentFetched(postContent)))
      )
    )
  );

  @Effect()
  public readonly createPost$ = this.actions$.pipe(
    ofType(CreatePost.TYPE),
    switchMap((action: CreatePost) => this.postsHttpService.createPost(action.newPost).pipe(map(() => new PostCreated())))
  );

  @Effect()
  public readonly editPost$ = this.actions$.pipe(
    ofType(EditPost.TYPE),
    switchMap((action: EditPost) => this.postsHttpService.updatePost(action.id, action.postUpdates).pipe(map(() => new PostUpdated())))
  );

  @Effect()
  public readonly setContent$ = this.actions$.pipe(
    ofType(SetContent.TYPE),
    switchMap((action: SetContent) => this.postsHttpService.setContent(action.id, action.content).pipe(map(() => new ContentSet())))
  );

  @Effect()
  public readonly deletePost$ = this.actions$.pipe(
    ofType(DeletePost.TYPE),
    switchMap((action: DeletePost) => this.postsHttpService.deletePost(action.id).pipe(map(() => new PostDeleted())))
  );

  @Effect({dispatch: false})
  public readonly postCreatedSnack$ = this.actions$.pipe(
    ofType(PostCreated.TYPE),
    tap(() => this.snackBar.open('Your post was created.'))
  );

  @Effect({dispatch: false})
  public readonly postUpdatedSnack$ = this.actions$.pipe(
    ofType(PostUpdated.TYPE),
    tap(() => this.snackBar.open('Your post was updated.'))
  );

  @Effect({dispatch: false})
  public readonly postContentSetSnack$ = this.actions$.pipe(
    ofType(ContentSet.TYPE),
    tap(() => this.snackBar.open('Your post content was updated.'))
  );

  @Effect({dispatch: false})
  public readonly postDeletedSnack$ = this.actions$.pipe(
    ofType(PostDeleted.TYPE),
    tap(() => this.snackBar.open('Your post was deleted.'))
  );
}
