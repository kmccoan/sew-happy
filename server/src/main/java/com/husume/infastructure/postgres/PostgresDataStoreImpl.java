package com.husume.infastructure.postgres;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.zaxxer.hikari.HikariDataSource;

import java.util.function.Consumer;
import java.util.function.Function;

@Component
class PostgresDataStoreImpl implements PostgresDataStore {

    @Autowired
    private PostgresDataSource sqlDataSource;

    @Autowired
    private GlobalPostgresSchema schema;

    @Override
    public <T> T transaction(Function<PostgresConnection, T> f) {
        try (PostgresConnection connection = internalGetConnection()) {
            return connection.transaction(() -> f.apply(connection));

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void transaction(Consumer<PostgresConnection> f) {
        transaction(
            (connection) -> {
                f.accept(connection);
                return null;
            });
    }

    private PostgresConnection internalGetConnection() {
        try {
            return new PostgresConnection(getDataSourceForSchema().getConnection());

        } catch (Exception e) {
            throw new RuntimeException("Cannot get connection", e);
        }
    }

    private HikariDataSource getDataSourceForSchema() {
        try {
            String schemaName = schema.getSchemaName();
            String databaseName = schema.getDatabaseName();
            String endpoint = schema.getEndpoint();
            String username = schema.getUsername();
            String password = schema.getPassword();

            return sqlDataSource.getDataSource(endpoint, databaseName, username, password, schemaName);

        } catch (Exception e) {
            throw new RuntimeException("Cannot create datasource for schema: " + schema, e);
        }
    }
}
