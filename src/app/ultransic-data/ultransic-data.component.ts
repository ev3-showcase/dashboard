import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { LogLine } from 'src/app/helper';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-ultransic-data',
  templateUrl: './ultransic-data.component.html',
  styleUrls: ['./ultransic-data.component.scss'],
})
export class UltransicDataComponent implements OnInit {
  ngOnInit(): void {}

  constructor(private store: Store) {
    this.store.select(AppState).subscribe((state) => {
      this.multi = [
        {
          name: 'Ultransonic',
          series: state.log.map((l: LogLine) => {
            return {
              name: l.datetime.toISOString(),
              value: l.ultransonic,
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

  tickFormatting(value): string {
    const date = new Date(value);
    const newDate = new Date(
      date.getTime() + date.getTimezoneOffset() * 60 * 1000
    );

    const offset = date.getTimezoneOffset() / 60;
    const hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate.toLocaleString();
  }
}
