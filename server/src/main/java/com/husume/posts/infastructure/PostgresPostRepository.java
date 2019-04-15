package com.husume.posts.infastructure;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.husume.infastructure.postgres.PostgresDataStore;
import com.husume.posts.application.core.domain.models.PostID;
import com.husume.posts.application.core.ports.infastructure.PostPO;
import com.husume.posts.application.core.ports.infastructure.PostRepository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Component
public class PostgresPostRepository implements PostRepository {
    @Autowired
    private PostgresDataStore postgresDataStore;

    @Override
    public PostPO get(PostID id) {
        return postgresDataStore.transaction(connection -> {
            return connection.queryOne(
                "select * from posts where id = ?",
                this::convertToPost,
                id.asUUID());
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

    @Override
    public void create(PostPO newPost) {
        postgresDataStore.transaction(connection -> {
            connection.create(
                "insert into posts(id, author, title, archived, summary_image_url) values(?, ?, ?, ?, ?)",
                newPost.getId().asUUID(), newPost.getAuthor(), newPost.getTitle(), newPost.getArchived(), newPost.getSummaryImageUrl()
            );
        });
    }

    @Override
    public void save(PostPO existingPost) {
        if (existingPost.getId() == null) {
            throw new RuntimeException("Cannot save a post that does not exist. Must call create first.");
        }

        postgresDataStore.transaction(connection -> {
            connection.update(
                "update posts set author=?, title=?, summary_image_url=?, archived=? where id=?",
                existingPost.getAuthor(), existingPost.getTitle(), existingPost.getSummaryImageUrl(), existingPost.getArchived(), existingPost.getId().asUUID()
            );
        });
    }

    private PostPO convertToPost(ResultSet row) throws SQLException {
        return new PostPO(
            PostID.valueOf(row.getString("id")),
            row.getString("author"),
            row.getString("title"),
            row.getBoolean("archived"),
            row.getString("summary_image_url")
        );
    }
}
