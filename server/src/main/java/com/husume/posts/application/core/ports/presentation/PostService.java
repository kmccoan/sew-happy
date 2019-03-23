package com.husume.posts.application.core.ports.presentation;

import com.husume.posts.application.core.domain.models.PostID;

import java.util.List;

public interface PostService {
    PostDTO get(PostID id);
    List<PostDTO> getAll();
    PostID create(String author, String title, String summaryUrl);

    PostContentDTO getContent(PostID id);
}
