import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { combineLatest, of } from 'rxjs';

import { map, mergeMap, switchMap } from 'rxjs/operators';

import { CreatePost, FetchDetailedPost, FetchPosts, PostContentFetched, PostFetched, PostsFetched } from "../domain/actions";
import { PostsHttpService } from '../services/posts.http.service';


@Injectable()
export class PostEffects {

  constructor(private actions$: Actions, private postsHttpService: PostsHttpService) {}

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

  @Effect({dispatch: false}) // TODO: implement more here.
  public readonly createPost$ = this.actions$.pipe(
    ofType(CreatePost.TYPE),
    switchMap((action: CreatePost) => this.postsHttpService.createPost(action.newPost))
  );
}
