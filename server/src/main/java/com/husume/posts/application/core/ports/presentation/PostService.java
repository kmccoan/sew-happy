package com.husume.posts.application.core.ports.presentation;

import java.util.List;

public interface PostService {
    PostDTO get(String id);
    List<PostDTO> getAll();

    PostContentDTO getContent(String id);
}
