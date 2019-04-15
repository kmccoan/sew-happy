import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-create-post-page',
  templateUrl: './create-post-page.component.html',
  styleUrls: [ './create-post-page.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreatePostPageComponent {

  public titleControl = new FormControl(null, Validators.required);
  public authorControl = new FormControl(null, Validators.required);
  public imageControl = new FormControl(null, Validators.required);

  public postForm = new FormGroup({
    title: this.titleControl,
    author: this.authorControl,
    image: this.imageControl
  });

  constructor(private postsService: PostsService) {
  }

  public createPost() {
    this.postsService.createPost({
      title: this.titleControl.value,
      author: this.authorControl.value,
      summary_image_url: this.imageControl.value
    });

    this.postForm.reset();
  }
}
