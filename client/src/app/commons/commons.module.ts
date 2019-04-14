import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ResourceNotFoundComponent } from './resource-not-found/resource-not-found.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    HeaderComponent,
    ResourceNotFoundComponent
  ],
  exports: [
    HeaderComponent,
    ResourceNotFoundComponent
  ]
})
export class CommonsModule {
}
