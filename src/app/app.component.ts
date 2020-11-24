import { AfterViewInit, Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { Subscription } from 'rxjs';
import { converLogLine } from 'src/app/helper';
import { AppendLog, AppState } from 'src/app/state/app.state';

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
  public ignoreFirstMessageCounter = 0;

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
          // Message: ["newValue", "quality", "angle", "distance"]
          let messageLine = message.payload.toString().split(',');
          let distance = Number.parseFloat(messageLine[3]) / 10000;
          if (distance > this.maxDistance) {
            this.maxDistance = distance;
          }
          let angle = Number.parseFloat(messageLine[2]);
          this.stagedPoints.push([
            // Convert angle to radian
            angle * (Math.PI / 180),
            // Scale distance on scale 0 to 1
            distance,
          ]);

          if (this.stagedPoints.length > 600) {
            this.points = this.stagedPoints;
            this.stagedPoints = [];
          }
        })
    );

    this.mqttService
      .observe(id + 'stats/log')
      .subscribe((message: IMqttMessage) => {
        if (this.ignoreFirstMessageCounter < 3) {
          this.ignoreFirstMessageCounter++;
        } else {
          let line = message.payload.toString().split(',');
          console.log(line);
          this.logLines.push(line);
          this.store.dispatch(new AppendLog(converLogLine(line)));
          if (this.logLines.length > 20) [this.logLines.shift()];
        }
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
    this.store.select(AppState.device).subscribe((device) => {
      this.subscribeToDevice(device);
    });
  }
}
