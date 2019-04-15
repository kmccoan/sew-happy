package com.husume.posts.application.core.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.husume.posts.application.core.domain.models.Post;
import com.husume.posts.application.core.domain.models.PostID;
import com.husume.posts.application.core.ports.infastructure.PostPO;
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
    public PostDTO get(PostID id) {
        return dtoConverter.convert(poConverter.convert(postRepository.get(id)));
    }

    @Override
    public List<PostDTO> getAll() {
        return dtoConverter.convertAll(poConverter.convertAll(postRepository.getAll()));
    }

    @Override
    public PostID create(String author, String title, String summaryUrl) {
        Post newPost = new Post(title, author, summaryUrl);

        postRepository.create(poConverter.convert(newPost));
        return newPost.getId();
    }

    @Override
    public PostContentDTO getContent(PostID id) {
        return dtoConverter.convert(id, poConverter.convert(contentRepository.get(id)));
    }

    @Override
    public void edit(PostID id, String title, String summaryImageUrl) {
        PostPO post = postRepository.get(id);
        post.updateTitle(title);
        post.updateSummaryImageUrl(summaryImageUrl);
        postRepository.save(post);
    }
}
