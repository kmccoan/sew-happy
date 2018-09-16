import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";

import { AppEffects } from "./app.effects";
import { CommonsModule } from "./commons/commons.module";
import { PostsModule } from "./posts/posts.module";
import { metaReducers, reducers } from "./reducers";
import { RoutesModule } from "./routes/routes.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonsModule,
    PostsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([ AppEffects ]),
    RoutesModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
