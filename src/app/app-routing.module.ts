import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component'; // Assure-toi de l'importer correctement

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },  
  { path: 'dashboard', component: DashboardComponent },
  {
    path: '**', // wildcard
    component: NotFoundComponent,
  },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
