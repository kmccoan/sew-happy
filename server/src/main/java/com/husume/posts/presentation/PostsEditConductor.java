package com.husume.posts.presentation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.husume.posts.application.core.domain.models.PostID;
import com.husume.posts.application.core.ports.presentation.PostDTO;
import com.husume.posts.application.core.ports.presentation.PostService;

import java.io.IOException;

import io.vertx.core.Handler;
import io.vertx.core.http.HttpServerResponse;
import io.vertx.ext.web.RoutingContext;

@Component
public class PostsEditConductor implements Handler<RoutingContext> {

    @Autowired
    private PostService postService;

    @Autowired
    private JsonObjectMapper mapper;

    @Override
    public void handle(RoutingContext routingContext) {
        HttpServerResponse response = routingContext.response();
        response.putHeader("Content-Type", "application/json");

        try {
            PostDTO postToEdit = mapper.readValue(routingContext.getBodyAsString(), PostDTO.class);
            postService.edit(PostID.valueOf(postToEdit.getId()), postToEdit.getTitle(), postToEdit.getSummaryImageUrl());
            response.end();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}