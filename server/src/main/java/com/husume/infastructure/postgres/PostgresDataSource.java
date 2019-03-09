package com.husume.infastructure.postgres;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

import java.util.Properties;

@Component
class PostgresDataSource {
    private static final Logger LOG = LoggerFactory.getLogger(PostgresDataSource.class);

    private static final int POOL_MAX_CONNECTIONS = 5; // TODO

    public HikariDataSource getDataSource(
            String endpoint,
            String databaseName,
            String username,
            String password,
            String schemaName) {
        return createDataSource(endpoint, databaseName, username, password, schemaName);
    }

    private HikariDataSource createDataSource(
            String endpoint,
            String databaseName,
            String username,
            String password,
            String schemaName) {
        if (StringUtils.countMatches(endpoint, ':') != 1) {
            throw new IllegalArgumentException(
                    String.format("Invalid endpoint [%s] for postgresql database", endpoint));
        }

        String databaseHost = StringUtils.substringBefore(endpoint, ":");
        int databasePort = NumberUtils.toInt(StringUtils.substringAfter(endpoint, ":"));

        Properties props = new Properties();
        props.setProperty("dataSourceClassName", org.postgresql.ds.PGSimpleDataSource.class.getName());
        props.setProperty("dataSource.serverName", databaseHost);
        props.setProperty("dataSource.portNumber", Integer.toString(databasePort));
        props.setProperty("dataSource.user", username);
        if (password != null) {
            props.setProperty("dataSource.password", password);
        }
        props.setProperty("dataSource.databaseName", databaseName);

        HikariConfig config = new HikariConfig(props);
        config.setAutoCommit(false);
        config.setMaximumPoolSize(POOL_MAX_CONNECTIONS);

        if (!StringUtils.isEmpty(schemaName)) {
            LOG.info("Setting search path {}", schemaName);
            config.setConnectionInitSql("SET search_path TO " + schemaName);
        }

        return new HikariDataSource(config);
    }
}
