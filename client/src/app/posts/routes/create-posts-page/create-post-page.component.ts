import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { PostsService } from "../../services/posts.service";

@Component({
  selector: 'app-create-post-page',
  templateUrl: './create-post-page.component.html',
  styleUrls: [ './create-post-page.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreatePostPageComponent {

  public postFormControl = new FormControl();

  constructor(private postsService: PostsService) {
  }

  public createPost() {
    this.postsService.createPost({
      title: this.postFormControl.value.title,
      author: this.postFormControl.value.author,
      summary_image_url: this.postFormControl.value.image
    });

    this.postFormControl.reset();
  }
}
