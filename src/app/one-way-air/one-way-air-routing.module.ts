import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OneWayAirComponent } from './one-way-air.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: OneWayAirComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OneWayAirRoutingModule { }
