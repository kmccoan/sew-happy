package com.husume.posts.domain;

import java.util.List;

public class PostContent {
    private List<PostPart> parts;

    public PostContent(List<PostPart> parts) {
        this.parts = parts;
    }

    public List<PostPart> getParts() {
        return parts;
    }
}
