import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [
    CommonModule

  ],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.scss'
})
export class VideoPlayerComponent {
  thumbnailUrl: string = 'https://alexin4-test.s3.eu-north-1.amazonaws.com/091e15be-c724-47cd-ad79-663ac25f4dcf.png';
  videoUrl: string = 'https://vjs.zencdn.net/v/oceans.mp4';

}