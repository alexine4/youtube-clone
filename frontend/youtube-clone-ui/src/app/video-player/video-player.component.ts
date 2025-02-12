import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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

  @Input() videoUrl!: string | '';

  @Input() thumbnailUrl!: string | '';




}