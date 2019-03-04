package com.husume.posts.secondary.ports;

import java.util.List;

public interface PostRepository {
    PostPO get(String id);
    List<PostPO> getAll();
}