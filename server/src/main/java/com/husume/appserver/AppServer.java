package com.husume.appserver;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.husume.posts.presentation.PostContentConductorFactory;
import com.husume.posts.presentation.PostsConductorFactory;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.http.HttpServerResponse;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.handler.StaticHandler;

@Component
public class AppServer extends AbstractVerticle {

    @Autowired
    private AppServerConfiguration appServerConfiguration;

    @Autowired
    private PostContentConductorFactory contentConductorFactory;

    @Autowired
    private PostsConductorFactory postsConductorFactory;

    @Override
    public void start() throws Exception {
        super.start();

        vertx.createHttpServer().requestHandler(router()::accept).listen(appServerConfiguration.httpPort());
    }

    private Router router() {
        Router mainRouter = Router.router(vertx);

        mainRouter.route("/health-check").handler(routingContext -> {
            HttpServerResponse response = routingContext.response();
            response.putHeader("Content-Type", "application/json");
            response.end("{\"status\":\"OK\"}");
        });

        mainRouter.route().handler(StaticHandler.create());

        Router apiRouter = Router.router(vertx);
        mainRouter.mountSubRouter("/api", apiRouter);

        Router postRouter = Router.router(vertx);
        apiRouter.mountSubRouter("/posts", postRouter);

        postRouter.get("/:id/content").handler(contentConductorFactory.createGetHandler());
        postRouter.get("/:id").handler(postsConductorFactory.createGetHandler());
        postRouter.get().handler(postsConductorFactory.createGetAllHandler());

        return mainRouter;
    }
}