import { Action } from '@ngrx/store';

import { Post, PostContent } from './models';

export class FetchPosts implements Action {
  public static readonly TYPE = '[POSTS] FETCH POSTS';
  public readonly type = FetchPosts.TYPE;
}

export class CreatePost implements Action {
  public static readonly TYPE = '[POSTS] CREATE POST';
  public readonly type = CreatePost.TYPE;

  public constructor(public newPost: Partial<Readonly<Post>>) {
  }
}

export class EditPost implements Action {
  public static readonly TYPE = '[POSTS] EDIT POST';
  public readonly type = EditPost.TYPE;

  public constructor(public id: string, public postUpdates: Partial<Readonly<Post>>) {
  }
}

export class DeletePost implements Action {
  public static readonly TYPE = '[POSTS] DELETE POST';
  public readonly type = DeletePost.TYPE;

  public constructor(public id: string) {
  }
}

export class ClearPosts implements Action {
  public static readonly TYPE = '[POSTS] CLEAR POSTS';
  public readonly type = ClearPosts.TYPE;
}

export class FetchDetailedPost implements Action {
  public static readonly TYPE = '[POSTS] FETCH DETAILED POST';
  public readonly type = FetchDetailedPost.TYPE;

  public constructor(public id: string) {
  }
}

export class PostsFetched implements Action {
  public static readonly TYPE = '[POSTS] POST FETCHED';
  public readonly type = PostsFetched.TYPE;

  public constructor(public posts: ReadonlyArray<Post>) {
  }
}

export class PostFetched implements Action {
  public static readonly TYPE = '[POSTS] POST FETCHED';
  public readonly type = PostFetched.TYPE;

  public constructor(public post: Readonly<Post>) {
  }
}

export class PostContentFetched implements Action {
  public static readonly TYPE = '[POSTS] POST CONTENT FETCHED';
  public readonly type = PostContentFetched.TYPE;

  public constructor(public postContent: Readonly<PostContent>) {
  }
}

export class PostCreated implements Action {
  public static readonly TYPE = '[POSTS] POST CREATED';
  public readonly type = PostCreated.TYPE;
}

export class PostUpdated implements Action {
  public static readonly TYPE = '[POSTS] POST UPDATED';
  public readonly type = PostUpdated.TYPE;
}

export class PostDeleted implements Action {
  public static readonly TYPE = '[POSTS] POST DELETED';
  public readonly type = PostDeleted.TYPE;
}
