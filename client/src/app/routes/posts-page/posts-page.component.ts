import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { PostsService } from "../../posts/services/posts.service";

@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsPageComponent implements OnInit {

  public readonly posts$ = this.postsService.getPosts();

  constructor(private postsService: PostsService) { }

  public ngOnInit() {
    this.postsService.loadPosts();
    this.postsService.getPosts().subscribe(val => {
      console.log("here", val);
    })
  }
}
