package com.husume.posts.domain;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.husume.posts.primary.ports.PostContentDTO;
import com.husume.posts.primary.ports.PostDTO;
import com.husume.posts.primary.ports.PostService;
import com.husume.posts.secondary.ports.PostContentRepository;
import com.husume.posts.secondary.ports.PostRepository;

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
