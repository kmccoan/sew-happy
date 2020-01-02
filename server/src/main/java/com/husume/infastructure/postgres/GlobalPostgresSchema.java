package com.husume.infastructure.postgres;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

@Component
class GlobalPostgresSchema {
    /**
     * Format is: postgres://username:password@host:port/database-name
     */
    public static final String DATABASE_URL = "DATABASE_URL";

    public String getDatabaseName() {
        String database = getUrl().split("/")[1];
        return convertBlankToNull(database);
    }

    public String getSchemaName() {
        return "public";
    }

    public String getEndpoint() {
        String[] hostPieces = getHostPieces();
        String passwordAtHost = hostPieces[1];
        String endpoint = passwordAtHost.split("@")[1] + ":" + hostPieces[2];
        return convertBlankToNull(endpoint);
    }

    public String getUsername() {
        String username = getUrl().split(":")[0];
        return convertBlankToNull(username);
    }

    public String getPassword() {
        String[] hostPieces = getHostPieces();
        String passwordAtHost = hostPieces[1];
        String password = passwordAtHost.split("@")[0];
        return convertBlankToNull(password);
    }

    private String convertBlankToNull(String text) {
        if (StringUtils.isBlank(text)) {
            return null;
        }
        return text;
    }

    private String getUrl() {
        return System.getenv().get(DATABASE_URL).substring("postgres://".length());
    }

    private String[] getHostPieces() {
        String hostPart = getUrl().split("/")[0];
        return hostPart.split(":");
    }
}
