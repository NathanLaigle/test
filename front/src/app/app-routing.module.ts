import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppListComponent } from './c/app-list/app-list.component';

const routes: Routes = [
  { path: '', component: AppListComponent, pathMatch: 'full' },
  { path: '**', component: AppListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
