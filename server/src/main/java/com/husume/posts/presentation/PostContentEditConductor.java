package com.husume.posts.presentation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.husume.posts.application.core.domain.models.PostID;
import com.husume.posts.application.core.ports.presentation.PostContentDTO;
import com.husume.posts.application.core.ports.presentation.PostPartDTO;
import com.husume.posts.application.core.ports.presentation.PostService;

import java.io.IOException;
import java.util.stream.Collectors;

import io.vertx.core.Handler;
import io.vertx.core.http.HttpServerResponse;
import io.vertx.ext.web.RoutingContext;

@Component
public class PostContentEditConductor implements Handler<RoutingContext> {

    @Autowired
    private PostService postService;

    @Autowired
    private JsonObjectMapper mapper;

    @Override
    public void handle(RoutingContext routingContext) {
        HttpServerResponse response = routingContext.response();
        response.putHeader("Content-Type", "application/json");
        PostID id = PostID.valueOf(routingContext.request().getParam("id"));
        try {
            PostContentDTO postToEdit = mapper.readValue(routingContext.getBodyAsString(), PostContentDTO.class);
            postService.editContent(id, postToEdit.getParts().stream().map(PostPartDTO::getContent).collect(Collectors.toList()));
            response.end();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}