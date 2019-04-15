package com.husume.posts.application.core.ports.infastructure;

import org.apache.commons.lang3.StringUtils;

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

    public void updateTitle(String title) {
        if (StringUtils.isBlank(title)) {
            throw new RuntimeException("Cannot update post title to blank.");
        }
        this.title = title;
    }

    public void updateSummaryImageUrl(String summaryImageUrl) {
        if (StringUtils.isBlank(summaryImageUrl)) {
            throw new RuntimeException("Cannot update post summary image to blank.");
        }
        this.summaryImageUrl = summaryImageUrl;
    }
}
