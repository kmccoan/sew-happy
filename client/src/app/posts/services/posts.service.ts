import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { ClearPosts, FetchPost, FetchPosts } from "../domain/actions";
import { Post } from "../domain/models";
import { PostState, STORE_NAME } from "../reducers";

@Injectable()
export class PostsService {

  private _posts$: Observable<ReadonlyArray<Post> | undefined> = new Observable(sub => {
    return this.store.select(STORE_NAME, "posts")
        .subscribe(sub)
        .add(() => this.store.dispatch(new ClearPosts()));
  });

  constructor(private store: Store<PostState>) {}

  public getPosts() {
    this.store.dispatch(new FetchPosts());
    return this._posts$;
  }

  public getPostWithContent(id: string) {
    this.store.dispatch(new FetchPost(id));
    return this._posts$.pipe(
      map(posts => {
        if (posts != null) {
          return posts.find(post => post.id === id);
        }
      })
    );
  }
}
