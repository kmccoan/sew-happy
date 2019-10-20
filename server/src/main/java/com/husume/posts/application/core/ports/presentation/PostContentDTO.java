package com.husume.posts.application.core.ports.presentation;

import java.util.List;

public class PostContentDTO {
    private String postId;
    private List<PostPartDTO> parts;

    protected PostContentDTO() {
    }

    public PostContentDTO(String postId, List<PostPartDTO> parts) {
        this.postId = postId;
        this.parts = parts;
    }

    public String getPostId() {
        return postId;
    }

    public List<PostPartDTO> getParts() {
        return parts;
    }
}
