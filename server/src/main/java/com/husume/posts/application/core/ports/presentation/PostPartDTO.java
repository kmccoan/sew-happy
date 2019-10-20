package com.husume.posts.application.core.ports.presentation;

public class PostPartDTO {
    private String content;

    protected PostPartDTO() {
    }

    public PostPartDTO(String content) {
        this.content = content;
    }

    public String getContent() {
        return content;
    }
}
