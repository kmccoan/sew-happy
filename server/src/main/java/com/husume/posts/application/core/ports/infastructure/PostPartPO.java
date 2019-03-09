package com.husume.posts.application.core.ports.infastructure;

public class PostPartPO {
    private String content;

    public PostPartPO(String content) {
        this.content = content;
    }

    public String getContent() {
        return content;
    }
}
