import { Component, OnInit } from '@angular/core';
import { VideoCardComponent } from '../video-card/video-card.component';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { VideoService } from '../services/video.service';
import { VideoDetails } from '../interfaces/video-details';

import { WAIT_TIME } from '../shared/system.properties';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';;

@Component({
    selector: 'app-featured',
    standalone: true,
    imports: [
        VideoCardComponent,
        CommonModule,
        FlexLayoutModule,
        FlexLayoutServerModule,
        MatProgressSpinnerModule,
        ToastrModule,
    ],
    templateUrl: './featured.component.html',
    styleUrl: './featured.component.scss'
})
export class FeaturedComponent implements OnInit {
  featuredVideos!: VideoDetails[];
  loading: boolean = true;

  constructor(
    private videoService: VideoService,
    private toastrService: ToastrService
  ) {}
  ngOnInit(): void {
    this.videoService.getAllVideos().subscribe({
      next: (videos) => {
        this.featuredVideos = videos;
      },
      error: (e) => {        
        const toast = this.toastrService.success(e.message)
        setTimeout(() => {
          this.toastrService.remove(toast.toastId);
        }, WAIT_TIME); 
      },
      complete: ()=> this.loading = false
    });
  }
}
