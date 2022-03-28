import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DataGraphComponent } from './Components/DataGraph/DataGraph.component';

@NgModule({
  declarations: [AppComponent, DataGraphComponent],
  imports: [BrowserModule, NgChartsModule,FormsModule,HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

