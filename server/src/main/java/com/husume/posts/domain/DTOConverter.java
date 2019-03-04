package com.husume.posts.domain;

import org.springframework.stereotype.Component;

import com.husume.posts.primary.ports.PostContentDTO;
import com.husume.posts.primary.ports.PostDTO;
import com.husume.posts.primary.ports.PostPartDTO;

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
