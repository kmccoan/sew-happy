import { Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cold } from 'jasmine-marbles';
import { PostsService } from '../../services/posts.service';

import { PostPageComponent } from './post-page.component';

describe('PostPageComponent', () => {

  function setup() {
    const postsServiceMock = {
      getPostContent: () => cold('x', { x: { id: '2' } })
    };

    const activatedRouteMock = {
      paramMap: cold('x', {
        x: {
          get: () => '1'
        }
      })
    };

    const injector = Injector.create({
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: PostsService, useValue: postsServiceMock },
        {
          provide: PostPageComponent,
          deps: [ ActivatedRoute, PostsService ]
        }
      ]
    });

    return {
      component: injector.get(PostPageComponent)
    };
  }

  it('should create', () => {
    const { component } = setup();

    expect(component).toBeTruthy();
  });
});
