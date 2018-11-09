import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { Observable } from "rxjs";
import { switchMap } from "rxjs/operators";

import { Post } from "../../domain/models";
import { PostsService } from "../../services/posts.service";

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostPageComponent implements OnInit {
  public post$: Observable<Post>;

  constructor(private route: ActivatedRoute,
              private postsService: PostsService) { }

  ngOnInit() {
    this.post$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.postsService.getPostWithContent(params.get('id')))
    );
  }
}
