import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
