import {
  Action,
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from "@ngrx/store";
import { PostsFetched } from "../domain/actions";

import { Post } from "../domain/models";

export const STORE_NAME = "postState";

export interface PostState {
  posts?: ReadonlyArray<Post>
}

export function postReducer(state: PostState | undefined, action: Action): PostState {
  if (action instanceof PostsFetched) {
    return {
      ...state,
      posts: action.posts
    }
  }
  return state;
}
