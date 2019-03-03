import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { PostRoutingModule } from './post-routing.module';
import { PostEffects } from './effects/post.effects';
import { postReducer, STORE_NAME } from './reducers/post.reducer';
import { PostPageComponent } from './routes/post-page/post-page.component';
import { PostsPageComponent } from './routes/posts-page/posts-page.component';
import { PostsHttpService } from './services/posts.http.service';
import { PostsService } from './services/posts.service';
import { PostDetailsComponent } from './widgets/post-details/post-details.component';
import { PostListComponent } from './widgets/post-list/post-list.component';
import { PostSummaryComponent } from './widgets/post-summary/post-summary.component';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(STORE_NAME, postReducer),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forFeature([ PostEffects ]),
    PostRoutingModule
  ],
  providers: [ PostsService, PostsHttpService ],
  declarations: [ PostListComponent, PostSummaryComponent, PostDetailsComponent, PostPageComponent, PostsPageComponent ]
})
export class PostsModule {
}
