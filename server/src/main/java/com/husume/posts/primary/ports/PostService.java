package com.husume.posts.primary.ports;

import java.util.List;

public interface PostService {
    PostDTO get(String id);
    List<PostDTO> getAll();

    PostContentDTO getContent(String id);
}
