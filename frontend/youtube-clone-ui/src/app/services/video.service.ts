import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable } from 'rxjs';
import { UploadVideoResponse } from '../interfaces/upload-video-response';
import { VideoDetails } from '../interfaces/video-details';
import { WAIT_TIME } from '../shared/system.properties';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  constructor(private httpClient: HttpClient) {}

  uploadVideo(fileEntry: File): Observable<UploadVideoResponse> {
    const video = new FormData();
    video.append('file', fileEntry, fileEntry.name);
    return this.httpClient
      .post<UploadVideoResponse>('/api/video/upload', video)
      .pipe(delay(WAIT_TIME));
  }

  uploadThumbnail(fileEntry: File, videoId: string): Observable<string> {
    //http post call to upload video
    const thumbnail = new FormData();
    thumbnail.append('file', fileEntry, fileEntry.name);
    thumbnail.append('videoId', videoId);
    return this.httpClient
      .post('/api/video/thumbnail', thumbnail, {
        responseType: 'text',
      })
      .pipe(delay(WAIT_TIME));
  }

  //
  //check upload thumbnail status
  private uploadThumbnailStatusSource = new BehaviorSubject<boolean>(false);
  uploadThumbnailStatus$ = this.uploadThumbnailStatusSource.asObservable();
  checkUploadThumbnailStatus(status: boolean): void {
    this.uploadThumbnailStatusSource.next(status);
  }

  //get video details
  getVideoDetails(videoId: string): Observable<VideoDetails> {
    //http get call to get video details
    return this.httpClient
      .get<VideoDetails>(`/api/video/${videoId}`)
      .pipe(delay(WAIT_TIME));
  }
  //save video details
  saveVideoDetails(videoDetails: VideoDetails): Observable<VideoDetails> {
    return this.httpClient
      .put<VideoDetails>(`/api/video`, videoDetails)
      .pipe(delay(WAIT_TIME));
  }

  //get all videos
  getAllVideos(): Observable<VideoDetails[]> {
    return this.httpClient
      .get<VideoDetails[]>('/api/video')
      .pipe(delay(WAIT_TIME));
  }

  // push like video
  likeVideo(videoId: string): Observable<VideoDetails> {
    return this.httpClient
      .patch<VideoDetails>(`/api/video/${videoId}/like`, null)
      .pipe(delay(WAIT_TIME));
  }
  disLikeVideo(videoId: string): Observable<VideoDetails> {
    return this.httpClient
      .patch<VideoDetails>(`/api/video/${videoId}/disLike`, null)
      .pipe(delay(WAIT_TIME));
  }
}
