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
      journeyType: ['1', [Validators.required]],
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

  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  };

  changeJourneyType(e: any) {
    this.clearFormArray(this.cityArray);
    this.addCity();
    this.searchResult = {};
    if (e.target.value === '1') {
      this.isOneway = true;
      this.isRoundTrip = false;
      this.isMultiCity = false;
      let cityGroupItems = (this.flightFormGroup.controls['city'] as any)
        .controls;
      for (let cityGroup of cityGroupItems) {
        cityGroup.controls['returnDate'].setValidators();
        cityGroup.controls['returnDate'].updateValueAndValidity();
      }
    } else if (e.target.value === '2') {
      this.isOneway = false;
      this.isRoundTrip = true;
      this.isMultiCity = false;
      let cityGroupItems = (this.flightFormGroup.controls['city'] as any)
        .controls;
      for (let cityGroup of cityGroupItems) {
        cityGroup.controls['returnDate'].setValidators([Validators.required]);
        cityGroup.controls['returnDate'].updateValueAndValidity();
      }
    } else if (e.target.value === '3') {
      this.isOneway = false;
      this.isRoundTrip = false;
      this.isMultiCity = true;
      let cityGroupItems = (this.flightFormGroup.controls['city'] as any)
        .controls;
      for (let cityGroup of cityGroupItems) {
        cityGroup.controls['returnDate'].setValidators();
        cityGroup.controls['returnDate'].updateValueAndValidity();
      }
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
    
    if (this.isOneway || this.isRoundTrip) {
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
      this.oneWayAirService.postMultipleSearchAir(airSearchModel).subscribe(
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
    if (this.isMultiCity) {
      let airSearchMulticityModel = {
        Adults: 1,
        Childrens: 0,
        Infants: 0,
        ClassType: 'Economy',
        JourneyType: 3,
        Multicities: {
          '0origin': 'DAC',
          '0destination': 'CCU',
          '0DepartureDate': '2021-10-30',
          '1origin': 'CCU',
          '1destination': 'BOM',
          '1DepartureDate': '2021-11-30',
          adults1: 1,
          children1: 0,
          infants1: 0,
          classType: 'Economy',
        },
        Flex: null,
        IsSpecialTexRedumtion: true,
      };
      console.log(airSearchMulticityModel);
      this.oneWayAirService
        .postMultipleSearchAirMulticityAir(airSearchMulticityModel)
        .subscribe(
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
