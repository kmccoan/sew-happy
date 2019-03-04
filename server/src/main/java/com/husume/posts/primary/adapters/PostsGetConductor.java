package com.husume.posts.primary.adapters;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.husume.posts.primary.ports.PostDTO;
import com.husume.posts.primary.ports.PostService;

import io.vertx.core.Handler;
import io.vertx.core.http.HttpServerResponse;
import io.vertx.ext.web.RoutingContext;

@Component
public class PostsGetConductor implements Handler<RoutingContext> {

    @Autowired
    private PostService postService;

    @Autowired
    private JsonObjectMapper mapper;

    @Override
    public void handle(RoutingContext routingContext) {
        HttpServerResponse response = routingContext.response();
        response.putHeader("Content-Type", "application/json");
        String id = routingContext.request().getParam("id");
        try {
            PostDTO post = postService.get(id);
            if (post == null) {
                response.end("{}"); //TODO: not found.
            } else {
                response.end(mapper.writeValueAsString(post));
            }
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}