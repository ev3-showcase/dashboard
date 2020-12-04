import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Navigate, RouterNavigation } from '@ngxs/router-plugin';
import {
  Action,
  Actions,
  ofActionSuccessful,
  Selector,
  State,
  StateContext,
  Store,
} from '@ngxs/store';
import { LogLine } from 'src/app/helper';

export class SetDevice {
  static readonly type = '[App] SetDevice';
  constructor(public device: DeviceEnum) {}
}

export class AppendLog {
  static readonly type = '[App] AppendLog';
  constructor(public logLine: LogLine) {}
}

export class ResetLog {
  static readonly type = '[App] ResetLog';
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
  constructor(private store: Store, private actions$: Actions) {
    this.actions$
      .pipe(ofActionSuccessful(RouterNavigation))
      .subscribe((routeInfo) => {
        const routeSnapshot: ActivatedRouteSnapshot =
          routeInfo.routerState.root;
        const pathSegment = routeSnapshot;
        if (pathSegment != null) {
          let device =
            pathSegment.queryParamMap.get('device') || DeviceEnum.carCloudhub;
          this.store.dispatch(new SetDevice(device as any));
        }
      });
  }
  @Selector()
  static state(state: AppStateModel) {
    return state;
  }
  @Selector()
  static device(state: AppStateModel) {
    return state.device;
  }
  @Selector()
  static log(state: AppStateModel) {
    return state.log;
  }
  @Action(SetDevice)
  setDevice(ctx: StateContext<AppStateModel>, action: SetDevice) {
    const state = ctx.getState();
    if (state.device === action.device) {
      return;
    }
    ctx.setState({
      ...state,
      device: action.device,
    });
    const params: { [key: string]: string | null } = {};
    params.device = this.store.selectSnapshot(AppState.device);
    return this.store.dispatch(
      new Navigate([''], params, {
        queryParamsHandling: 'merge',
      })
    );
  }

  @Action(AppendLog)
  appendLog(ctx: StateContext<AppStateModel>, action: AppendLog) {
    const state = ctx.getState();
    if (state.log.length > 20) {
      ctx.setState({
        ...state,
        log: [...state.log.slice(1, 20), action.logLine],
      });
    } else {
      ctx.setState({
        ...state,
        log: [...state.log, action.logLine],
      });
    }
  }

  @Action(ResetLog)
  resetLog(ctx: StateContext<AppStateModel>) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      log: [],
    });
  }
}
