package com.husume.posts.infastructure;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.husume.posts.application.core.ports.infastructure.PostContentPO;
import com.husume.posts.application.core.ports.infastructure.PostContentRepository;
import com.husume.posts.application.core.ports.infastructure.PostPartPO;
import com.husume.infastructure.postgres.PostgresDataStore;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Component
public class PostgresPostContentRepository implements PostContentRepository {
    @Autowired
    private PostgresDataStore postgresDataStore;

    @Override
    public PostContentPO get(Integer id) {
        List<PostPartPO> parts = postgresDataStore.transaction(connection -> {
            return connection.query(
                "select * from post_content where post_id = ?",
                this::convertToPostPart,
                id);
        });

        return new PostContentPO(id, parts);
    }

    private PostPartPO convertToPostPart(ResultSet row) throws SQLException {
        return new PostPartPO(row.getString("content"));
    }
}
