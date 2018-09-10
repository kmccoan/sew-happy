import { Component, Input, OnInit } from "@angular/core";

import { Post } from "../domain/models";

@Component({
  selector: 'app-post-summary',
  templateUrl: './post-summary.component.html',
  styleUrls: ['./post-summary.component.scss']
})
export class PostSummaryComponent implements OnInit {

  @Input()
  public post: Post;

  constructor() { }

  ngOnInit() {
  }

}
