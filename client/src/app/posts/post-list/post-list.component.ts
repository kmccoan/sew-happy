import { Component, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";
import { Post } from "../domain/models";

const post: Post = {
  id: "1",
  title: "This is a post about some things",
  tags: ["2"],
  author: "Kira McCoan",
  archived: false,
  parts: [{
    content: "My post content"
  }, {
    content: "More content"
  }]
};

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  private posts$: Observable<ReadonlyArray<Post>> = of([post]);

  constructor() { }

  public ngOnInit() {}
}
