package com.husume.posts.infastructure;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.husume.posts.application.core.ports.infastructure.PostPO;
import com.husume.posts.application.core.ports.infastructure.PostRepository;
import com.husume.infastructure.postgres.PostgresDataStore;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Component
public class PostgresPostRepository implements PostRepository {
    @Autowired
    private PostgresDataStore postgresDataStore;

    @Override
    public PostPO get(Integer id) {
        return postgresDataStore.transaction(connection -> {
            return connection.queryOne(
                "select * from posts where id = ?",
                this::convertToPost,
                id);
        });
    }

    @Override
    public List<PostPO> getAll() {
        return postgresDataStore.transaction(connection -> {
            return connection.query(
                "select * from posts",
                this::convertToPost);
        });
    }

    private PostPO convertToPost(ResultSet row) throws SQLException {
        PostPO post = new PostPO();
        post.setId(row.getInt("id"));
        post.setAuthor(row.getString("author"));
        post.setTitle(row.getString("title"));
        post.setSummaryImageUrl(row.getString("summary_image_url"));
        post.setArchived(row.getBoolean("archived"));
        return post;
    }
}
