import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { NgxFileDropEntry, NgxFileDropModule } from 'ngx-file-drop';
import { MatButtonModule } from '@angular/material/button';
import { VideoService } from '../services/video.service';
import { CommonModule } from '@angular/common';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { changeLoaderStatus } from '../shared/shared-function';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-upload-video',
    standalone: true,
    imports: [
        FormsModule,
        CommonModule,
        NgxFileDropModule,
        MatButtonModule,
        ToastrModule,
        MatProgressSpinnerModule
    ],
    templateUrl: './upload-video.component.html',
    styleUrl: './upload-video.component.scss'
})
export class UploadVideoComponent implements OnInit {

  loading: boolean = true;
  // variables
  public files: NgxFileDropEntry[] = [];
  fileUploaded: boolean = false;
  fileEntry: FileSystemFileEntry | undefined;

  constructor(
    private videoService: VideoService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    changeLoaderStatus().then(status => {
      this.loading = status
    })

  }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        this.fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        this.fileEntry.file((file: File) => {
          this.fileUploaded = true

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;

      }
    }
  }

  // Here you can upload the video file to your server
  public uploadVideo() {
    if (this.fileEntry !== undefined) {
      this.fileEntry.file((file: File) => {
        this.videoService.uploadVideo(file).subscribe(
          data => {
            this.router.navigate([`/save-video-details/${data.videoId}`]);
          },
          error => {
            this.toastr.error(error.message, 'Error', {
              timeOut: 5000,
            })
          },
          () => {
            this.toastr.success('Video uploaded successfully', 'Success', {
              timeOut: 5000,
            })
            this.fileUploaded = false;
          }
        )
      });


    }
  }
}
