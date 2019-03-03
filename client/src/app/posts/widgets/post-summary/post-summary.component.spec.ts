import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Post } from '../../domain/models';

import { PostSummaryComponent } from './post-summary.component';

@Component({
  selector: 'test-component',
  template: `
    <div>
      <app-post-summary [post]='post'></app-post-summary>
    </div>
  `
})
class TestComponent {
  @ViewChild(PostSummaryComponent)
  public postSummaryComponent: PostSummaryComponent;

  public post: Readonly<Post>;
}

type Config = {
  post: Readonly<Post>;
}

describe('PostSummaryComponent', () => {
  let component: PostSummaryComponent;
  let fixture: ComponentFixture<TestComponent>;

  const setup = (config: Config) => {
    fixture.componentInstance.post = config.post;

    fixture.detectChanges();
  };

  const getTitle = (): string => {
    return fixture.debugElement.query(By.css('h6')).nativeElement.innerText.trim();
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PostSummaryComponent,
        TestComponent ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance.postSummaryComponent;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('summary details', () => {
    it('should display post title', () => {
      const post = {id: '2', title: 'boo', archived: true, author: 'auth', summary_image_url: 'https://google.ca', tags: []};
      setup({ post: post });

      expect(getTitle()).toBe('boo');
    });
  });
});
