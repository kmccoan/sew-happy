package com.husume.posts.primary.ports;

public class PostPartDTO {
    private String content;

    public PostPartDTO(String content) {
        this.content = content;
    }

    public String getContent() {
        return content;
    }
}
