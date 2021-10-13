import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OneWayAirRoutingModule } from './one-way-air-routing.module';
import { OneWayAirComponent } from './one-way-air.component';
import { OneWayAirService } from '../_services/one-way-air.service';
import { MessageService } from 'primeng/api';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';

@NgModule({
  declarations: [OneWayAirComponent],
  imports: [
    CommonModule,
    OneWayAirRoutingModule,
    ReactiveFormsModule,
    CalendarModule,
    DropdownModule,
    AutoCompleteModule,
  ],
  providers: [MessageService, OneWayAirService],
})
export class OneWayAirModule {}
