package com.husume.infastructure.postgres;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.locks.ReentrantLock;
import java.util.function.Supplier;

public class PostgresConnection implements AutoCloseable {
    private final Connection jdbcConnection;
    private final ReentrantLock lock = new ReentrantLock();

    public PostgresConnection(Connection jdbcConnection) {
        this.jdbcConnection = jdbcConnection;
    }

    interface SqlFunction<T> {
        T apply(Connection c) throws SQLException;
    }

    interface SqlRunnable {
        void run(Connection c) throws SQLException;
    }

    // A Function<ResultSet, T>-like interface to allow throwing SQLException
    public interface ResultSetMapper<T> {
        T row(ResultSet rs) throws SQLException;
    }

    private void useConnection(SqlRunnable action) {
        useConnection(
            c -> {
                action.run(c);
                return null;
            });
    }

    private <T> T useConnection(SqlFunction<T> action) {
        if (!lock.tryLock()) {
            throw new IllegalStateException("Connection used across threads");
        }

        try {
            return action.apply(jdbcConnection);

        } catch (SQLException e) {
            throw new RuntimeException("SQL exception", e);

        } finally {
            lock.unlock();
        }
    }

    @Override
    public void close() {
        useConnection(Connection::close);
    }

    public <T> T queryOne(String sql, ResultSetMapper<T> mapper, Object... params) {
        List<T> resultList = query(sql, mapper, params);
        if (resultList.size() != 1) {
            throw new RuntimeException(String.format("queryOne expected one row but got %d rows", resultList.size()));
        }
        return resultList.get(0);
    }

    public <T> List<T> query(String sql, ResultSetMapper<T> mapper, Object... params) {
        checkInTransaction();

        // TODO sql linting?

        return useConnection(
            c -> {
                try (PreparedStatement stm = c.prepareStatement(sql)) {
                    for (int i = 0; i < params.length; i++) {
                        stm.setObject(i + 1, params[i]);
                    }

                    try (ResultSet rs = stm.executeQuery()) {
                        List<T> result = new ArrayList<>();

                        while (rs.next()) {
                            result.add(mapper.row(rs));
                        }

                        return result;
                    }

                } catch (SQLException e) {
                    throw new RuntimeException("Error executing query: \n " + sql, e);
                }
            });
    }

    private int crud(String sql, Object... values) {
        checkInTransaction();

        // TODO sql linting?

        return useConnection(
            c -> {
                try (PreparedStatement stm = c.prepareStatement(sql)) {
                    for (int i = 0; i < values.length; i++) {
                        stm.setObject(i + 1, values[i]);
                    }

                    return stm.executeUpdate();
                }
            });
    }

    public void create(String sql, Object... values) {
        if (0 >= crud(sql, values)) {
            throw new RuntimeException("Failed to insert row");
        }
    }

    public int update(String sql, Object... values) {
        return crud(sql, values);
    }

    public int delete(String sql, Object... values) {
        return crud(sql, values);
    }

    public void lock(String sql) {
        crud(sql);
    }

    public <T> T transaction(Supplier<T> action) {
        return bindAndRun(action);
    }

    private void checkInTransaction() {
        if (!lock.isLocked()) {
            throw new IllegalStateException("Connection used without transaction");
        }
    }

    private <T> T bindAndRun(Supplier<T> action) {
        if (lock.isLocked()) {
            throw new RuntimeException("Attempted to nest transactions for connection");
        }

        return useConnection(
            c -> {
                try {
                    T result;

                    try {
                        result = action.get();

                    } catch (RuntimeException e) {
                        throw e;
                    }

                    c.commit();

                    return result;

                } catch (Exception e) {
                    try {
                        c.rollback();
                    } catch (SQLException sqle) {
                        throw new RuntimeException(
                            "Exception thrown during transaction and exception during rollback.", e);
                    }

                    if (e instanceof RuntimeException) {
                        throw e;
                    }

                    throw new RuntimeException("Exception thrown during transaction. Rollback completed.", e);
                }
            });
    }
}
