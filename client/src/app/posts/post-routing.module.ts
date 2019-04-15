import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreatePostPageComponent } from './routes/create-posts-page/create-post-page.component';
import { EditPostPageComponent } from './routes/edit-post-page/edit-post-page.component';
import { PostsPageComponent } from './routes/posts-page/posts-page.component';
import { PostPageComponent } from './routes/post-page/post-page.component';

const routes: Routes = [
  { path: 'posts', component: PostsPageComponent, pathMatch: 'full' },
  { path: 'create-post', component: CreatePostPageComponent, pathMatch: 'full' },
  { path: 'edit-post/:id', component: EditPostPageComponent, pathMatch: 'full' },
  { path: 'posts/:id', component: PostPageComponent, pathMatch: 'full' },
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
