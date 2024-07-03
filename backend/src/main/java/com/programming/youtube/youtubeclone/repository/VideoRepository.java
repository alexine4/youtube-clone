package com.programming.youtube.youtubeclone.repository;

import com.programming.youtube.youtubeclone.model.Video;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface VideoRepository  extends MongoRepository<Video, String> {
}
