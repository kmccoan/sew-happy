package com.husume.appserver;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.http.HttpServerResponse;
import io.vertx.core.json.Json;
import io.vertx.ext.web.Router;

@Component
public class AppServer extends AbstractVerticle {

    @Autowired
    private AppServerConfiguration appServerConfiguration;

    @Override
    public void start() throws Exception {
        super.start();

        vertx.createHttpServer().requestHandler(router()::accept).listen(appServerConfiguration.httpPort());
    }

    private Router router() {
        Router router = Router.router(vertx);

        router.route("/health-check").handler(routingContext -> {

            HttpServerResponse response = routingContext.response();

            response.putHeader("Content-Type", "application/json");
            String healthCheck = "{\"status\":\"OK\"}";
            response.end(Json.encodePrettily(healthCheck));
        });

        return router;
    }
}