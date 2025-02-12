import { Component } from '@angular/core';
import { VideoCardComponent } from '../video-card/video-card.component';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';

@Component({
  selector: 'app-featured',
  standalone: true,
  imports: [
    VideoCardComponent,
    CommonModule,
    FlexLayoutModule,
    FlexLayoutServerModule,
  ],
  templateUrl: './featured.component.html',
  styleUrl: './featured.component.scss',
})
export class FeaturedComponent {}
