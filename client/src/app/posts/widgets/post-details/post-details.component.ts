import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Post } from '../../domain/models';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostDetailsComponent {

  @Input()
  public post: Post;

  constructor() { }
}
