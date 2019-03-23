package com.husume.posts.application.core.domain.models;

import com.husume.common.id.AbstractID;

import java.util.UUID;

@SuppressWarnings("serial")
public class PostID extends AbstractID {

    protected PostID(UUID value) {
        super(value);
    }

    public static PostID valueOf(String value) {
        return valueOf(PostID::new, value);
    }
}
