import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CollectorComponent } from './collector/collector.component';
import { RatingComponent } from './rating/rating.component';
import { NotifierComponent } from './notifier/notifier.component';
import { EvidenceComponent } from './evidence/evidence.component';
import { AIComponent } from './ai/ai.component';
import { ReportComponent } from './report/report.component';
import { AutopilotComponent } from './autopilot/autopilot.component';
import { AccuracyComponent } from './accuracy/accuracy.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'collector', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'collector', component: CollectorComponent },
    { path: 'rating', component: RatingComponent },
    { path: 'notifier', component: NotifierComponent },
    { path: 'evidence', component: EvidenceComponent },
    { path: 'ai', component: AIComponent },
    { path: 'report', component: ReportComponent },
    { path: 'autopilot', component: AutopilotComponent },
    { path: 'accuracy', component: AccuracyComponent },
    { path: '**', component: CollectorComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
