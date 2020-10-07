import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as flvjs from 'flv.js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent implements AfterViewInit {
  @ViewChild('video') videoRef: ElementRef;
  public flvPlayer;

  constructor() {}

  ngAfterViewInit(): void {
    if (flvjs.default.isSupported()) {
      this.flvPlayer = flvjs.default.createPlayer({
        type: 'flv',
        isLive: true,
        url: environment.video_api + 'car-cloudhub.flv',
      });
      this.flvPlayer.attachMediaElement(this.videoRef.nativeElement);
      this.flvPlayer.load();
      this.flvPlayer.volume = 0;
      this.flvPlayer.play();
    }
  }
}
