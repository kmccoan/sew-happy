package com.husume.posts;

import org.springframework.stereotype.Component;

import io.vertx.core.Handler;
import io.vertx.ext.web.RoutingContext;

@Component
public class PostContentConductorFactory {
    public static Handler<RoutingContext> createGetHandler() {
        return new PostContentGetConductor();
    }
}
