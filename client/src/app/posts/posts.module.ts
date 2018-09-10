import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PostListComponent } from "./post-list/post-list.component";
import { PostSummaryComponent } from "./post-summary/post-summary.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ PostListComponent, PostSummaryComponent ]
})
export class PostsModule {
}
