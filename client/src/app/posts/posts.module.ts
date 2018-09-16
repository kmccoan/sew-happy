import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../../environments/environment";
import { PostEffects } from "./post.effects";
import { postReducer, STORE_NAME } from "./reducers";
import { PostsService } from "./services/posts.service";
import { PostListComponent } from "./widgets/post-list/post-list.component";
import { PostSummaryComponent } from "./widgets/post-summary/post-summary.component";

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(STORE_NAME, postReducer),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forFeature([ PostEffects ])
  ],
  exports: [
    PostListComponent
  ],
  providers: [ PostsService ],
  declarations: [ PostListComponent, PostSummaryComponent ]
})
export class PostsModule {
}
