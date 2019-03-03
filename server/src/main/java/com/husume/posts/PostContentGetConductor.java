package com.husume.posts;

import org.springframework.stereotype.Component;

import io.vertx.core.Handler;
import io.vertx.core.http.HttpServerResponse;
import io.vertx.ext.web.RoutingContext;

@Component
public class PostContentGetConductor implements Handler<RoutingContext> {

    @Override
    public void handle(RoutingContext routingContext) {
        HttpServerResponse response = routingContext.response();
        response.putHeader("Content-Type", "application/json");
        String id = routingContext.request().getParam("id");
        response.end("{" +
            "\"postId\":\"" + id + "\"," +
            "\"parts\":[{\"content\":\"My post content " + id + "\"},{\"content\":\"More content\"}]" +
            "}");
    }
}