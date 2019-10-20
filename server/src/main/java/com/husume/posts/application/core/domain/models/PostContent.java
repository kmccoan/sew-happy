package com.husume.posts.application.core.domain.models;

import org.apache.commons.lang3.StringUtils;

import java.util.ArrayList;
import java.util.List;

public class PostContent {
    private List<PostPart> parts;
    private PostID postID;

    public PostContent(PostID postID, List<PostPart> parts) {
        this.parts = parts;
        this.postID = postID;
    }

    public List<PostPart> getParts() {
        return parts;
    }

    public PostID getPostId() {
        return this.postID;
    }

    public void setContents(List<String> contentParts) {
        List<PostPart> parts = new ArrayList<>();

        for (String contentPart : contentParts) {
            if (!StringUtils.isBlank(contentPart)) {
                parts.add(new PostPart(contentPart));
            }
        }

        this.parts = parts;
    }
}
