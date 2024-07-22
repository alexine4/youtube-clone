package com.programming.youtube.youtubeclone.controller;

import com.programming.youtube.youtubeclone.dto.UploadVideoResponse;
import com.programming.youtube.youtubeclone.dto.VideoDto;
import com.programming.youtube.youtubeclone.service.VideoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
        VideoService.getVideoDetails(videoId);
    }
}
