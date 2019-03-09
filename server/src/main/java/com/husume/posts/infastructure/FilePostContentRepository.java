package com.husume.posts.infastructure;

import org.springframework.stereotype.Component;

import com.husume.posts.application.core.ports.infastructure.PostContentPO;
import com.husume.posts.application.core.ports.infastructure.PostContentRepository;
import com.husume.posts.application.core.ports.infastructure.PostPartPO;

import java.util.Arrays;

@Component
public class FilePostContentRepository implements PostContentRepository {
    @Override
    public PostContentPO get(String id) {
        PostPartPO part1 = new PostPartPO("Part 1 content");
        PostPartPO part2 = new PostPartPO("Part 2 content: " + id);
        return new PostContentPO(id, Arrays.asList(part1, part2));
    }
}
