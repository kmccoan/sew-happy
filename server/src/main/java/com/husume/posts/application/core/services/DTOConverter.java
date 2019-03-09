package com.husume.posts.application.core.services;

import org.springframework.stereotype.Component;

import com.husume.posts.application.core.domain.models.Post;
import com.husume.posts.application.core.domain.models.PostContent;
import com.husume.posts.application.core.domain.models.PostID;
import com.husume.posts.application.core.domain.models.PostPart;
import com.husume.posts.application.core.ports.presentation.PostContentDTO;
import com.husume.posts.application.core.ports.presentation.PostDTO;
import com.husume.posts.application.core.ports.presentation.PostPartDTO;

import java.util.ArrayList;
import java.util.List;

@Component
public class DTOConverter {
    public PostDTO convert(Post post) {
        if (post == null) {
            return null;
        }
        return new PostDTO(post.getId().asString(), post.getTitle(), post.getAuthor(), post.getArchived(), post.getSummaryImageUrl());
    }

    public List<PostDTO> convertAll(List<Post> posts) {
        List<PostDTO> dtos = new ArrayList<>();
        posts.forEach(post -> dtos.add(convert(post)));
        return dtos;
    }

    public PostContentDTO convert(PostID id, PostContent content) {
        if (id == null || content == null) {
            return null;
        }
        return new PostContentDTO(id.asString(), convertAllParts(content.getParts()));
    }

    public List<PostPartDTO> convertAllParts(List<PostPart> parts) {
        List<PostPartDTO> dtos = new ArrayList<>();
        parts.forEach(part -> dtos.add(new PostPartDTO(part.getContent())));
        return dtos;
    }
}
