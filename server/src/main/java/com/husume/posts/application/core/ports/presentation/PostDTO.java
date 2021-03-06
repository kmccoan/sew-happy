package com.husume.posts.application.core.ports.presentation;

public class PostDTO {
    private String id;
    private String title;
    private String author;
    private Boolean archived;
    private String summaryImageUrl;

    protected PostDTO(){}

    public PostDTO(String id, String title, String author, Boolean archived, String summaryImageUrl) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.archived = archived;
        this.summaryImageUrl = summaryImageUrl;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public Boolean getArchived() {
        return archived;
    }

    public void setArchived(Boolean archived) {
        this.archived = archived;
    }

    public String getSummaryImageUrl() {
        return summaryImageUrl;
    }

    public void setSummaryImageUrl(String summaryImageUrl) {
        this.summaryImageUrl = summaryImageUrl;
    }
}
