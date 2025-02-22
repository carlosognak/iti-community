import { Component, ElementRef, Input, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { Observable } from 'rxjs';
import { FeedStore } from '../../feed.store';
import { Post } from '../../post.model';
import { PostService } from '../../services/post.service';
import { FeedSocketService } from '../../services/feed.socket.service';
import { AuthenticationStore } from 'src/modules/authentication/authentication.store';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.less']
})
export class FeedComponent implements OnInit {
  @ViewChild('feed') private bottomRef: ElementRef;

  roomId$: Observable<string | undefined>;

  posts$: Observable<Post[]>;



  constructor(private postService: PostService, private store: FeedStore, private socketService: FeedSocketService, private auth :AuthenticationStore) {
    this.posts$ = this.store.get(s => s.posts);
    this.roomId$ = this.store.roomId$;
  }

  async ngOnInit() {
    this.store.onRoomIdChange(async roomId => {
      if (roomId) {
        this.socketService.onNewPost(roomId, post => {
          if(this.auth.userId != post.createdBy.id)
              this.store.appendPost(post);
        })
        await this.postService.fetch(roomId, {
          page: 0,
          perPage: 10000
        });
      }
    })
    /*
    this.roomId$.subscribe(ob => {
      this.socketService.onNewPost(
      this.store.get(state => state.roomId),
      post => {this.store.appendPost(post);})
    });
    */
  }
}
