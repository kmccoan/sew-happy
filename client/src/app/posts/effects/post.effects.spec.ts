import { Injector, ValueProvider } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, getTestScheduler, hot } from 'jasmine-marbles';
import { TestHotObservable } from 'jasmine-marbles/es6/src/test-observables';
import { Observable } from 'rxjs';
import { FetchDetailedPost, FetchPosts, PostContentFetched, PostFetched, PostsFetched } from '../domain/actions';
import { Post, PostContent } from '../domain/models';

import { PostEffects } from './post.effects';
import { PostsHttpService } from '../services/posts.http.service';

describe('PostEffects', () => {
  interface Config {
    mockActions: TestHotObservable;
    posts$?: Observable<ReadonlyArray<Post>>;
    post$?: Observable<Readonly<Post>>;
    postContent$?: Observable<Readonly<PostContent>>;
  }

  function setup(conf: Config) {
    const postsHttpMockService = {
      getPosts: jasmine.createSpy('getPosts').and.returnValue(conf.posts$ || cold('x', { x: [] })),
      getPost: jasmine.createSpy('getPost').and.returnValue(conf.post$ || cold('x', { x: undefined })),
      getPostContent: jasmine.createSpy('getPostContent').and.returnValue(conf.postContent$ || cold('x', { x: undefined }))
    };

    const injector = Injector.create({
      providers: [
        {
          deps: [], ...<ValueProvider>provideMockActions(conf.mockActions)
        },
        {
          provide: PostsHttpService,
          useValue: postsHttpMockService
        },
        {
          provide: PostEffects,
          deps: [ Actions, PostsHttpService ]
        }
      ]
    });

    return {
      effects: injector.get(PostEffects),
      postsHttpService: injector.get(PostsHttpService)
    };
  }

  describe('fetchPosts$', () => {
    it('should call postsHttpService.getPosts', () => {
      const { postsHttpService, effects } = setup({ mockActions: hot('x', { x: new FetchPosts() }) });

      effects.fetchPosts$.subscribe();
      getTestScheduler().flush();

      expect(postsHttpService.getPosts).toHaveBeenCalled();
    });

    it('should call dispatch a PostsFetched event with posts when successful', () => {
      const posts = [ { id: '1' } ];
      const { effects } = setup({
        mockActions: hot('x', { x: new FetchPosts() }),
        posts$: cold('x', { x: posts })
      });

      expect(effects.fetchPosts$).toBeObservable(cold('x', { x: new PostsFetched(posts) }));
    });
  });

  describe('fetchDetailedPost$', () => {
    it('should call postsHttpService.getPost with id', () => {
      const { postsHttpService, effects } = setup({ mockActions: hot('x', { x: new FetchDetailedPost('1') }) });

      effects.fetchDetailedPost$.subscribe();
      getTestScheduler().flush();

      expect(postsHttpService.getPost).toHaveBeenCalledWith('1');
    });

    it('should call postsHttpService.getPostContent with id', () => {
      const { postsHttpService, effects } = setup({ mockActions: hot('x', { x: new FetchDetailedPost('1') }) });

      effects.fetchDetailedPost$.subscribe();
      getTestScheduler().flush();

      expect(postsHttpService.getPostContent).toHaveBeenCalledWith('1');
    });

    it('should call dispatch PostFetched & PostContentFetched events when successful', () => {
      const post = { id: '1' };
      const postContent = { post_id: '1', parts: [] };
      const { effects } = setup({
        mockActions: hot('x', { x: new FetchDetailedPost('1') }),
        post$: cold('x', { x: post }),
        postContent$: cold('x', { x: postContent })
      });

      expect(effects.fetchDetailedPost$)
        .toBeObservable(cold('(xy)', { x: new PostFetched(post), y: new PostContentFetched(postContent) }));
    });
  });
});
