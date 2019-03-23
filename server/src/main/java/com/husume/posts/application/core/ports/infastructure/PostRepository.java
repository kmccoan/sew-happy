package com.husume.posts.application.core.ports.infastructure;

import com.husume.posts.application.core.domain.models.PostID;

import java.util.List;

public interface PostRepository {
    PostPO get(PostID id);
    List<PostPO> getAll();

    void create(PostPO newPost);
}