import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { WorldWideComponent } from './world-wide/world-wide.component';
import { ChartReportComponent } from './chart-report/chart-report.component';
import { NgxChartsModule }from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { TableTopComponent } from './table-top/table-top.component';
import { MapComponent } from './map/map.component';
@NgModule({
  declarations: [
    AppComponent,
    WorldWideComponent,
    ChartReportComponent,
    TableTopComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    LeafletModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
