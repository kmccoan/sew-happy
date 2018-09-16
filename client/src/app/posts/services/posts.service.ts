import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs";
import { FetchPosts } from "../domain/actions";

import { Post } from "../domain/models";
import { PostState, STORE_NAME } from "../reducers";

@Injectable()
export class PostsService {

  constructor(private store: Store<PostState>) {
  }

  public getPosts(): Observable<ReadonlyArray<Post>> {
    return this.store.select(STORE_NAME, "posts");
  }

  public loadPosts(): void {
    this.store.dispatch(new FetchPosts());
  }
}
