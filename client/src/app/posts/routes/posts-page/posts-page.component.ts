import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: [ './posts-page.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsPageComponent {

  public readonly posts$ = this.postsService.getPosts();

  constructor(private postsService: PostsService) {}
}
