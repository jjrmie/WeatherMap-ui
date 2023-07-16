import { Component, Injector, OnInit } from '@angular/core';
import * as $ from 'jquery';
import * as countryCityData from '../assets/countryCity.json';
import * as countryData from '../assets/country.json';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  snackBarService: any;

  constructor(public snackBar: MatSnackBar) {}

  title = 'WeatherMap-ui';
  todayDate : Date = new Date();
  countryData:any = countryData;
  countryCityData:any = countryCityData;
  filteredData = [];


  ngOnInit() {

      let countrydropdown = $('#countryDropdown');

      let citydropdown = $('#cityDropdown');

      citydropdown.hide();

      countrydropdown.empty();

      countrydropdown.append('<option disabled selected hidden>Choose Country</option>');

      countrydropdown.prop('selectedIndex', 0);

      $.each(this.countryData, function(i, item) {

        countrydropdown.append($('<option></option>').val(item.country).html(item.country));

      });

      this.openSuccessSnackBar('Success');
      this.openFailureSnackBar('Failed');

  }

  populateCity () {
    
    let citydropdown = $('#cityDropdown');

    citydropdown.show();
    
    citydropdown.empty();

    citydropdown.append('<option disabled selected hidden>Choose City</option>');

    citydropdown.prop('selectedIndex', 0);

    $.each(this.countryCityData, function(i, item) {
  
      if (item.country === $('#countryDropdown').find(":selected").val()) {

      citydropdown.append($('<option></option>').val(item.city).html(item.city));

      }
    });

  }

  //Success snackbar
  openSuccessSnackBar(message:string) {
  this.snackBar.open(message, "OK", {
    duration: 3000,
    panelClass: ['green-snackbar', 'login-snackbar'],
    });
  }
  
  //Failure snackbar
  openFailureSnackBar(message:string) {
  this.snackBar.open(message, "Try again!", {
    duration: 3000,
    panelClass: ['red-snackbar','login-snackbar'],
    });
  }

 } 




  




