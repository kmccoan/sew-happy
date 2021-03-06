import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatSnackBarModule, MatTabsModule } from "@angular/material";
import { MatInputModule } from '@angular/material/input';
import { PostRoutingModule } from './post-routing.module';
import { CreatePostPageComponent } from './routes/create-posts-page/create-post-page.component';
import { EditPostPageComponent } from './routes/edit-post-page/edit-post-page.component';
import { PostPageComponent } from './routes/post-page/post-page.component';
import { PostsPageComponent } from './routes/posts-page/posts-page.component';
import { PostsHttpService } from './services/posts.http.service';
import { PostsService } from './services/posts.service';
import { PostContentManagementComponent } from './widgets/post-content-management/post-content-management.component';
import { PostDetailsComponent } from './widgets/post-details/post-details.component';
import { PostListComponent } from './widgets/post-list/post-list.component';
import { PostManagementComponent } from './widgets/post-management/post-management.component';
import { PostSummaryComponent } from './widgets/post-summary/post-summary.component';

@NgModule({
  imports: [
    CommonModule,
    PostRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatTabsModule,
    ReactiveFormsModule
  ],
  providers: [ PostsService, PostsHttpService ],
  declarations: [
    CreatePostPageComponent,
    PostListComponent,
    PostSummaryComponent,
    PostDetailsComponent,
    PostPageComponent,
    PostsPageComponent,
    PostContentManagementComponent,
    PostManagementComponent,
    EditPostPageComponent
  ]
})
export class PostsModule {
}
