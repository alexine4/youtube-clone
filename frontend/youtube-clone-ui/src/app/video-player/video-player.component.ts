import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
@Component({
    selector: 'app-video-player',
    standalone: true,
    imports: [
        CommonModule
    ],
    templateUrl: './video-player.component.html',
    styleUrl: './video-player.component.scss'
})
export class VideoPlayerComponent implements OnInit {
 

  @Input() videoUrl!: string | '';
  @Input() width!: string | '';

  @Input() thumbnailUrl!: string | '';

  ngOnInit(): void {
    const video = document.getElementById("my_video_1")
    const aspectRatio = 16 / 10; // Або 4 / 3 для іншого формату

    let newWidth = window.innerWidth * 0.5;
    let newHeight = newWidth / aspectRatio;
  
    if (newHeight > window.innerHeight) {
      newHeight = window.innerHeight *0.5;
      newWidth = newHeight * aspectRatio;
    }
  
    video!.style.width = `${newWidth}px`;
    video!.style.height = `${newHeight}px`;
  }


}