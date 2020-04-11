import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from "@angular/material";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppErrorRoutingModule } from "./app-error-routing.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CommonsModule } from "./commons/commons.module";
import { PostsModule } from "./posts/posts.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonsModule,
    HttpClientModule,
    PostsModule,
    AppErrorRoutingModule
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 3000, verticalPosition: 'bottom' } }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
