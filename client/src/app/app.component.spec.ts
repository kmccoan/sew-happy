import { APP_BASE_HREF } from '@angular/common';
import { async, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppEffects } from './app.effects';
import { CommonsModule } from './commons/commons.module';
import { PostRoutingModule } from './posts/post-routing.module';
import { PostsModule } from './posts/posts.module';
import { PostsHttpService } from './posts/services/posts.http.service';
import { metaReducers, reducers } from './reducers';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        CommonsModule,
        PostsModule,
        StoreModule.forRoot(reducers, { metaReducers }),
        EffectsModule.forRoot([ AppEffects ]),
        PostRoutingModule
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue : '/' },
        {provide: PostsHttpService, useValue: {}}
        ],
      declarations: [
        AppComponent
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'sew-happy'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('sew-happy');
  }));
});
