import { Action } from "@ngrx/store";

import { Post } from "./models";

export class FetchPosts implements Action {
  public static readonly TYPE = "[POSTS] FETCH POSTS";
  public readonly type = FetchPosts.TYPE;
}

export class PostsFetched implements Action {
  public static readonly TYPE = "[POSTS] POST FETCHED";
  public readonly type = PostsFetched.TYPE;

  public constructor(public posts: ReadonlyArray<Post>) {}
}
