package com.husume.posts.secondary.ports;

import java.util.List;

public class PostContentPO {
    private String postId;
    private List<PostPartPO> parts;

    public PostContentPO(String postId, List<PostPartPO> parts) {
        this.postId = postId;
        this.parts = parts;
    }

    public String getPostId() {
        return postId;
    }

    public List<PostPartPO> getParts() {
        return parts;
    }
}
