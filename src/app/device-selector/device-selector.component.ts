import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AppState, DeviceEnum, SetDevice } from 'src/app/state/app.state';

@Component({
  selector: 'app-device-selector',
  templateUrl: './device-selector.component.html',
  styleUrls: ['./device-selector.component.scss'],
})
export class DeviceSelectorComponent implements OnInit {
  public deviceList = Object.values(DeviceEnum);
  @Select(AppState.device)
  public selectedDeviceId: Observable<string>;

  constructor(public store: Store) {}

  public selectChanged(device: DeviceEnum) {
    this.store.dispatch(new SetDevice(device));
  }

  ngOnInit(): void {}
}
