import { Action } from "@ngrx/store";

import { Post, PostContent } from "./models";

export class FetchPosts implements Action {
  public static readonly TYPE = "[POSTS] FETCH POSTS";
  public readonly type = FetchPosts.TYPE;
}

export class ClearPosts implements Action {
  public static readonly TYPE = "[POSTS] CLEAR POSTS";
  public readonly type = ClearPosts.TYPE;
}

export class FetchPost implements Action {
  public static readonly TYPE = "[POSTS] FETCH POST";
  public readonly type = FetchPost.TYPE;

  public constructor(public id: string) {
  }
}

export class PostsFetched implements Action {
  public static readonly TYPE = "[POSTS] POST FETCHED";
  public readonly type = PostsFetched.TYPE;

  public constructor(public posts: ReadonlyArray<Post>) {
  }
}

export class PostFetched implements Action {
  public static readonly TYPE = "[POSTS] POST FETCHED";
  public readonly type = PostFetched.TYPE;

  public constructor(public post: Readonly<Post>) {
  }
}

export class PostContentFetched implements Action {
  public static readonly TYPE = "[POSTS] POST CONTENT FETCHED";
  public readonly type = PostContentFetched.TYPE;

  public constructor(public postContent: Readonly<PostContent>) {
  }
}
