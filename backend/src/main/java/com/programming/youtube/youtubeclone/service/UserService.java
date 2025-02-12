package com.programming.youtube.youtubeclone.service;

import com.programming.youtube.youtubeclone.model.User;
import com.programming.youtube.youtubeclone.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User getCurrentUser() {
        String sub = ((Jwt) (SecurityContextHolder.getContext().getAuthentication().getPrincipal())).getClaim("sub");

        return userRepository.findBySub(sub)
                .orElseThrow(() -> new IllegalArgumentException("Cannot find user with sub - " + sub));

    }

    public void addTolikedVideos(String videoId) {
        User currentUser = getCurrentUser();
        currentUser.addToLikedVideos(videoId);
        userRepository.save(currentUser);
    }

    public boolean ifLikedVideo(String videoId){
        return getCurrentUser().getLakedVideos().stream().anyMatch(likedVideo -> likedVideo.equals(videoId));
    }
    public boolean ifDisLikedVideo(String videoId){
        return getCurrentUser().getDisLakedVideos().stream().anyMatch(disLikedVideo -> disLikedVideo.equals(videoId));
    }

    public void removeFromLikedVideo(String videoId) {
        User currentUser = getCurrentUser();
        currentUser.removeFromLikedVideos(videoId);
        userRepository.save(currentUser);
    }

    public void removeFromDisLikedVideo(String videoId) {
        User currentUser = getCurrentUser();
        currentUser.removeFromDisLikedVideo(videoId);
        userRepository.save(currentUser);
    }

    public void addToDisLikedVideos(String videoId) {
        User currentUser = getCurrentUser();
        currentUser.addToDisLikedVideo(videoId);
        userRepository.save(currentUser);
    }

    public void addVideoToHistory(String videoId) {
        User currentUser = getCurrentUser();
        currentUser.addToVideoHistory(videoId);
        userRepository.save(currentUser);
    }

    public void subscribeUser(String userId) {
        User currentUser = getCurrentUser();
        currentUser.addToSubscribedUsers(userId);
        User user = userById(userId);
        user.addToSubscribers(currentUser.getId());

        userRepository.save(user);
        userRepository.save(currentUser);
    }
    public void unSubscribeUser(String userId) {
        User currentUser = getCurrentUser();
        currentUser.removeFromSubscribedUsers(userId);
        User user = userById(userId);
        user.removeFromSubscribers(currentUser.getId());

        userRepository.save(user);
        userRepository.save(currentUser);
    }

    public Set<String> userHistory(String userId) {

        User user = userById(userId);
        return  user.getVideoHistory();
    }

    private User userById(String userId) {
        return userRepository.findById(userId)
                .orElseThrow(()-> new IllegalArgumentException("Cannot find user with userId " + userId));
    }
}
