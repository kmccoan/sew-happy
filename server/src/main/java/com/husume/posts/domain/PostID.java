package com.husume.posts.domain;

import com.husume.common.id.AbstractID;

@SuppressWarnings("serial")
public class PostID extends AbstractID {

    public static PostID valueOf(String value) {
        return valueOf(PostID::new, value);
    }

    public static PostID valueOf(Integer value) {
        return valueOf(PostID::new, value);
    }

    public PostID(Integer value) {
        super(value);
    }
}
