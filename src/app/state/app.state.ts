import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

export class SetDevice {
  static readonly type = '[App] SetDevice';
  constructor(public device: DeviceEnum) {}
}
export enum DeviceEnum {
  carBdsp = 'car-bdsp',
  carCloudhub = 'car-cloudhub',
}

export interface AppStateModel {
  device: DeviceEnum;
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    device: DeviceEnum.carCloudhub,
  },
})
@Injectable()
export class AppState {
  @Selector()
  static state(state: AppStateModel) {
    return state;
  }
  @Action(SetDevice)
  setDevice(ctx: StateContext<AppStateModel>, action: SetDevice) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      device: action.device,
    });
  }
}
