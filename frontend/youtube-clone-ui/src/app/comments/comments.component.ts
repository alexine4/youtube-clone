import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { CommentService } from '../services/comment.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Comment } from '../interfaces/comment';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    FlexLayoutServerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    ToastrModule

  ],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent implements OnInit {
  @Input()
  videoId!:string;
  commentsForm: FormGroup;
  comments: Comment[] = [];
  loading: boolean = true

  constructor(private userService: UserService, 
    private commentService: CommentService,
    private toastrService: ToastrService) {
    this.commentsForm = new FormGroup({
      comment: new FormControl('comment'),
    });
  }

  ngOnInit(): void {
    this.getComments();
  }

  postComment() {
    const comment = this.commentsForm.get('comment')?.value;

    const commentObj = {
      "commentText": comment,
      "authorId": this.userService.getUserId()
    }

    this.commentService.postComment(commentObj, this.videoId).subscribe(() => {
      this.toastrService.success("Comment Posted Successfully");
      this.commentsForm.get('comment')?.reset();
      this.getComments();
    })
  }

  getComments() {
    this.commentService.getAllComments(this.videoId).subscribe(data => {
      this.comments = data;
      this.loading = false
    });
  }
}
