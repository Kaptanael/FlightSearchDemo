import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { OneWayAirService } from '../_services/one-way-air.service';

@Component({
  selector: 'app-one-way-air',
  templateUrl: './one-way-air.component.html',
  styleUrls: ['./one-way-air.component.scss'],
})
export class OneWayAirComponent implements OnInit {
  flightFormGroup!: FormGroup;
  searchResult: any;

  constructor(
    private fb: FormBuilder,
    private oneWayAirService: OneWayAirService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.createFlightForm();
  }

  createFlightForm() {
    this.flightFormGroup = this.fb.group({
      journeyType: ['', [Validators.required]],
      departureDate: [''],
      returnDate: [''],
      flyingFrom: ['DAC'],
      flyingTo: ['CCU'],
      noOfAdult: ['0'],
      noOfChild: ['0'],
      noOfInfant: ['0'],
    });
  }

  getClientFormattedDate(value: string): string {
    if (value) {
      let dateObj = new Date(value);
      let month = dateObj.getUTCMonth() + 1;
      let day = dateObj.getUTCDate() + 1;
      let year = dateObj.getUTCFullYear();

      return year + '-' + month + '-' + day;
    }
    return '';
  }

  onFlightSubmit() {
    this.searchResult = {};
    let journeyType = this.flightFormGroup.controls.journeyType.value;
    let departureDate = this.flightFormGroup.controls.departureDate.value
      ? this.getClientFormattedDate(
          this.flightFormGroup.controls.departureDate.value
        )
      : '';
    let returnDate = this.flightFormGroup.controls.returnDate.value
      ? this.getClientFormattedDate(
          this.flightFormGroup.controls.returnDate.value
        )
      : '';
    let noOfAdult = this.flightFormGroup.controls.noOfAdult.value
      ? +this.flightFormGroup.controls.noOfAdult.value
      : 0;
    let noOfChild = this.flightFormGroup.controls.noOfChild.value
      ? +this.flightFormGroup.controls.noOfChild.value
      : 0;
    let noOfInfant = this.flightFormGroup.controls.noOfInfant.value
      ? +this.flightFormGroup.controls.noOfInfant.value
      : 0;
    let flyingFrom = this.flightFormGroup.controls.flyingFrom.value;
    let flyingTo = this.flightFormGroup.controls.flyingTo.value;
    
    let airSearchModel = {
      JourneyType: journeyType,
      Origin: flyingFrom,
      Destination: flyingTo,
      DepartureDate: departureDate,
      ReturnDate: returnDate,
      ClassType: 'Economy',
      NoOfInfant: noOfInfant,
      NoOfChildren: noOfChild,
      NoOfAdult: noOfAdult,
    };
    console.log(airSearchModel);
    this.oneWayAirService.postOneWayAir(airSearchModel).subscribe(
      (response) => {
        if (response) {
          this.searchResult = response;
          console.log(this.searchResult);
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      },
      () => {}
    );
  }

  // onOneWayAirClick() {
  //   let oneWayAirModel = {
  //     JourneyType: 1,
  //     Origin: 'DAC',
  //     Destination: 'CCU',
  //     DepartureDate: '2021-11-30',
  //     ReturnDate: '',
  //     ClassType: 'Economy',
  //     NoOfInfant: 0,
  //     NoOfChildren: 0,
  //     NoOfAdult: 1,
  //   };
  //   this.oneWayAirService.postOneWayAir(oneWayAirModel).subscribe(
  //     (response) => {
  //       if (response) {
  //         this.searchResult = response;
  //         console.log(this.searchResult);
  //       }
  //     },
  //     (error: HttpErrorResponse) => {
  //       console.log(error);
  //     },
  //     () => {}
  //   );
  // }
}
