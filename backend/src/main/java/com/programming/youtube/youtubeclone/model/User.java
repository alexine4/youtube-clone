package com.programming.youtube.youtubeclone.model;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Set;

@Document(value = "Users")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class User {
    @Id
    private Long id;
    private String firstName;
    private String lastName;
    private String fullName;
    private String picture;
    private String emailAddress;
    private Set<String> subscribedToUser = new HashSet<>();
    private Set<String> subscribers = new HashSet<>();
    private Set<String> videoHistory =  new LinkedHashSet<>();
    private Set<String> lakedVideos = new HashSet<>();
    private Set<String> disLakedVideos = new HashSet<>();

    public void addToLikedVideos(String videoId) {
        lakedVideos.add(videoId);
    }

    public void removeFromLikedVideos(String videoId) {
        lakedVideos.remove(videoId);
    }

    public void addToDisLikedVideo(String videoId) {
        disLakedVideos.add(videoId);
    }

    public void removeFromDisLikedVideo(String videoId) {
        disLakedVideos.remove(videoId);
    }

    public void addToVideoHistory(String videoId) {
        videoHistory.add(videoId);
    }

    public void addToSubscribedUsers(String userId) {
        subscribedToUser.add(userId);
    }

    public void addToSubscribers(String userId) {
        subscribers.add(userId);
    }

}
