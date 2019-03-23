package com.husume.posts.application.core.services;

import org.springframework.stereotype.Component;

import com.husume.posts.application.core.domain.models.Post;
import com.husume.posts.application.core.domain.models.PostContent;
import com.husume.posts.application.core.domain.models.PostID;
import com.husume.posts.application.core.domain.models.PostPart;
import com.husume.posts.application.core.ports.infastructure.PostContentPO;
import com.husume.posts.application.core.ports.infastructure.PostPO;
import com.husume.posts.application.core.ports.infastructure.PostPartPO;

import java.util.ArrayList;
import java.util.List;

@Component
public class POConverter {
    public Post convert(PostPO po) {
        if (po == null) {
            return null;
        }
        return new Post(po.getId(), po.getTitle(), po.getAuthor(), po.getArchived(), po.getSummaryImageUrl());
    }

    public PostPO convert(Post post) {
        if (post == null) {
            return null;
        }
        return new PostPO(post.getId(), post.getAuthor(), post.getTitle(), post.getArchived(), post.getSummaryImageUrl());
    }

    public List<Post> convertAll(List<PostPO> pos) {
        List<Post> posts = new ArrayList<>();
        pos.forEach(po -> posts.add(convert(po)));
        return posts;
    }

    public PostContent convert(PostContentPO po) {
        if (po == null) {
            return null;
        }
        return new PostContent(convertAllParts(po.getParts()));
    }

    public List<PostPart> convertAllParts(List<PostPartPO> pos) {
        List<PostPart> parts = new ArrayList<>();
        pos.forEach(po -> parts.add(new PostPart(po.getContent())));
        return parts;
    }
}
