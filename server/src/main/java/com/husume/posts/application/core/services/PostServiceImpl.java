package com.husume.posts.application.core.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.husume.posts.application.core.domain.models.PostID;
import com.husume.posts.application.core.ports.presentation.PostContentDTO;
import com.husume.posts.application.core.ports.presentation.PostDTO;
import com.husume.posts.application.core.ports.presentation.PostService;
import com.husume.posts.application.core.ports.infastructure.PostContentRepository;
import com.husume.posts.application.core.ports.infastructure.PostRepository;

import java.util.List;

@Component
public class PostServiceImpl implements PostService {
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private PostContentRepository contentRepository;
    @Autowired
    private DTOConverter dtoConverter;
    @Autowired
    private POConverter poConverter;

    @Override
    public PostDTO get(String id) {
        PostID postId = PostID.valueOf(id);
        return dtoConverter.convert(poConverter.convert(postRepository.get(postId.asString())));
    }

    @Override
    public List<PostDTO> getAll() {
        return dtoConverter.convertAll(poConverter.convertAll(postRepository.getAll()));
    }

    @Override
    public PostContentDTO getContent(String id) {
        PostID postId = PostID.valueOf(id);
        return dtoConverter.convert(postId, poConverter.convert(contentRepository.get(postId.asString())));
    }
}
