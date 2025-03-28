package com.programming.youtube.youtubeclone.controller;

import com.programming.youtube.youtubeclone.dto.CommentDTO;
import com.programming.youtube.youtubeclone.dto.UploadVideoResponse;
import com.programming.youtube.youtubeclone.dto.VideoDto;
import com.programming.youtube.youtubeclone.exception.YoutubeCloneException;
import com.programming.youtube.youtubeclone.service.VideoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/video")
@RequiredArgsConstructor
public class VideoController {

    private final VideoService videoService;

    @PostMapping("/upload")
    @ResponseStatus(HttpStatus.CREATED)
    public UploadVideoResponse uploadVideo(@RequestParam("file") MultipartFile file){
       return videoService.uploadVideo(file);
    }

    @PostMapping("/thumbnail")
    @ResponseStatus(HttpStatus.CREATED)
    public String uploadThumnail(@RequestParam("file") MultipartFile file, @RequestParam("videoId") String videoId){
        return videoService.uploadThumbnail(file,videoId);
    }

    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    public VideoDto editVideoMetadata(@RequestBody VideoDto videoDto){
       return videoService.editVideo(videoDto);
    }

    @GetMapping("/{videoId}")
    @ResponseStatus(HttpStatus.OK)
    public VideoDto getVideoDto(@PathVariable String videoId){
       return videoService.getVideoDetails(videoId);
    }

    @PatchMapping("/{videoId}/like")
    @ResponseStatus(HttpStatus.OK)
    public  VideoDto likeVideo (@PathVariable String videoId) {
        return videoService.likeVideo(videoId)  ;
    }
    @PatchMapping("/{videoId}/disLike")
    @ResponseStatus(HttpStatus.OK)
    public  VideoDto disLikeVideo (@PathVariable String videoId) {
        return videoService.disLikeVideo(videoId);
    }

    @PostMapping("/{videoId}/comment")
    @ResponseStatus(HttpStatus.OK)
    public void addComment(@PathVariable String videoId, @RequestBody CommentDTO commentDTO){
        videoService.addComment(videoId, commentDTO);
    }

    @GetMapping("/{videoId}/comment")
    @ResponseStatus(HttpStatus.OK)
    public List<CommentDTO> getAllComments(@PathVariable String videoId){
        return  videoService.getAllComments(videoId);
    }
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<VideoDto> getAllVideos(){
        return  videoService.getAllVideos();
    }


}
