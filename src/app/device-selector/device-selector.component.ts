import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AppState, DeviceEnum, SetDevice } from 'src/app/state/app.state';

@Component({
  selector: 'app-device-selector',
  templateUrl: './device-selector.component.html',
  styleUrls: ['./device-selector.component.scss'],
})
export class DeviceSelectorComponent implements OnInit {
  public deviceList = Object.values(DeviceEnum);
  public selectedDeviceId = null;

  constructor(public store: Store) {
    this.selectedDeviceId = this.store.selectSnapshot(AppState.state).device;
  }

  public selectChanged(device: DeviceEnum) {
    this.store.dispatch(new SetDevice(device));
    this.selectedDeviceId = device;
  }

  ngOnInit(): void {}
}
