package com.programming.youtube.youtubeclone.model;

import org.springframework.data.annotation.Id;

public class Comment {
    @Id
    private Long id;
    private String text;
    private Long authorId;
    private Integer likeCount;
    private Integer disLikeCount;

}
