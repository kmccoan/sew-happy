package com.husume.posts.secondary.ports;

public interface PostContentRepository {
    PostContentPO get(String id);
}