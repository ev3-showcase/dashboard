import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import * as flvjs from 'flv.js';
import { Observable } from 'rxjs';
import { skip } from 'rxjs/operators';
import { AppState, DeviceEnum } from 'src/app/state/app.state';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent implements AfterViewInit {
  @ViewChild('video') videoRef: ElementRef;

  @Select(AppState.device) deviceId: Observable<DeviceEnum>;

  public flvPlayer;

  constructor(private store: Store) {}

  loadStream(id: string) {
    if (flvjs.default.isSupported()) {
      this.flvPlayer = flvjs.default.createPlayer({
        type: 'flv',
        isLive: true,
        url: environment.video_api + id + '.flv',
      });
      this.flvPlayer.attachMediaElement(this.videoRef.nativeElement);
      this.flvPlayer.load();
      this.flvPlayer.volume = 0;
      this.flvPlayer.play();
    }
  }

  ngAfterViewInit(): void {
    this.deviceId.pipe(skip(1)).subscribe((id) => {
      this.loadStream(id);
    });
  }
}
