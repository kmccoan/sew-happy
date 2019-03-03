package com.husume.posts.conductors;

import org.springframework.stereotype.Component;

import io.vertx.core.Handler;
import io.vertx.core.http.HttpServerResponse;
import io.vertx.ext.web.RoutingContext;

@Component
public class PostsGetConductor implements Handler<RoutingContext> {

    @Override
    public void handle(RoutingContext routingContext) {
        HttpServerResponse response = routingContext.response();
        response.putHeader("Content-Type", "application/json");
        String id = routingContext.request().getParam("id");
        if (id.equals("1")) {
            response.end(
                "{" +
                    "\"id\":\"1\"," +
                    "\"title\":\"This is a post about some things\"," +
                    "\"tags\":[\"1\"]," +
                    "\"author\":\"Kira McCoan\"," +
                    "\"archived\":false," +
                    "\"summary_image_url\":\"https://scontent-lga3-1.cdninstagram.com/vp/53e34122f24d9ca932e0d6fb47c8f764/5D28C47B/t51.2885-15/e35/14027230_737870619684544_1256594505_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com\"" +
                    "}"
            );
        } else if (id.equals("2")) {
            response.end(
                "{" +
                    "\"id\":\"2\"," +
                    "\"title\":\"Another post\"," +
                    "\"tags\":[\"2\"]," +
                    "\"author\":\"Kira McCoan\"," +
                    "\"archived\":false," +
                    "\"summary_image_url\":\"https://scontent-lga3-1.cdninstagram.com/vp/53e34122f24d9ca932e0d6fb47c8f764/5D28C47B/t51.2885-15/e35/14027230_737870619684544_1256594505_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com\"" +
                    "}"
            );
        } else {
            response.end("{}");
        }
    }
}