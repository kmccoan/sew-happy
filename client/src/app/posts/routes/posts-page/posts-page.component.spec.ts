import { Injector } from "@angular/core";
import { cold } from "jasmine-marbles";

import { Observable } from "rxjs";
import { Post } from "../../domain/models";

import { PostsService } from "../../services/posts.service";
import { PostsPageComponent } from "./posts-page.component";

type Config = {
  posts$?: Observable<ReadonlyArray<Post>>
}
describe("PostsPageComponent", () => {
  function setup(config: Config) {
    const postsServiceMock = {
      getPosts: () => config.posts$ || cold("x", { x: undefined }),
    };

    const injector = Injector.create([
      {
        provide: PostsPageComponent,
        useClass: PostsPageComponent,
        deps: [ PostsService ]
      },
      { provide: PostsService, useValue: postsServiceMock},
    ]);

    return {
      component: injector.get(PostsPageComponent),
      postsService: injector.get(PostsService)
    };
  }

  it("should create", () => {
    const { component } = setup({});

    expect(component).toBeTruthy();
  });

  describe("posts$", () => {
    it("should be posts from PostService", () => {
      const postsFromPostService$ = cold("x", {
        x: [
          {id: "1", title: "foo", archived: false, author: "auth", summary_image_url: "https://google.ca", tags: []},
          {id: "2", title: "boo", archived: true, author: "auth", summary_image_url: "https://google.ca", tags: []}
        ]
      });
      const { component } = setup({ posts$: postsFromPostService$ });

      expect(component.posts$).toBeObservable(postsFromPostService$);
    });
  });
});
