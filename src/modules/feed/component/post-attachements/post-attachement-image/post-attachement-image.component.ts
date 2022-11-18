import { Component, Input, OnInit, Sanitizer } from '@angular/core';
import { MessageImageElement } from '../../../post.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-post-attachement-image',
  templateUrl: './post-attachement-image.component.html',
  styleUrls: ['./post-attachement-image.component.less']
})
export class PostAttachementImageComponent implements OnInit {
  @Input()
  element: MessageImageElement;
  constructor(
    private sanitizer: DomSanitizer
  ) { }

  get url() {
    return this.sanitizer.bypassSecurityTrustUrl(this.element.url);
  }

  ngOnInit(): void {
  }

}
