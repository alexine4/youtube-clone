package com.programming.youtube.youtubeclone.service;

import com.programming.youtube.youtubeclone.dto.CommentDTO;
import com.programming.youtube.youtubeclone.dto.UploadVideoResponse;
import com.programming.youtube.youtubeclone.dto.VideoDto;
import com.programming.youtube.youtubeclone.mapper.VideoMapper;
import com.programming.youtube.youtubeclone.model.Comment;
import com.programming.youtube.youtubeclone.model.Video;
import com.programming.youtube.youtubeclone.repository.VideoRepository;
import com.programming.youtube.youtubeclone.exception.YoutubeCloneException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VideoService {

    private final S3Service s3Service;
    private final VideoRepository videoRepository;
    private final VideoMapper videoMapper;
    private final UserService userService;



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
        savedVideo.setDateTime(videoDto.getDateTime());
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
        Video savedVideo = getVideoById(videoId);

        increaseVideoCount(savedVideo);
        userService.addVideoToHistory(videoId);

        return newVideoDTO(savedVideo);
    }

    private void increaseVideoCount(Video savedVideo) {
        savedVideo.increaseViewCount();
        videoRepository.save(savedVideo);
    }

    public VideoDto likeVideo(String videoId) {
        Video videoById = getVideoById(videoId);

        if (userService.ifLikedVideo(videoId)){
            videoById.decreaseLikeCount();
            userService.removeFromLikedVideo(videoId);
        } else if (userService.ifDisLikedVideo(videoId)){
            videoById.decreaseDisLikeCount();
            userService.removeFromDisLikedVideo(videoId);
            videoById.increaseLikeCount();
            userService.addTolikedVideos(videoId);
        }else {
            videoById.increaseLikeCount();
            userService.addTolikedVideos(videoId);
        }
        videoRepository.save(videoById);



        return newVideoDTO(videoById);
    }


    public VideoDto disLikeVideo(String videoId) {
        Video videoById = getVideoById(videoId);

        if (userService.ifDisLikedVideo(videoId)){
            videoById.decreaseDisLikeCount();
            userService.removeFromDisLikedVideo(videoId);
        } else if (userService.ifLikedVideo(videoId)){
            videoById.decreaseLikeCount();
            userService.removeFromLikedVideo(videoId);
            videoById.increaseDisLikeCount();
            userService.addToDisLikedVideos(videoId);
        }else {
            videoById.increaseDisLikeCount();
            userService.addToDisLikedVideos(videoId);
        }
        videoRepository.save(videoById);



        return newVideoDTO(videoById);
    }


    private VideoDto newVideoDTO(Video video){
        VideoDto videoDto = new VideoDto();
        videoDto.setVideoId(video.getId());
        videoDto.setTitle(video.getTitle());
        videoDto.setDescription(video.getDescription());
        videoDto.setTags(video.getTags());
        videoDto.setThumbnailUrl(video.getThumbnailUrl());
        videoDto.setVideoStatus(video.getVideoStatus());
        videoDto.setVideoUrl(video.getVideoUrl());
        videoDto.setLikeCount(video.getLikes().get());
        videoDto.setDisLikeCount(video.getDisLikes().get());
        videoDto.setViewCount(video.getViewCount().get());
        videoDto.setDateTime(videoDto.getDateTime());
        return videoDto;
    }

    public void addComment(String videoId, CommentDTO commentDTO) {
       Video video = getVideoById(videoId);
        Comment comment = new Comment();
        comment.setText(commentDTO.getCommentText());
        comment.setAuthorId(commentDTO.getAuthorId());
        video.addComment(comment);

        videoRepository.save(video);
    }

    public List<CommentDTO> getAllComments(String videoId) {
        Video videoById = getVideoById(videoId);
        List<Comment> commentList= videoById.getComments();

        return commentList.stream().map(this::mapToCommentDto).toList();

    }

    private CommentDTO mapToCommentDto(Comment comment) {
        CommentDTO commentDTO = new CommentDTO();
        commentDTO.setCommentText(comment.getText());
        commentDTO.setAuthorId(comment.getAuthorId());
        return  commentDTO;
    }

    public List<VideoDto> getAllVideos() {
        return  videoRepository.findAll().stream().map(this::newVideoDTO).toList();
    }

}
