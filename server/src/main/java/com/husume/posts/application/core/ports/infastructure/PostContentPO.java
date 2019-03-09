package com.husume.posts.application.core.ports.infastructure;

import java.util.List;

public class PostContentPO {
    private Integer postId;
    private List<PostPartPO> parts;

    public PostContentPO(Integer postId, List<PostPartPO> parts) {
        this.postId = postId;
        this.parts = parts;
    }

    public Integer getPostId() {
        return postId;
    }

    public List<PostPartPO> getParts() {
        return parts;
    }
}
