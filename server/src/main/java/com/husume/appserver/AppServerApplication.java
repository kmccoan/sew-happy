package com.husume.appserver;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.annotation.PostConstruct;

import io.vertx.core.Vertx;

@SpringBootApplication
public class AppServerApplication {

    @Autowired
    public AppServer appServer;

    public static void main(String[] args) {
        SpringApplication.run(AppServerApplication.class, args);
    }

    @PostConstruct
    public void deployVerticle() {
        Vertx.vertx().deployVerticle(appServer);
    }
}
