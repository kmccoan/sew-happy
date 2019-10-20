package com.husume.posts.presentation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import io.vertx.core.Handler;
import io.vertx.ext.web.RoutingContext;

@Component
public class PostContentConductorFactory {
    @Autowired
    private PostContentGetConductor conductor;

    @Autowired
    private PostContentEditConductor editConductor;

    public Handler<RoutingContext> createGetHandler() {
        return conductor;
    }

    public Handler<RoutingContext> createPutHandler() {
        return editConductor;
    }
}
