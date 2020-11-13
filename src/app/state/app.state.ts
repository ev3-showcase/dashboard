import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { LogLine } from 'src/app/helper';

export class SetDevice {
  static readonly type = '[App] SetDevice';
  constructor(public device: DeviceEnum) {}
}

export class AppendLog {
  static readonly type = '[App] AppendLog';
  constructor(public logLine: LogLine) {}
}
export enum DeviceEnum {
  carBdsp = 'car-bdsp',
  carCloudhub = 'car-cloudhub',
}

export interface AppStateModel {
  device: DeviceEnum;
  log: LogLine[];
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    device: DeviceEnum.carCloudhub,
    log: [],
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

  @Action(AppendLog)
  appendLog(ctx: StateContext<AppStateModel>, action: AppendLog) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      log: [...state.log, action.logLine],
    });
  }
}
