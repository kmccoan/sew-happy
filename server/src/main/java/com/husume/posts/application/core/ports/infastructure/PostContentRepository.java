package com.husume.posts.application.core.ports.infastructure;

public interface PostContentRepository {
    PostContentPO get(Integer id);
}