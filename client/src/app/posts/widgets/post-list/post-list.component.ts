import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";
import { Post } from "../../domain/models";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostListComponent implements OnInit {

  @Input()
  public posts: ReadonlyArray<Post>;

  constructor() { }

  public ngOnInit() {}
}
