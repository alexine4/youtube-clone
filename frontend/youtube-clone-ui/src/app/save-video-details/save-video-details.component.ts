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
import { VideoPlayerComponent } from "../video-player/video-player.component";


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

}
