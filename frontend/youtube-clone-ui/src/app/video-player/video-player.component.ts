import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.scss',
})
export class VideoPlayerComponent implements OnInit {
  @Input() size!: number | 0;

  @Input() videoUrl!: string | '';

  @Input() thumbnailUrl!: string | '';

  ngOnInit(): void {
    const video = document.getElementById('my_video_1');
    const aspectRatio = 16 / 10; // Або 4 / 3 для іншого формату

    if (this.size !== 0) {
      let newWidth = window.innerWidth * this.size;
      let newHeight = newWidth / aspectRatio;

      if (newHeight > window.innerHeight) {
        newHeight = window.innerHeight * this.size;
        newWidth = newHeight * aspectRatio;
      }

      video!.style.width = `${newWidth  }px`;
      video!.style.height = `${newHeight}px`;
    }
  }
}
