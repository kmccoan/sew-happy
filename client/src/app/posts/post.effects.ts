import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, switchMap } from "rxjs/operators";

import { FetchPosts, PostsFetched } from "./domain/actions";
import { Post } from "./domain/models";
import { PostsHttpService } from "./services/posts.http.service";


@Injectable()
export class PostEffects {

  constructor(private actions$: Actions, private postsHttpService: PostsHttpService) {}

  @Effect()
  public readonly fetchPosts$ = this.actions$.pipe(
    ofType(FetchPosts.TYPE),
    switchMap(() => this.postsHttpService.getPosts().pipe(map(posts => new PostsFetched(posts))))
  );
}
