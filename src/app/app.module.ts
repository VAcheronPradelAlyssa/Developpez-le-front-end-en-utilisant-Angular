import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component'; 
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PieComponent } from './components/pie/pie.component';
import  {LineComponent}  from './components/line/line.component';
import { DetailsComponent } from './pages/details/details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent, DashboardComponent,PieComponent, DetailsComponent, LineComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgxChartsModule,BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
  