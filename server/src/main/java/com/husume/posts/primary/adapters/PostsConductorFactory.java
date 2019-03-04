package com.husume.posts.primary.adapters;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import io.vertx.core.Handler;
import io.vertx.ext.web.RoutingContext;

@Component
public class PostsConductorFactory {
    @Autowired
    private PostsGetConductor postsGetConductor;

    @Autowired
    private PostsGetAllConductor postsGetAllConductor;

    public Handler<RoutingContext> createGetAllHandler() {
        return postsGetAllConductor;
    }

    public Handler<RoutingContext> createGetHandler() {
        return postsGetConductor;
    }
}
