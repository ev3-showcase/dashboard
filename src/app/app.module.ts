import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IMqttServiceOptions, MqttModule } from 'ngx-mqtt';
import { environment } from 'src/environments/environment';
import { AppConnectedScatterPlotComponent } from './app-connected-scatter-plot/app-connected-scatter-plot.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: environment.mqtt_hostname,
  port: 80,
  path: '/mqtt',
};

@NgModule({
  declarations: [AppComponent, AppConnectedScatterPlotComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
