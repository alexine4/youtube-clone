package com.programming.youtube.youtubeclone.repository;

import com.programming.youtube.youtubeclone.model.Video;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Set;

public interface VideoRepository  extends MongoRepository<Video, String> {
    List<Video> findByUserId(String userId);

    List<Video> findByTagsIn(List<String> tags);

    List<Video> findByIdIn(Set<String> likedVideos);
}
