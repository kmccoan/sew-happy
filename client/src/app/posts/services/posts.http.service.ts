import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { environment } from "../../../environments/environment";
import { Post } from "../domain/models";

@Injectable()
export class PostsHttpService {

  constructor(private http: HttpClient) {}

  public getPosts() {
    return this.http.get<ReadonlyArray<Post>>(environment.baseUrl + "/posts");
  }
}
