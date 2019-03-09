package com.husume.posts.application.core.ports.infastructure;

import java.util.List;

public interface PostRepository {
    PostPO get(Integer id);
    List<PostPO> getAll();
}