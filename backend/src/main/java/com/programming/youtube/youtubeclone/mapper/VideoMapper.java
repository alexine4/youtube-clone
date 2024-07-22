package com.programming.youtube.youtubeclone.mapper;

import com.programming.youtube.youtubeclone.dto.VideoDto;
import com.programming.youtube.youtubeclone.model.Video;
import org.springframework.stereotype.Service;

@Service
public class VideoMapper {
    public VideoDto mapToDto(Video video) {
        return VideoDto.builder()
                .videoId(video.getId())
                .videoUrl(video.getVideoUrl())
                .description(video.getDescription())
                .tags(video.getTags())
                .title(video.getTitle())
                .videoStatus(video.getVideoStatus())
                .userId(video.getUserId())
                .thumbnailUrl(video.getThumbnailUrl())
                .likeCount(video.getLikes().get())
                .dislikeCount(video.getDisLikes().get())
                .build();
    }
}