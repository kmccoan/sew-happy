package com.husume.posts.application.core.ports.infastructure;

import com.husume.posts.application.core.domain.models.PostID;

public class PostPO {
    private PostID id;
    private String title;
    private String author;
    private Boolean archived;
    private String summaryImageUrl;

    public PostPO() {
    }

    public PostPO(PostID id, String author, String title, Boolean archived, String summaryImageUrl) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.archived = archived;
        this.summaryImageUrl = summaryImageUrl;
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
