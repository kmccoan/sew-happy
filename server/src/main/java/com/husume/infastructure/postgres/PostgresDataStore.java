package com.husume.infastructure.postgres;

import java.util.function.Consumer;
import java.util.function.Function;

public interface PostgresDataStore {
    <T> T transaction(Function<PostgresConnection, T> f);

    void transaction(Consumer<PostgresConnection> f);
}
