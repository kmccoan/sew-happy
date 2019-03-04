package com.husume.posts.domain;

import org.springframework.stereotype.Component;

import com.husume.posts.secondary.ports.PostContentPO;
import com.husume.posts.secondary.ports.PostPO;
import com.husume.posts.secondary.ports.PostPartPO;

import java.util.ArrayList;
import java.util.List;

@Component
public class POConverter {
    public Post convert(PostPO po) {
        if (po == null) {
            return null;
        }
        return new Post(PostID.valueOf(po.getId()), po.getTitle(), po.getAuthor(), po.getArchived(), po.getSummaryImageUrl());
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
