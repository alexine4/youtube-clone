import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../../services/video.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-upload-thumbnail',
  standalone: true,
  imports: [
    MatButtonModule
  ],
  templateUrl: './upload-thumbnail.component.html',
  styleUrl: './upload-thumbnail.component.scss'
})
export class UploadThumbnailComponent {

  selectedFile!: File;
  selectedFileName = '';

  videoId = '';
  timeOut: number = 5000;

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
    this.videoService.uploadThumbnail(this.selectedFile, this.videoId).subscribe(
      result => {
        this.toastr.success(
          "Thumbnail upload successful",
          'Success', {
          timeOut: this.timeOut,
        })
      },
      error => {
        this.toastr.error(error.error.message, 'Error', {
          timeOut: this.timeOut,
        }
        )
      },
      () => {
      }
    )

  }

}
