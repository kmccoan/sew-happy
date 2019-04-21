package com.husume.posts.presentation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.husume.posts.application.core.domain.models.PostID;
import com.husume.posts.application.core.ports.presentation.PostService;

import java.io.IOException;

import io.vertx.core.Handler;
import io.vertx.core.http.HttpServerResponse;
import io.vertx.ext.web.RoutingContext;

@Component
public class PostsDeleteConductor implements Handler<RoutingContext> {

    @Autowired
    private PostService postService;

    @Override
    public void handle(RoutingContext routingContext) {
        HttpServerResponse response = routingContext.response();
        response.putHeader("Content-Type", "application/json");
        PostID id = PostID.valueOf(routingContext.request().getParam("id"));
        postService.delete(id);
        response.end();
    }
}