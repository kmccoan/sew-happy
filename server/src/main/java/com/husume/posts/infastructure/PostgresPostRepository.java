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

    private PostPO convertToPost(ResultSet row) throws SQLException {
        PostPO post = new PostPO();
        post.setId(PostID.valueOf(row.getString("id")));
        post.setAuthor(row.getString("author"));
        post.setTitle(row.getString("title"));
        post.setSummaryImageUrl(row.getString("summary_image_url"));
        post.setArchived(row.getBoolean("archived"));
        return post;
    }
}
