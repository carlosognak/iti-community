import { Component, Input, OnInit } from '@angular/core';
import { MessageVideoElement } from '../../../post.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-post-attachement-video',
  templateUrl: './post-attachement-video.component.html',
  styleUrls: ['./post-attachement-video.component.less']
})
export class PostAttachementVideoComponent implements OnInit {
  @Input()
  element: MessageVideoElement;
  constructor(
    private sanitizer: DomSanitizer
  ) { }

  get url() {
    return this.sanitizer.bypassSecurityTrustUrl(this.element.url);
  }

  ngOnInit(): void {
  }

}
