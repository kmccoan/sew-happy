package com.husume.posts.application.core.ports.infastructure;

import com.husume.posts.application.core.domain.models.PostID;

import java.util.List;

public class PostContentPO {
    private PostID postId;
    private List<PostPartPO> parts;

    public PostContentPO(PostID postId, List<PostPartPO> parts) {
        this.postId = postId;
        this.parts = parts;
    }

    public PostID getPostId() {
        return postId;
    }

    public List<PostPartPO> getParts() {
        return parts;
    }
}
