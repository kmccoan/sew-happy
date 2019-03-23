package com.husume.posts.application.core.ports.infastructure;

import com.husume.posts.application.core.domain.models.PostID;

public interface PostContentRepository {
    PostContentPO get(PostID id);
}