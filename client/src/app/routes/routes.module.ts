import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { PostsModule } from "../posts/posts.module";
import { PostsPageComponent } from "./posts-page/posts-page.component";

@NgModule({
  declarations: [
    PostsPageComponent
  ],
  imports: [
    CommonModule,

    PostsModule
  ],
  exports: [
    PostsPageComponent
  ]
})
export class RoutesModule {
}
