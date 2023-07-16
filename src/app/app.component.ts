import { Component, Injector, OnInit } from '@angular/core';
import * as $ from 'jquery';
import * as countryCityData from '../assets/countryCity.json';
import * as countryData from '../assets/country.json';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { error } from 'console';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {


  constructor(public snackBar: MatSnackBar, private http: HttpClient) { }


  title = 'WeatherMap-ui';
  todayDate : Date = new Date();
  countryData:any = countryData;
  countryCityData:any = countryCityData;
  filteredData = [];
  weatherDescription :any;

  //Get Angular Snack Bars ready to use
  //this.openSuccessSnackBar('Success');
  //this.openFailureSnackBar('Failed');

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        this.openFailureSnackBar("An error occurred. " + error.error.message);
    } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        errorMessage = `Message: ${error.error.Message}`;
        this.openFailureSnackBar(errorMessage);
    }
    // return an observable with a user-facing error message
    return throwError(errorMessage);
};


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

  getWeather() {
  
    let headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('ApiKey', environment.ApiKey)
    .set('Access-Control-Allow-Origin', '*');

    var parameter = "country="+$('#countryDropdown').find(":selected").val() + "&city=" + $('#cityDropdown').find(":selected").val();

    
  $.ajax({

    url: environment.apiEndpoint + "WeatherForecast?" + parameter,
    type: 'GET',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Access-Control-Allow-Headers': 'Content-Type', 'ApiKey': environment.ApiKey, 'Access-Control-Allow-Origin': '*'},
    dataType: 'json', // added data type
    success: function(xhr) {
        console.log(xhr);

        $("#weatherDescription").text($('#cityDropdown').find(":selected").val() + ", " + $('#countryDropdown').find(":selected").val() + " currently has " + xhr.weather[0].description + ".");
    },
    error: function (xhr) {
    }
  

    });

  }

getHeaders() {
  var headers=new HttpHeaders().set('ApiKey', environment.ApiKey).set('Access-Control-Allow-Origin', '*');  
  return headers;
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




  




