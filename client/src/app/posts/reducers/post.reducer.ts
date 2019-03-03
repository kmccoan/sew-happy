import { Action } from '@ngrx/store';

import { array_push, array_replace, object_assign } from 'imuter';

import { ClearPosts, PostContentFetched, PostFetched, PostsFetched } from '../domain/actions';
import { Post } from '../domain/models';

export const STORE_NAME = 'postState';

export interface PostState {
  posts?: ReadonlyArray<Post>;
}

function updatedPosts(state: PostState | undefined, postId, postUpdates: Post): PostState {
  const currentPosts = ((state || {}).posts || []);
  const currentPostIndex = currentPosts.findIndex(post => post.id === postId);
  if (currentPostIndex !== -1) {
    const currentPost = currentPosts[currentPostIndex];
    return {
      ...state,
      posts: array_replace<Post>(currentPosts, currentPost, object_assign<Post, Post>(currentPost, postUpdates))
    };
  } else {
    return {
      ...state,
      posts: array_push<Post>(currentPosts, postUpdates)
    };
  }
}

export function postReducer(state: PostState | undefined, action: Action): PostState {
  if (action instanceof PostsFetched) {
    return {
      ...state,
      posts: action.posts
    };
  }

  if (action instanceof PostContentFetched) {
    return updatedPosts(state, action.postContent.postId, { id: action.postContent.postId, content: action.postContent });
  }

  if (action instanceof PostFetched) {
    return updatedPosts(state, action.post.id, action.post);
  }

  if (action instanceof ClearPosts) {
    return undefined;
  }
  return state;
}
