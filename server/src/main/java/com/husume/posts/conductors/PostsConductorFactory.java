package com.husume.posts.conductors;

import org.springframework.stereotype.Component;

import io.vertx.core.Handler;
import io.vertx.ext.web.RoutingContext;

@Component
public class PostsConductorFactory {
    public static Handler<RoutingContext> createGetAllHandler() {
        return new PostsGetAllConductor();
    }
    public static Handler<RoutingContext> createGetHandler() {
        return new PostsGetConductor();
    }
}
