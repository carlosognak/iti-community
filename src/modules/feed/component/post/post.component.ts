import { Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Post } from '../../post.model';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.less']
})
export class PostComponent implements OnInit, AfterViewInit {
  @Input()
  post: Post;

  @ViewChild("anchor")
  anchor: ElementRef<HTMLDivElement>;

  constructor(
    private postService: PostService
  ) {

  }

  ngOnInit(): void {
    this.post.createdAt = new Date(this.post.createdAt).toString()
    console.log('POst = ', this.post.message.text.content)
  }

  ngAfterViewInit() {
    this.anchor.nativeElement.scrollIntoView();
  }

  like() {
    if (!this.post.liked) {
      this.postService.like(this.post);
      this.post.liked = true;
      return true
    }
  }
}
