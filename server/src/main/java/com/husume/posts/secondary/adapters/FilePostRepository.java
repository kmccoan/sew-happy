package com.husume.posts.secondary.adapters;

import org.springframework.stereotype.Component;

import com.husume.posts.secondary.ports.PostPO;
import com.husume.posts.secondary.ports.PostRepository;

import java.util.Arrays;
import java.util.List;

@Component
public class FilePostRepository implements PostRepository {
    private PostPO post1 = new PostPO("1", "Kira McCoan", "This is a post about some things", false, "https://scontent-lga3-1.cdninstagram.com/vp/53e34122f24d9ca932e0d6fb47c8f764/5D28C47B/t51.2885-15/e35/14027230_737870619684544_1256594505_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com");
    private PostPO post2 = new PostPO("2", "Kira McCoan", "Another post", false, "https://scontent-lga3-1.cdninstagram.com/vp/53e34122f24d9ca932e0d6fb47c8f764/5D28C47B/t51.2885-15/e35/14027230_737870619684544_1256594505_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com");

    @Override
    public PostPO get(String id) {
        if (id.equals("1")) {
            return post1;
        } else if (id.equals("2")) {
            return post2;
        } else {
            return null;
        }
    }

    @Override
    public List<PostPO> getAll() {
        return Arrays.asList(post1, post2);
    }
}
