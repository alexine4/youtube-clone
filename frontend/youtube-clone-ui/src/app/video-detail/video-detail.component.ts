import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { VideoService } from '../services/video.service';
import { VideoDetails } from '../interfaces/video-details';
import { WAIT_TIME } from '../shared/system.properties';
import { changeLoaderStatus } from '../shared/shared-function';
import { VideoPlayerComponent } from '../video-player/video-player.component';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';

import { MatChipsModule } from '@angular/material/chips';
import { CommentsComponent } from '../comments/comments.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-video-detail',
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,
    FlexLayoutServerModule,
    MatProgressSpinnerModule,
    ToastrModule,
    VideoPlayerComponent,
    MatChipsModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule,
    CommentsComponent,
  ],
  templateUrl: './video-detail.component.html',
  styleUrl: './video-detail.component.scss',
})
export class VideoDetailComponent {
  likePushed: boolean = false;
  dislikePushed: boolean = false;

  showSubscribeButton: boolean = true;

  loading: boolean = true;
  videoId!: string;
  getVideoDetail$!: Subscription;
  videoDetails!: VideoDetails;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private videoService: VideoService,
    private userService: UserService,
    private toastrService: ToastrService
  ) {
    // get videoId
    this.videoId = this.activatedRoute.snapshot.params['videoId'];
    //get video details
    if (this.videoId !== '') {
      this.getVideoDetail$ = this.videoService
        .getVideoDetails(this.videoId)
        .subscribe({
          next: (videoDetails) => {
            this.videoDetails = videoDetails;
          },
          error: (e) => {
            this.toastrService.error(e.statusText, e.status, {
              timeOut: WAIT_TIME,
            });
            if ((e.status = '401')) {
              this.router.navigate(['upload-video']);
            }
          },
          complete: () => {
            changeLoaderStatus().then((status) => {
              this.loading = status;
            });
          },
        });
    }
  }

  subscribeToUser() {
    
    const userId = this.userService.getUserId()
    this.userService.subscribeToUser(userId).subscribe(
      res=>{
        this.showSubscribeButton = !this.showSubscribeButton;
      }
    )
  }
  unSubscribeToUser() {
    
    const userId = this.userService.getUserId()
    this.userService.unSubscribeToUser(userId).subscribe(
      res=>{
        this.showSubscribeButton = !this.showSubscribeButton;
      }
    )
  }

  disLikeVideo() {
    this.videoService.disLikeVideo(this.videoId).subscribe({
      next: (response) => {
        this.videoDetails.likeCount = response.likeCount;
        this.videoDetails.disLikeCount = response.disLikeCount;
      },
      error: (e) => {
        this.toastrService.error(e.message);
      },
      complete: () => {
        this.dislikePushed = !this.dislikePushed;
        this.likePushed = false;
      },
    });
  }

  likeVideo() {
    this.videoService.likeVideo(this.videoId).subscribe({
      next: (response) => {
        this.videoDetails.likeCount = response.likeCount;
        this.videoDetails.disLikeCount = response.disLikeCount;
      },
      error: (e) => {
        this.toastrService.error(e.message);
      },
      complete: () => {
        this.likePushed = !this.likePushed;
        this.dislikePushed = false;
      },
    });
  }
}
