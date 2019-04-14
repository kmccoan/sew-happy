import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceNotFoundComponent } from './commons/resource-not-found/resource-not-found.component';

const routes: Routes = [
  { path: '**', component: ResourceNotFoundComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ CommonModule, RouterModule.forChild(routes) ]
})
export class AppErrorRoutingModule {
}
