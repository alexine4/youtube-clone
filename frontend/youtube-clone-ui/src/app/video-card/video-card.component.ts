import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { VideoDetails } from '../interfaces/video-details';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-video-card',
    standalone: true,
    imports: [MatCardModule, MatButtonModule, RouterModule],
    templateUrl: './video-card.component.html',
    styleUrl: './video-card.component.scss'
})
export class VideoCardComponent {
  @Input()
  video!: VideoDetails

}
