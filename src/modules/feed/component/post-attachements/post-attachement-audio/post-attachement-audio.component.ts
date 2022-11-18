import { Component, Input, OnInit } from '@angular/core';
import { MessageImageElement } from '../../../post.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-post-attachement-audio',
  templateUrl: './post-attachement-audio.component.html',
  styleUrls: ['./post-attachement-audio.component.less']
})
export class PostAttachementAudioComponent implements OnInit {
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
