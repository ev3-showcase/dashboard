import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { LogLine } from 'src/app/helper';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-chart-log',
  templateUrl: './chart-log.component.html',
  styleUrls: ['./chart-log.component.scss'],
})
export class ChartLogComponent implements OnInit {
  ngOnInit(): void {}

  constructor(private store: Store) {
    this.store.select(AppState).subscribe((state) => {
      this.multi = [
        {
          name: 'CPU',
          series: state.log.map((l: LogLine) => {
            return {
              name: l.datetime.getUTCMilliseconds(),
              value: 100 - l.cpu_stat_percent,
            };
          }),
        },
        {
          name: 'Memory',
          series: state.log.map((l: LogLine) => {
            return {
              name: l.datetime.getUTCMilliseconds(),
              value: l.mem_stat_used / l.mem_stat_total,
            };
          }),
        },
      ];
    });
  }

  multi: any[] = [];
  view: any[] = [700, 300];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Time';
  yAxisLabel: string = 'Percent';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
