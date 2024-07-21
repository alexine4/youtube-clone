package com.programming.youtube.youtubeclone.service;

import com.programming.youtube.youtubeclone.dto.UploadVideoResponse;
import com.programming.youtube.youtubeclone.dto.VideoDto;
import com.programming.youtube.youtubeclone.mapper.VideoMapper;
import com.programming.youtube.youtubeclone.model.Video;
import com.programming.youtube.youtubeclone.repository.VideoRepository;
import com.programming.youtube.youtubeclone.exception.YoutubeCloneException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class VideoService {

    private final S3Service s3Service;
    private final VideoRepository videoRepository;
    private final VideoMapper videoMapper;



    public UploadVideoResponse uploadVideo(MultipartFile multipartFile) {
        String videoUrl = s3Service.uploadFile(multipartFile);
        var video = new Video();
        video.setVideoUrl(videoUrl);
        var savedVideo = videoRepository.save(video);
        return new UploadVideoResponse(savedVideo.getId(), savedVideo.getVideoUrl());
    }

    public VideoDto editVideo(VideoDto videoDto) {
        //Find the videos by videoId
        var savedVideo =  getVideoById(videoDto.getVideoId());
        //map the videoDto
        savedVideo.setTitle(videoDto.getTitle());
        savedVideo.setDescription(videoDto.getDescription());
        savedVideo.setTags(videoDto.getTags());
        savedVideo.setThumbnailUrl(videoDto.getThumbnailUrl());
        savedVideo.setVideoStatus(videoDto.getVideoStatus());
        //save the video to the database
        videoRepository.save(savedVideo);
        return videoMapper.mapToDto(savedVideo);
    }
    private Video getVideoById(String id) {
        return videoRepository.findById(id)
                .orElseThrow(() -> new YoutubeCloneException("Cannot find Video with ID - " + id));
    }

    public String uploadThumbnail(MultipartFile file, String videoId) {
        var savedVideo = getVideoById(videoId);
        String thumbnailUrl =  s3Service.uploadFile(file);
        savedVideo.setThumbnailUrl(thumbnailUrl);
        videoRepository.save(savedVideo);
        return thumbnailUrl;
    }

    public VideoDto getVideoDetails(String videoId) {
        Video sevedVideo = getVideoById(videoId);

        VideoDto videoDto = new VideoDto();
        videoDto.setVideoId(sevedVideo.getId());
        videoDto.setTitle(sevedVideo.getTitle());
        videoDto.setDescription(sevedVideo.getDescription());
        videoDto.setTags(sevedVideo.getTags());
        videoDto.setThumbnailUrl(sevedVideo.getThumbnailUrl());
        videoDto.setVideoStatus(sevedVideo.getVideoStatus());

    }
}
