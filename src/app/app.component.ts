import { AfterViewInit, Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  private subscriptions: Subscription[] = [];
  public message: string;
  public logLines = [];
  public ipAddress = '';
  public points = [];
  public maxDistance = 0;
  public startAngle = 0;
  public stagedPoints = [];

  public unsafePublish(topic: string, message: string): void {
    this.mqttService.unsafePublish(topic, message, { qos: 1, retain: true });
  }

  public ngOnDestroy() {
    this.unsubscribe();
  }

  public unsubscribe() {
    this.subscriptions.forEach((element) => {
      element.unsubscribe();
    });
  }

  public subscribeToDevice(id?: string) {
    this.unsubscribe();
    if (id) {
      id = id + '/';
    } else {
      id = '';
    }

    this.subscriptions.push(
      this.mqttService
        .observe(id + 'stats/lidar')
        .subscribe((message: IMqttMessage) => {
          // Message: ["datetime", "newValue", "quality", "angle", "distance"]
          let messageLine = message.payload.toString().split(',');
          let distance = Number.parseFloat(messageLine[4]) / 10000;
          if (distance > this.maxDistance) {
            this.maxDistance = distance;
          }
          let angle = Number.parseFloat(messageLine[3]);
          this.stagedPoints.push([
            // Convert angle to radian
            angle * (Math.PI / 180),
            // Scale distance on scale 0 to 1
            distance,
          ]);

          if (angle <= 2 && this.stagedPoints.length > 15) {
            this.points = this.stagedPoints;
            this.stagedPoints = [];
          }
        })
    );

    this.mqttService
      .observe(id + 'stats/log')
      .subscribe((message: IMqttMessage) => {
        let line = message.payload.toString().split(',');
        console.log(line);
        this.logLines.push(line);
        if (this.logLines.length > 60) [this.logLines.shift()];
      });

    this.mqttService
      .observe(id + 'admin/ip')
      .subscribe((message: IMqttMessage) => {
        this.ipAddress = message.payload.toString();
      });
  }
  constructor(private mqttService: MqttService, private store: Store) {}
  ngAfterViewInit(): void {
    this.subscribeToDevice(this.store.selectSnapshot(AppState.state).device);
  }
}
