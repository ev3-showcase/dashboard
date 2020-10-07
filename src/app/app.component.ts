import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';
import * as d3 from 'd3';
import { scaleLinear } from 'd3';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  public deviceList = ['car-bdsp', 'car-cloudhub'];
  private subscriptions: Subscription[] = [];
  public message: string;
  public logLines = [];
  public ipAddress = '';
  public mockCounter = 0;
  public mockData = [];
  public selectedDeviceId = this.deviceList[0];

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

  public lidarmock() {
    if (this.mockData[this.mockCounter] == undefined) {
      this.mockCounter = 0;
    }
    this.unsafePublish(
      'stats/lidar',
      this.mockData[this.mockCounter].toString()
    );
    this.mockCounter++;
    setTimeout(() => {
      this.lidarmock();
    }, 40);
  }

  public subscribeToDevice(id?: string) {
    this.unsubscribe();
    if (id) {
      id = id + '/';
    } else {
      id = '';
    }

    let points = [];
    var width = 300,
      height = 300,
      radius = Math.min(width, height) / 2 - 30;
    var r = scaleLinear().domain([0, 1]).range([0, radius]);
    var line = d3
      .lineRadial()
      .radius(function (d) {
        return r(d[1]);
      })
      .angle(function (d) {
        return -d[0] + Math.PI / 2;
      });
    var svg = d3
      .select('#test')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
    var gr = svg
      .append('g')
      .attr('class', 'r axis')
      .selectAll('g')
      .data(r.ticks(3).slice(1))
      .enter()
      .append('g');
    gr.append('circle').attr('r', r);
    var ga = svg
      .append('g')
      .attr('class', 'a axis')
      .selectAll('g')
      .data(d3.range(0, 360, 30))
      .enter()
      .append('g')
      .attr('transform', function (d) {
        return 'rotate(' + -d + ')';
      });
    ga.append('line').attr('x2', radius);
    var color = d3.scaleOrdinal(d3.schemeCategory10);
    var line = d3
      .lineRadial()
      .radius(function (d) {
        return r(d[1]);
      })
      .angle(function (d) {
        return -d[0] + Math.PI / 2;
      });

    this.subscriptions.push(
      this.mqttService
        .observe(id + 'stats/lidar')
        .subscribe((message: IMqttMessage) => {
          let messageLine = message.payload.toString().split(',');
          points.push([
            Number.parseFloat(messageLine[2]) * (Math.PI / 180),
            Number.parseFloat(messageLine[3]) / 10000,
          ]);

          if (points.length >= 600) {
            svg.selectAll('circle').remove();
            svg
              .selectAll('point')
              .data(points)
              .enter()
              .append('circle')
              .attr('class', 'point')
              .attr('transform', function (d) {
                // get angle and radius
                var an = d[0],
                  ra = r(d[1]),
                  x = ra * Math.cos(an),
                  y = ra * Math.sin(an);
                return 'translate(' + [x, y] + ')';
              })
              .attr('r', 2)
              .attr('fill', 'grey');
            points = [];
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
  constructor(
    private mqttService: MqttService,
    private httpClient: HttpClient
  ) {
    this.httpClient
      .get('assets/mock/lidar_data.json')
      .subscribe((data: any) => {
        this.mockData = data;
        // this.lidarmock();
      });
  }
  ngAfterViewInit(): void {
    this.subscribeToDevice(this.selectedDeviceId);
  }

  public selectChanged(event: any) {
    this.subscribeToDevice(event.target.value);
    this.selectedDeviceId = event.target.value;
  }
}
