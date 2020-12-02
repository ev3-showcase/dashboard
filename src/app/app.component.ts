import { AfterViewInit, Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { converLogLine } from 'src/app/helper';
import {
  AppendLog,
  AppState,
  DeviceEnum,
  ResetLog,
} from 'src/app/state/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  private cancelSubscriptions$ = new Subject();
  public message: string;
  public ipAddress = '-';
  public points = [];
  public maxDistance = 0;
  public stagedPoints = [];
  public ignoreFirstMessageCounter = 0;
  @Select(AppState.device) deviceId: Observable<DeviceEnum>;

  public unsafePublish(topic: string, message: string): void {
    this.mqttService.unsafePublish(topic, message, { qos: 1, retain: true });
  }

  public ngOnDestroy() {
    this.unsubscribe();
  }

  public unsubscribe() {
    this.cancelSubscriptions$.next();
    this.cancelSubscriptions$.complete();
    this.cancelSubscriptions$ = new Subject();
    this.reset();
  }

  public reset() {
    this.points = [];
    this.ipAddress = '-';
    this.store.dispatch(new ResetLog());
  }

  public subscribeToDevice(id?: string) {
    this.unsubscribe();
    if (id) {
      id = id + '/';
    } else {
      id = '';
    }

    this.mqttService
      .observe(id + 'stats/lidar')
      .pipe(takeUntil(this.cancelSubscriptions$))
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

        if (this.stagedPoints.length > 700) {
          this.points = this.stagedPoints;
          this.stagedPoints = [];
        }
      });

    this.mqttService
      .observe(id + 'stats/log')
      .pipe(takeUntil(this.cancelSubscriptions$))
      .subscribe((message: IMqttMessage) => {
        if (this.ignoreFirstMessageCounter < 3) {
          this.ignoreFirstMessageCounter++;
        } else {
          this.store.dispatch(
            new AppendLog(converLogLine(message.payload.toString()))
          );
        }
      });

    this.mqttService
      .observe(id + 'admin/ip')
      .pipe(takeUntil(this.cancelSubscriptions$))
      .subscribe((message: IMqttMessage) => {
        this.ipAddress = message.payload.toString();
      });
  }
  constructor(private mqttService: MqttService, private store: Store) {}
  ngAfterViewInit(): void {
    this.deviceId.subscribe((device) => {
      this.subscribeToDevice(device);
    });
  }
}
