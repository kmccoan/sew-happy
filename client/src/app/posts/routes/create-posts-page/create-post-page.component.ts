import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { take, tap } from "rxjs/operators";
import { PostsService } from "../../services/posts.service";

@Component({
  selector: 'app-create-post-page',
  templateUrl: './create-post-page.component.html',
  styleUrls: [ './create-post-page.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreatePostPageComponent {

  public postFormControl = new FormControl();

  constructor(private postsService: PostsService, private snackBar: MatSnackBar) {
  }

  public createPost() {
    this.postsService.createPost({
      title: this.postFormControl.value.title,
      author: this.postFormControl.value.author,
      summary_image_url: this.postFormControl.value.image
    }).pipe(
      take(1),
      tap(() => this.snackBar.open('Your post was created.'))
    ).subscribe();

    this.postFormControl.reset();
  }
}
