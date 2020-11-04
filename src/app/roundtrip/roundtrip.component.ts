import { Component, OnDestroy, OnInit } from '@angular/core';
import { MqttService } from 'ngx-mqtt';

@Component({
  selector: 'app-roundtrip',
  templateUrl: './roundtrip.component.html',
  styleUrls: ['./roundtrip.component.scss'],
})
export class RoundtripComponent implements OnInit, OnDestroy {
  constructor(private mqttService: MqttService) {}
  ngOnDestroy(): void {
    this.timer.clearTimout();
  }
  private roundtripTopic = 'roundtrip';
  public roundtripTime: number = NaN;
  private timer: any;

  ngOnInit(): void {
    this.mqttService.observe(this.roundtripTopic).subscribe((message) => {
      this.roundtripTime =
        Date.now() - Number.parseInt(message.payload.toString());
    });
    this.sendRoundtrip();
  }

  sendRoundtrip() {
    this.timer = setTimeout(() => {
      this.mqttService.unsafePublish(
        this.roundtripTopic,
        Date.now().toString()
      );
      this.sendRoundtrip();
    }, 1000);
  }
}
