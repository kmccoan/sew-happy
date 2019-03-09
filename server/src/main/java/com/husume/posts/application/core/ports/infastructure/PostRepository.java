package com.husume.posts.application.core.ports.infastructure;

import java.util.List;

public interface PostRepository {
    PostPO get(String id);
    List<PostPO> getAll();
}