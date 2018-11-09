import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PostsPageComponent } from "./routes/posts-page/posts-page.component";
import { PostPageComponent } from './routes/post-page/post-page.component';

const routes: Routes = [
  { path: "posts", component: PostsPageComponent },
  { path: "posts/:id", component: PostPageComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class PostRoutingModule {
}
