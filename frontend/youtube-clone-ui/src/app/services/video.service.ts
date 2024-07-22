import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UploadVideoResponse } from '../interfaces/upload-video-response';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(
    private httpClient: HttpClient
  ) { }

  uploadVideo(fileEntry: File): Observable<UploadVideoResponse> {
    //http post call to upload video

    const video = new FormData()
    video.append('file', fileEntry, fileEntry.name);
    return this.httpClient.post<UploadVideoResponse>('/api/video/upload', video);
  }


  uploadThumbnail(fileEntry: File, videoId: string): Observable<string> {
    //http post call to upload video
    const thumbnail = new FormData()
    thumbnail.append('file', fileEntry, fileEntry.name);
    thumbnail.append('videoId', videoId);
    return this.httpClient.post('/api/video/thumbnail', thumbnail, { responseType: "text" });
  }

  //
  //check upload thumbnail status
  private uploadThumbnailStatusSource = new BehaviorSubject<boolean>(false);
  uploadThumbnailStatus$ = this.uploadThumbnailStatusSource.asObservable();
  checkUploadThumbnailStatus(status: boolean): void {
    this.uploadThumbnailStatusSource.next(status);
  }

}
