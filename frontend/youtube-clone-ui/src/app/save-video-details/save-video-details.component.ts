import { Component, inject, signal } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatChipEditedEvent, MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { UploadThumbnailComponent } from './upload-thumbnail/upload-thumbnail.component';
import { VideoService } from '../services/video.service';


@Component({
  selector: 'app-save-video-details',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FlexLayoutModule,
    FlexLayoutServerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    UploadThumbnailComponent
  ],
  templateUrl: './save-video-details.component.html',
  styleUrl: './save-video-details.component.scss'
})
export class SaveVideoDetailsComponent {

  saveVideoDetailForm: FormGroup;
  title: FormControl = new FormControl('');
  description: FormControl = new FormControl('');
  videoStatus: FormControl = new FormControl('');
  fileSelected: boolean = false

  constructor(
    public videoService: VideoService
  ) {
    this.saveVideoDetailForm = new FormGroup({
      title: this.title,
      description: this.description,
      videoStatus: this.videoStatus
    })
    // check upload thumbnail status
    this.videoService.uploadThumbnailStatus$.subscribe(
      status => {
        this.fileSelected = status
      }
    ) 
  };

  readonly addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  readonly tags = signal<string[]>([]);
  readonly announcer = inject(LiveAnnouncer);

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.update(tags => [...tags, value]);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(Tags: string): void {
    this.tags.update(tags => {
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
    this.tags.update(tags => {
      const index = tags.indexOf(Tags);
      if (index >= 0) {
        tags[index] = value;
        return [...tags];
      }
      return tags;
    });
  }
  onCheck() {

    console.log(this.fileSelected);


  }


}
