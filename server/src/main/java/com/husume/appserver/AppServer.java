package com.husume.appserver;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.husume.posts.PostsConductorFactory;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.http.HttpServerResponse;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.handler.StaticHandler;

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
        Router mainRouter = Router.router(vertx);
//        mainRouter.route().handler(CorsHandler.create(".*")); //TODO: dev mode only

        mainRouter.route("/health-check").handler(routingContext -> {
            HttpServerResponse response = routingContext.response();
            response.putHeader("Content-Type", "application/json");
            response.end("{\"status\":\"OK\"}");
        });

        mainRouter.route().handler(StaticHandler.create());

        Router apiRouter = Router.router(vertx);
        mainRouter.mountSubRouter("/api", apiRouter);

        apiRouter.get("/posts").handler(PostsConductorFactory.createGetAllHandler());

        return mainRouter;
    }
}