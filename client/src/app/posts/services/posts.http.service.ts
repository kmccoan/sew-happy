import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { post } from "selenium-webdriver/http";

import { environment } from '../../../environments/environment';
import { Post, PostContent } from '../domain/models';

@Injectable()
export class PostsHttpService {

  constructor(private http: HttpClient) {}

  public getPosts() {
    return this.http.get<ReadonlyArray<Post>>(environment.baseUrl + '/posts');
  }

  public getPost(id: string) {
    return this.http.get<Readonly<Post>>(environment.baseUrl + '/posts/' + id);
  }

  public getPostContent(id: string) {
    return this.http.get<Readonly<PostContent>>(environment.baseUrl + '/posts/' + id + '/content');
  }

  public createPost(newPost: Partial<Readonly<Post>>) {
    return this.http.post<Readonly<PostContent>>(environment.baseUrl + '/posts', newPost);
  }

  public updatePost(postUpdates: Partial<Readonly<Post>>) {
    return this.http.put<Readonly<PostContent>>(environment.baseUrl + '/posts', postUpdates);
  }
}
