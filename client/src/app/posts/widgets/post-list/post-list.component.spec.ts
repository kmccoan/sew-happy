import { APP_BASE_HREF } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { Post } from '../../domain/models';
import { PostSummaryComponent } from '../post-summary/post-summary.component';

import { PostListComponent } from './post-list.component';

@Component({
  selector: 'test-component',
  template: `
    <div>
      <app-post-list
        [posts]='posts'>
      </app-post-list>
    </div>
  `
})
class TestComponent {
  @ViewChild(PostListComponent)
  public postListComponent: PostListComponent;

  public posts: ReadonlyArray<Post>;
}

interface Config {
  posts: ReadonlyArray<Post>;
}

describe('PostListComponent DOM', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<TestComponent>;

  const setup = (config: Config) => {
    fixture.componentInstance.posts = config.posts;

    fixture.detectChanges();
  };

  const getNumberOfSummariesDisplayed = (): number => {
    return fixture.debugElement.queryAll(By.css('app-post-summary')).length;
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue : '/' },
      ],
      declarations: [
        PostSummaryComponent,
        PostListComponent,
        TestComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance.postListComponent;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('post summaries', () => {
    it('should display summaries for all non-archived posts', () => {
      const post1 = {id: '1', title: 'foo', archived: false, author: 'auth', summary_image_url: 'https://google.ca', tags: []};
      const post2 = {id: '2', title: 'boo', archived: true, author: 'auth', summary_image_url: 'https://google.ca', tags: []};
      setup({
        posts: [ post1, post2 ]
      });

      expect(getNumberOfSummariesDisplayed()).toBe(1);
    });
  });
});
