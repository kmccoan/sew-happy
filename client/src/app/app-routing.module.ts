import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PostsPageComponent } from "./routes/posts-page/posts-page.component";

const routes: Routes = [
  { path: "posts", component: PostsPageComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule {
}
