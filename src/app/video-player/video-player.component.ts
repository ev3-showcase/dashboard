import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import * as flvjs from 'flv.js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent implements AfterViewInit {
  @ViewChild('video') videoRef: ElementRef;

  @Input() carId = 'car-cloudhub';
  public flvPlayer;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.loadStream();
  }

  loadStream() {
    if (flvjs.default.isSupported()) {
      this.flvPlayer = flvjs.default.createPlayer({
        type: 'flv',
        isLive: true,
        url: environment.video_api + this.carId + '.flv',
      });
      this.flvPlayer.attachMediaElement(this.videoRef.nativeElement);
      this.flvPlayer.load();
      this.flvPlayer.volume = 0;
      this.flvPlayer.play();
    }
  }

  ngAfterViewInit(): void {
    this.loadStream();
  }
}
