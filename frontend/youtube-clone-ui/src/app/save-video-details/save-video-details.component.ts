import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';


@Component({
  selector: 'app-save-video-details',
  standalone: true,
  imports: [
    FlexLayoutModule,
    FlexLayoutServerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './save-video-details.component.html',
  styleUrl: './save-video-details.component.scss'
})
export class SaveVideoDetailsComponent {

}
