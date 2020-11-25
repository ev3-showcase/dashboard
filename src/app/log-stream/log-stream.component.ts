import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LogLine } from 'src/app/helper';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-log-stream',
  templateUrl: './log-stream.component.html',
  styleUrls: ['./log-stream.component.scss'],
})
export class LogStreamComponent implements OnInit {
  @Select(AppState.log) logLines: Observable<LogLine[]>;
  constructor() {}

  ngOnInit(): void {}
}
