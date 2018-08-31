import { Component, Input, OnInit } from "@angular/core";
import { Post } from "../domain/models";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input()
  public readonly post: Post;

  constructor() { }

  public ngOnInit() {}
}
