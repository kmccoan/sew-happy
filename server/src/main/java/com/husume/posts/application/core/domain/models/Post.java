package com.husume.posts.application.core.domain.models;

import java.util.UUID;

public class Post {
    private PostID id;
    //TODO: refactor into "PostMetadata"
    private String title;
    private String author;
    private Boolean archived;
    private String summaryImageUrl;
    //TODO: end.
    private PostContent content;

    public Post(String title, String author, String summaryImageUrl) {
        this.id = PostID.valueOf(UUID.randomUUID().toString());
        this.title = title;
        this.author = author;
        this.summaryImageUrl = summaryImageUrl;
        this.archived = false;
    }

    public Post(PostID id, String title, String author, Boolean archived, String summaryImageUrl) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.archived = archived;
        this.summaryImageUrl = summaryImageUrl;
    }

    public Post(PostID id, PostContent content) {
        this.id = id;
        this.content = content;
    }

    public PostID getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getAuthor() {
        return author;
    }

    public Boolean getArchived() {
        return archived;
    }

    public String getSummaryImageUrl() {
        return summaryImageUrl;
    }
}
