import { Routes } from '@angular/router';
import { UploadVideoComponent } from './upload-video/upload-video.component';
import { SaveVideoDetailsComponent } from './save-video-details/save-video-details.component';
import { VideoDetailComponent } from './video-detail/video-detail.component';
import { HomeComponent } from './home/home.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { LikedVideosComponent } from './liked-videos/liked-videos.component';
import { HistoryComponent } from './history/history.component';
import { FeaturedComponent } from './featured/featured.component';

export const routes: Routes = [

  {
    path: '',
    component: HomeComponent,
    children:[
      {
        path: 'featured',
        component: FeaturedComponent,
      },
      {
        path: 'history',
        component: HistoryComponent,
      },
      {
        path: 'subscriptions',
        component: SubscriptionsComponent,
      },
      {
        path: 'liked-videos',
        component: LikedVideosComponent,
      }
    ]
  },
  
  {
    path: 'upload-video',
    component: UploadVideoComponent,
  },
  {
    path: 'save-video-details/:videoId',
    component: SaveVideoDetailsComponent,
  },
  {
    path: 'video-details/:videoId',
    component: VideoDetailComponent,
  },
];
