package com.programming.youtube.youtubeclone.dto;

import com.programming.youtube.youtubeclone.model.VideoStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class VideoDto {
    private String videoId;
    @NotBlank
    private String userId;
    @NotBlank
    private String title;
    @NotBlank
    private String description;
    @Size(min = 1)
    private List<String> tags;
    private VideoStatus videoStatus;
    @NotBlank
    private String videoUrl;
    @NotBlank
    private String thumbnailUrl;
    private Integer likeCount;
    private Integer disLikeCount;
    private Integer viewCount;
    private String dateTime;
}
