import { PostContentFetched, PostFetched, PostsFetched } from '../domain/actions';
import { postReducer } from './post.reducer';

describe('PostReducer', () => {
  it('should return same state if action is not recognized', () => {
    const oldState = {};

    const newState = postReducer(oldState, { type: 'unknown action' });

    expect(newState).toEqual(oldState);
  });

  describe('PostsFetched', () => {
    it('should set posts on an undefined state', () => {
      const posts = [ { id: '1' } ];

      const newState = postReducer(undefined, new PostsFetched(posts));

      expect(newState).toEqual({
        posts
      });
    });

    it('should set posts on an empty state', () => {
      const posts = [ { id: '1' } ];

      const newState = postReducer({}, new PostsFetched(posts));

      expect(newState).toEqual({
        posts
      });
    });

    it('should set posts on a state with posts', () => {
      const oldPosts = [ { id: '1' } ];
      const newPosts = [ { id: '2' } ];

      const newState = postReducer({ posts: oldPosts }, new PostsFetched(newPosts));

      expect(newState).toEqual({
        posts: newPosts
      });
    });
  });

  describe('PostContentFetched', () => {
    it('should set post content on an undefined state', () => {
      const fetchedPostContent = { post_id: '2', parts: [ { content: 'blah' } ] };

      const newState = postReducer(undefined, new PostContentFetched(fetchedPostContent));

      expect(newState).toEqual({
        posts: [ {
          id: '2',
          content: fetchedPostContent
        } ]
      });
    });

    it('should set post content on an empty state', () => {
      const fetchedPostContent = { post_id: '2', parts: [ { content: 'blah' } ] };

      const newState = postReducer({}, new PostContentFetched(fetchedPostContent));

      expect(newState).toEqual({
        posts: [ {
          id: '2',
          content: fetchedPostContent
        } ]
      });
    });

    it('should set post content on a state with no posts', () => {
      const fetchedPostContent = { post_id: '2', parts: [ { content: 'blah' } ] };

      const newState = postReducer({ posts: [] }, new PostContentFetched(fetchedPostContent));

      expect(newState).toEqual({
        posts: [ {
          id: '2',
          content: fetchedPostContent
        } ]
      });
    });

    it('should set post content on a state with preexisting posts, not containing post with content', () => {
      const fetchedPostContent = { post_id: '2', parts: [ { content: 'foo' } ] };
      const preExistingPost = {
        id: '1',
        content: {
          post_id: '1',
          parts: [ { content: 'blah' } ]
        }
      };

      const newState = postReducer({ posts: [ preExistingPost ] }, new PostContentFetched(fetchedPostContent));

      expect(newState).toEqual({
        posts: [ preExistingPost, {
          id: '2',
          content: fetchedPostContent
        } ]
      });
    });

    it('should set post content on a state with preexisting posts  containing post with content', () => {
      const fetchedPostContent = { post_id: '2', parts: [ { content: 'blah' } ] };
      const preExistingPost = {
        id: '2',
        content: {
          post_id: '2',
          parts: [ { content: 'foo' } ]
        }
      };

      const newState = postReducer({ posts: [ preExistingPost ] }, new PostContentFetched(fetchedPostContent));

      expect(newState).toEqual({
        posts: [ {
          id: '2',
          content: fetchedPostContent
        } ]
      });
    });
  });

  describe('PostFetched', () => {
    it('should set post on an undefined state', () => {
      const fetchedPost = { id: '2', title: 'hi' };

      const newState = postReducer(undefined, new PostFetched(fetchedPost));

      expect(newState).toEqual({
        posts: [ fetchedPost ]
      });
    });

    it('should set post on an empty state', () => {
      const fetchedPost = { id: '2', title: 'hi'  };

      const newState = postReducer({}, new PostFetched(fetchedPost));

      expect(newState).toEqual({
        posts: [ fetchedPost ]
      });
    });

    it('should set post on a state with no posts', () => {
      const fetchedPost = { id: '2', title: 'hi' };

      const newState = postReducer({ posts: [] }, new PostFetched(fetchedPost));

      expect(newState).toEqual({
        posts: [ fetchedPost ]
      });
    });

    it('should add post on a state with preexisting posts, not containing post', () => {
      const fetchedPost = { id: '2', title: 'hi'  };
      const preExistingPost = {
        id: '1',
        title: 'lo'
      };

      const newState = postReducer({ posts: [ preExistingPost ] }, new PostFetched(fetchedPost));

      expect(newState).toEqual({
        posts: [ preExistingPost, fetchedPost ]
      });
    });

    it('should update post on a state with preexisting posts, containing post', () => {
      const fetchedPost = { id: '2', title: 'hi'  };
      const preExistingPost = {
        id: '2',
        title: 'lo'
      };

      const newState = postReducer({ posts: [ preExistingPost ] }, new PostFetched(fetchedPost));

      expect(newState).toEqual({
        posts: [ fetchedPost ]
      });
    });
  });
});
