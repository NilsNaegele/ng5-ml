import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app.routing';

import { RatingLogic } from './rating/rating.logic';
import { RatingService } from './rating/rating.service';
import { CollectorService } from './collector/collector.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CollectorComponent } from './collector/collector.component';
import { RatingComponent } from './rating/rating.component';
import { NotifierComponent } from './notifier/notifier.component';
import { EvidenceComponent } from './evidence/evidence.component';
import { AIComponent } from './ai/ai.component';
import { ReportComponent } from './report/report.component';
import { AutopilotComponent } from './autopilot/autopilot.component';
import { AccuracyComponent } from './accuracy/accuracy.component';

import { OrderByPipe } from './pipes/orderby.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    CollectorComponent,
    RatingComponent,
    NotifierComponent,
    EvidenceComponent,
    AIComponent,
    ReportComponent,
    AutopilotComponent,
    AccuracyComponent,
    OrderByPipe,
    TruncatePipe
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ RatingLogic, RatingService, CollectorService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

// export const googleSearchConfig = {
//   apiKey: 'AIzaSyAt1k2kewjglCuyw9ikD6NF_UD9JfA4DCU',
//   cx: '004287087866899583493:olritvv2h9i'
// }
//
// export const timeSpans = [
//     { 'span': 'd1', 'sort': 'date:d' },
//     { 'span': 'w1', 'sort': 'date:a' },
//     { 'span': 'm1', 'sort': 'date:a' },
//     { 'span': 'm6', 'sort': 'date:a' },
//     { 'span': 'y1', 'sort': 'date:a' },
//     { 'span': 'y10', 'sort': 'date:a' }
// ];
