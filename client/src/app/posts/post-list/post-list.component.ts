import { Component, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";
import { Post } from "../domain/models";

const post: Post = {
  id: "1",
  title: "This is a post about some things",
  tags: ["2"],
  author: "Kira McCoan",
  archived: false,
  summary_image_url: "https://scontent-ort2-1.cdninstagram.com/vp/fa0b642d4d584a8eb5e3c930ad98fd0d/5C3B767B/t51.2885-15/e35/14027230_737870619684544_1256594505_n.jpg?_nc_eui2=AeG_o2l_VCCN70eymTEq18WQFgaljQwM8WNUs9E9I6al7dLqhrjDywtKyJLxgxCB0KVpQ2dWQLcM8Yt9nTVYjo3vDsXwpML07ZU3dBC7VGeeMg",
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

  public posts$: Observable<ReadonlyArray<Post>> = of([post, post, post, post, post]);

  constructor() { }

  public ngOnInit() {}
}
