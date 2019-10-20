package com.husume.posts.infastructure;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.husume.infastructure.postgres.PostgresDataStore;
import com.husume.posts.application.core.domain.models.PostID;
import com.husume.posts.application.core.ports.infastructure.PostContentPO;
import com.husume.posts.application.core.ports.infastructure.PostContentRepository;
import com.husume.posts.application.core.ports.infastructure.PostPartPO;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.UUID;

@Component
public class PostgresPostContentRepository implements PostContentRepository {
    @Autowired
    private PostgresDataStore postgresDataStore;

    @Override
    public PostContentPO get(PostID id) {
        List<PostPartPO> parts = postgresDataStore.transaction(connection -> {
            return connection.query(
                "select * from post_content where post_id = ?",
                this::convertToPostPart,
                id.asUUID());
        });

        return new PostContentPO(id, parts);
    }

    @Override
    public void save(PostContentPO content) {
        if (content.getPostId() == null) {
            throw new RuntimeException("Cannot save a content without Post ID.");
        }

        postgresDataStore.transaction(connection -> {
            connection.delete("delete from post_content where post_id = ?", content.getPostId().asUUID());

            content.getParts().forEach(part -> {
                connection.create(
                    "insert into post_content(id, post_id, content) values(?, ?, ?)",
                    UUID.randomUUID(), content.getPostId().asUUID(), part.getContent()
                );
            });
        });
    }

    private PostPartPO convertToPostPart(ResultSet row) throws SQLException {
        return new PostPartPO(row.getString("content"));
    }
}
