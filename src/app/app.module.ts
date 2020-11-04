import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { IMqttServiceOptions, MqttModule } from 'ngx-mqtt';
import { MaterialModule } from 'src/app/material.module';
import { AppState } from 'src/app/state/app.state';
import { VideoPlayerComponent } from 'src/app/video-player/video-player.component';
import { environment } from 'src/environments/environment';
import { ConnectedScatterPlotComponent } from './app-connected-scatter-plot/app-connected-scatter-plot.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeviceSelectorComponent } from './device-selector/device-selector.component';
import { LogStreamComponent } from './log-stream/log-stream.component';
import { RoundtripComponent } from './roundtrip/roundtrip.component';

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: environment.mqtt_hostname,
  port: environment.mqtt_port,
  path: '/mqtt',
};

@NgModule({
  declarations: [
    AppComponent,
    ConnectedScatterPlotComponent,
    VideoPlayerComponent,
    RoundtripComponent,
    DeviceSelectorComponent,
    LogStreamComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxsModule.forRoot([AppState], {
      developmentMode: !environment.production,
    }),
    NgxsLoggerPluginModule.forRoot({
      disabled: environment.production,
    }),
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
