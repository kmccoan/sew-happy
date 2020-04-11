import { Injectable } from "@angular/core";
import { combineLatest } from "rxjs";
import { map } from "rxjs/operators";
import { Post, PostContent } from "../domain/models";
import { PostsHttpService } from "./posts.http.service";

@Injectable()
export class PostsService {

  constructor(private postHttpService: PostsHttpService) {}

  public getPosts() {
    return this.postHttpService.getPosts();
  }

  public getPostWithContent(id: string) {
    return combineLatest([
      this.postHttpService.getPost(id),
      this.postHttpService.getPostContent(id)
    ]).pipe(map(([ post, postContent ]) => ({
      ...post,
      content: postContent
    })));
  }

  public createPost(newPost: Partial<Readonly<Post>>) {
    return this.postHttpService.createPost(newPost);
  }

  public editPost(id: string, postUpdates: Partial<Readonly<Post>>) {
    return this.postHttpService.updatePost(id, postUpdates);
  }

  public setContent(id: string, content: Readonly<PostContent>) {
    return this.postHttpService.setContent(id, content);
  }

  deletePost(id: string) {
    return this.postHttpService.deletePost(id);
  }
}
