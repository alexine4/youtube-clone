import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { VideoCardComponent } from '../video-card/video-card.component';

@Component({
    selector: 'app-liked-videos',
    standalone: true,
    imports: [
        VideoCardComponent,
        CommonModule,
        FlexLayoutModule,
        FlexLayoutServerModule,
    ],
    templateUrl: './liked-videos.component.html',
    styleUrl: './liked-videos.component.scss'
})
export class LikedVideosComponent {}
