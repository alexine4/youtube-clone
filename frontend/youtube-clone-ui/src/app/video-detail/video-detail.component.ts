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
        MatIconModule
    ],
    templateUrl: './video-detail.component.html',
    styleUrl: './video-detail.component.scss'
})
export class VideoDetailComponent {
  loading: boolean = true;
  videoId!: string;
  getVideoDetail$!: Subscription;
  videoDetails!: VideoDetails;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private videoService: VideoService,
    private toastr: ToastrService
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
            this.toastr.error(e.statusText, e.status, {
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
}
