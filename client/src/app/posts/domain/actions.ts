import { Action } from "@ngrx/store";

import { Post, PostContent } from "./models";

export class FetchPosts implements Action {
  public static readonly TYPE = "[POSTS] FETCH POSTS";
  public readonly type = FetchPosts.TYPE;
}

export class CreatePost implements Action {
  public static readonly TYPE = "[POSTS] CREATE POST";
  public readonly type = CreatePost.TYPE;

  public constructor(public newPost: Partial<Readonly<Post>>) {
  }
}

export class ClearPosts implements Action {
  public static readonly TYPE = "[POSTS] CLEAR POSTS";
  public readonly type = ClearPosts.TYPE;
}

export class FetchDetailedPost implements Action {
  public static readonly TYPE = "[POSTS] FETCH DETAILED POST";
  public readonly type = FetchDetailedPost.TYPE;

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
