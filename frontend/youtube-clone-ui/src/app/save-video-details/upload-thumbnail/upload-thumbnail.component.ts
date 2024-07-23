import { Component, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../../services/video.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-upload-thumbnail',
  standalone: true,
  imports: [
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './upload-thumbnail.component.html',
  styleUrl: './upload-thumbnail.component.scss'
})
export class UploadThumbnailComponent implements OnDestroy {

  // subscriptions
  private uploadThumbnail$!: Subscription;
  selectedFile!: File;
  selectedFileName = '';
  btnDisabled: boolean = false
  videoId = '';


  constructor(
    private activatedRoute: ActivatedRoute,
    private videoService: VideoService,
    private toastr: ToastrService
  ) {
    this.videoId = this.activatedRoute.snapshot.params['videoId'];
  }




  onFileSelected($event: Event) {
    if ($event.target) {
      const input = $event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        this.selectedFile = input.files[0];
        this.selectedFileName = this.selectedFile.name;
      }
    }

  }
  public onUpload() {
    this.btnDisabled = true
    this.uploadThumbnail$ = this.videoService.uploadThumbnail(this.selectedFile, this.videoId).subscribe(
      () => {
        this.videoService.checkUploadThumbnailStatus(true);
        this.toastr.success(
          "Thumbnail upload successful",
          'Success')

        this.videoService.checkUploadThumbnailStatus(true);
      },
      error => {
        this.btnDisabled = false

        this.toastr.error(error.error.message, 'Error')

      },
      () => {
        this.btnDisabled = false
      }
    )
  }

  ngOnDestroy(): void {
    if (this.uploadThumbnail$) {
      this.uploadThumbnail$.unsubscribe();
    }
  }
}
