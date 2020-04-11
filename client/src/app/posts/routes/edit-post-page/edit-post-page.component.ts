import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from "@angular/material";
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MonoTypeOperatorFunction, Observable, ReplaySubject } from 'rxjs';
import { first, multicast, refCount, switchMap, take, tap } from "rxjs/operators";
import { Post } from '../../domain/models';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-edit-post-page',
  templateUrl: './edit-post-page.component.html',
  styleUrls: [ './edit-post-page.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPostPageComponent implements OnInit {
  public postFormControl = new FormControl();
  public postContentFormControl = new FormControl();
  public post$: Observable<Post>;

  constructor(private route: ActivatedRoute, private postsService: PostsService, private router: Router, private snackBar: MatSnackBar) {
  }

  public editPost() {
    this.post$.pipe(take(1)).subscribe(post => {
      this.postsService.editPost(post.id,
        {
          title: this.postFormControl.value.title,
          author: this.postFormControl.value.author,
          summary_image_url: this.postFormControl.value.image
        })
        .pipe(
          take(1),
          tap(() => this.snackBar.open('Your post was updated.'))
        )
        .subscribe();
    });
  }

  public editContent() {
    this.post$.pipe(first()).subscribe(post => {
      this.postsService.setContent(post.id, this.postContentFormControl.value)
        .pipe(
          take(1),
          tap(() => this.snackBar.open('Your post was updated.'))
        )
        .subscribe();
    });
  }

  public deletePost() {
    this.post$.pipe(first()).subscribe(post => {
      this.postsService.deletePost(post.id)
        .pipe(
          take(1),
          tap(() => this.snackBar.open('Your post was deleted.'))
        )
        .subscribe();

      this.router.navigate(['/posts']);
    });
  }

  public ngOnInit() {
    this.post$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.postsService.getPostWithContent(params.get('id'))),
      this.cachePost()
    );

    this.post$.subscribe(post => {
      if (post) {
        this.postFormControl.reset(post);
        this.postFormControl.enable();

        this.postContentFormControl.reset(post.content);
      } else {
        this.postFormControl.disable();
      }
    });
  }

  public cachePost<T>(): MonoTypeOperatorFunction<T> {
    return (source: Observable<T>) => refCount()(multicast(() => new ReplaySubject<T>(1))(source)) as Observable<T>;
  }
}
