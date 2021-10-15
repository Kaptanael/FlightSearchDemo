import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { OneWayAirService } from '../_services/one-way-air.service';
import * as moment from 'moment';

@Component({
  selector: 'app-one-way-air',
  templateUrl: './one-way-air.component.html',
  styleUrls: ['./one-way-air.component.scss'],
})
export class OneWayAirComponent implements OnInit {
  flightFormGroup!: FormGroup;
  searchResult: any;
  isOneway: boolean = false;
  isRoundTrip: boolean = false;
  isMultiCity: boolean = false;

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
      noOfAdult: ['0'],
      noOfChild: ['0'],
      noOfInfant: ['0'],
      classType: ['Economy', [Validators.required]],
      city: this.fb.array([this.addCityGroup()]),
    });
  }

  addCityGroup() {
    return this.fb.group({
      departureDate: ['', [Validators.required]],
      returnDate: [''],
      flyingFrom: ['DAC', [Validators.required]],
      flyingTo: ['CXB', [Validators.required]],
    });
  }

  addCity() {
    this.cityArray.push(this.addCityGroup());
  }

  removeCity(index: any) {
    this.cityArray.removeAt(index);
  }

  get cityArray() {
    return <FormArray>this.flightFormGroup.get('city');
  }  

  changeJourneyType(e: any) {
    if (e.target.value === '1') {
      this.isOneway = true;
      this.isRoundTrip = false;
      this.isMultiCity = false;
      // let cityGroupItems = (this.flightFormGroup.controls['city'] as any).controls;      
      // for (let cityGroup of cityGroupItems) {
      //   cityGroup.controls['flyingFrom'].setValidators([Validators.required]);
      //   cityGroup.controls['flyingFrom'].updateValueAndValidity();
      //   cityGroup.controls['flyingTo'].setValidators([Validators.required]);
      //   cityGroup.controls['flyingTo'].updateValueAndValidity();
      //   cityGroup.controls['departureDate'].setValidators([
      //     Validators.required,
      //   ]);
      //   cityGroup.controls['departureDate'].updateValueAndValidity();
      // }      
    } else if (e.target.value === '2') {
      this.isOneway = false;
      this.isRoundTrip = true;
      this.isMultiCity = false;
      let cityGroupItems = (this.flightFormGroup.controls['city'] as any)
        .controls;
      for (let cityGroup of cityGroupItems) {
        // cityGroup.controls['flyingFrom'].setValidators([Validators.required]);
        // cityGroup.controls['flyingFrom'].updateValueAndValidity();
        // cityGroup.controls['flyingTo'].setValidators([Validators.required]);
        // cityGroup.controls['flyingTo'].updateValueAndValidity();
        // cityGroup.controls['departureDate'].setValidators([
        //   Validators.required,
        // ]);
        // cityGroup.controls['departureDate'].updateValueAndValidity();
        cityGroup.controls['returnDate'].setValidators([Validators.required]);
        cityGroup.controls['returnDate'].updateValueAndValidity();
      }   
    } else if (e.target.value === '3') {
      this.isOneway = false;
      this.isRoundTrip = false;
      this.isMultiCity = true;
      // let cityGroupItems = (this.flightFormGroup.controls['city'] as any)
      //   .controls;
      // for (let cityGroup of cityGroupItems) {
      //   cityGroup.controls['flyingFrom'].setValidators([Validators.required]);
      //   cityGroup.controls['flyingFrom'].updateValueAndValidity();
      //   cityGroup.controls['flyingTo'].setValidators([Validators.required]);
      //   cityGroup.controls['flyingTo'].updateValueAndValidity();
      //   cityGroup.controls['departureDate'].setValidators([
      //     Validators.required,
      //   ]);
      //   cityGroup.controls['departureDate'].updateValueAndValidity();
      // }   
    }
  }

  onFlightSubmit() {
    this.searchResult = {};
    let journeyType = this.flightFormGroup.controls.journeyType.value;
    let flyingFrom = '';
    let flyingTo = '';
    let departureDate = '';
    let returnDate = '';

    if (!this.isMultiCity && this.cityArray.value.length == 1) {
      this.cityArray.value.forEach((city: any) => {
        flyingFrom = city.flyingFrom;
        flyingTo = city.flyingTo;
        departureDate = city.departureDate
          ? moment(city.departureDate).format('YYYY-MM-DD').toString()
          : '';
        returnDate = city.returnDate
          ? moment(city.returnDate).format('YYYY-MM-DD').toString()
          : '';
      });
    }
    if (this.isMultiCity && this.cityArray.value.length > 0) {
    }

    let noOfAdult = this.flightFormGroup.controls.noOfAdult.value
      ? +this.flightFormGroup.controls.noOfAdult.value
      : 0;
    let noOfChild = this.flightFormGroup.controls.noOfChild.value
      ? +this.flightFormGroup.controls.noOfChild.value
      : 0;
    let noOfInfant = this.flightFormGroup.controls.noOfInfant.value
      ? +this.flightFormGroup.controls.noOfInfant.value
      : 0;
    let classType = this.flightFormGroup.controls.classType.value;

    let airSearchModel = {
      JourneyType: journeyType,
      Origin: flyingFrom,
      Destination: flyingTo,
      DepartureDate: departureDate,
      ReturnDate: returnDate,
      ClassType: classType,
      NoOfInfant: noOfInfant,
      NoOfChildren: noOfChild,
      NoOfAdult: noOfAdult,
    };
    console.log(airSearchModel);
    this.oneWayAirService.postOneWayAir(airSearchModel).subscribe(
      (response) => {
        console.log(response);
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
