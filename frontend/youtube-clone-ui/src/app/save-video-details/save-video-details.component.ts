import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  MatChipEditedEvent,
  MatChipInputEvent,
  MatChipsModule,
} from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { UploadThumbnailComponent } from './upload-thumbnail/upload-thumbnail.component';
import { VideoService } from '../services/video.service';
import { VideoPlayerComponent } from '../video-player/video-player.component';
import { Subscription, timeout } from 'rxjs';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { changeLoaderStatus } from '../shared/shared-function';
import { VideoDetails } from '../interfaces/video-details';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-save-video-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FlexLayoutServerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    UploadThumbnailComponent,
    VideoPlayerComponent,
    MatProgressSpinnerModule,
    ToastrModule,
  ],
  templateUrl: './save-video-details.component.html',
  styleUrl: './save-video-details.component.scss',
})
export class SaveVideoDetailsComponent implements OnInit, OnDestroy {
  //subscriptions
  private checkThumbnailStatus$!: Subscription;
  private getVideoDetail$!: Subscription;
  loading: boolean = true;
  //form properties
  saveVideoDetailForm: FormGroup;
  title: FormControl = new FormControl('');
  description: FormControl = new FormControl('');
  videoStatus: FormControl = new FormControl('');
  fileSelected: boolean = false;
  //video variables
  videoId!: string | '';
  thumbnailUrl: string = '';
  videoUrl!: string;
  readonly addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags = signal<string[]>([]);
  readonly announcer = inject(LiveAnnouncer);

  //btn check status
  btnDisabled: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public videoService: VideoService,
    private toastr: ToastrService
  ) {
    // get videoId
    this.videoId = this.activatedRoute.snapshot.params['videoId'];

    //create form group
    this.saveVideoDetailForm = new FormGroup({
      title: this.title,
      description: this.description,
      videoStatus: this.videoStatus,
    });
  }

  ngOnInit(): void {
    // check upload thumbnail status
    this.checkThumbnailStatus$ =
      this.videoService.uploadThumbnailStatus$.subscribe((status) => {
        this.fileSelected = status;
      });
    //get video details
    this.getVideoDetail$ = this.videoService
      .getVideoDetails(this.videoId)
      .subscribe(
        (videoDetails) => {
          this.title.patchValue(videoDetails.title);
          this.description.patchValue(videoDetails.description);
          this.videoStatus.patchValue(videoDetails.videoStatus);
          this.videoUrl = videoDetails.videoUrl;
          this.thumbnailUrl = videoDetails.thumbnailUrl;
          this.tags.set(this.tags().concat(videoDetails.tags));
        },
        (error) => {
           this.toastr.error(error.statusText, error.status, {
            timeOut: 5000,
          }).onHidden.subscribe(
            ()=>{
              this.router.navigate(['upload-video'])
            }
          ) 
        },
        () => {
          changeLoaderStatus().then((status) => {
            this.loading = status;
          });
        }
      );
    //
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.update((tags) => [...tags, value]);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(Tags: string): void {
    this.tags.update((tags) => {
      const index = tags.indexOf(Tags);
      if (index < 0) {
        return tags;
      }

      tags.splice(index, 1);
      this.announcer.announce(`Removed ${Tags}`);
      return [...tags];
    });
  }

  edit(Tags: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(Tags);
      return;
    }

    // Edit existing fruit
    this.tags.update((tags) => {
      const index = tags.indexOf(Tags);
      if (index >= 0) {
        tags[index] = value;
        return [...tags];
      }
      return tags;
    });
  }
  saveVideo() {
    this.btnDisabled = true;
    const videoDetails: VideoDetails = {
      videoId: this.videoId,
      userId: 'userId',
      title: this.title.value,
      description: this.description.value,
      videoStatus: this.videoStatus.value,
      tags: this.tags(),
      videoUrl: this.videoUrl,
      thumbnailUrl: this.thumbnailUrl,
    };

    this.videoService.saveVideoDetails(videoDetails).subscribe(
      (response) => {},
      (error) => {
        this.toastr.error(error.message);
        this.btnDisabled = false;
      },
      () => {
        this.toastr.success('Video details saved successfully');
        this.btnDisabled = false;
      }
    );
  }

  //unsubscribing
  ngOnDestroy(): void {
    if (this.checkThumbnailStatus$) {
      this.checkThumbnailStatus$.unsubscribe();
    }
    if (this.getVideoDetail$) {
      this.getVideoDetail$.unsubscribe();
    }
  }
}
