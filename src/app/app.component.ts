import { Component, Injector, OnInit } from '@angular/core';
import * as $ from 'jquery';
import * as countryCityData from '../assets/countryCity.json';
import * as countryData from '../assets/country.json';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  constructor() { }

  title = 'WeatherMap-ui';
  todayDate : Date = new Date();
  countryData:any = countryData;
  countryCityData:any = countryCityData;
  filteredData = [];
  weatherDescription :any;

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
      localStorage.setItem('keyOrder','key1');
      let tryagain = $('#tryAgain');
      tryagain.hide();
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

    
    var parameter = "country="+$('#countryDropdown').find(":selected").val() + "&city=" + $('#cityDropdown').find(":selected").val();

    let apiKey = this.rotateApiKey();
    
    $.ajax({
      url: environment.apiEndpoint + "WeatherForecast?" + parameter,
      type: 'GET',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Access-Control-Allow-Headers': 'Content-Type', 'ApiKey': apiKey, 'Access-Control-Allow-Origin': '*'},
      dataType: 'json', // added data type
        success:processSuccess,
        error: handleError,
      });
  }

  rotateApiKey() {
    let keyOrder = localStorage.getItem('keyOrder');
    if (keyOrder=="key1") 
      return environment.ApiKey.key1;
    else if (keyOrder=="key2")
      return environment.ApiKey.key2;
    else if (keyOrder=="key3")
      return environment.ApiKey.key3;
    else if (keyOrder=="key4")
      return environment.ApiKey.key4;
    else if (keyOrder=="key5")
      return environment.ApiKey.key5;
    else
      return "";
  }

 } 

 function processSuccess (xhr:any) {
  // Get the snackbar DIV and show custom message
  var msg = '';

  //debugger;
  if (xhr.cod === 400) {
      msg = '[400] Bad request.';
      showSnackBar(msg);
  } else {
    //console.log(xhr);
    var description = xhr.weather[0].description == undefined? "no weather report" : xhr.weather[0].description;
    $("#weatherDescription").text($('#cityDropdown').find(":selected").val() + ", " + $('#countryDropdown').find(":selected").val() + " currently has " + description + ".");
    let tryagain = $('#tryAgain');
    tryagain.hide();
  }
}

  function handleError (xhr:any) {
    // Get the snackbar DIV and show custom message
    var msg = '';

    if (xhr.status === 0) {
        msg = 'Cannot connect to the weather microservice.\n Please verify the network.';
    } else {
        msg = "[" + xhr.status + "] " + xhr.responseText;
    }

    if (xhr.status === 429) {
      setKeyOrder();
      let tryagain = $('#tryAgain');
      tryagain.show();
    }
    showSnackBar(msg);
  }

  function setKeyOrder() {
    let keyOrder = localStorage.getItem('keyOrder');
    if (keyOrder=="key1") 
    localStorage.setItem('keyOrder','key2');
    else if (keyOrder=="key2")
    localStorage.setItem('keyOrder','key3');
    else if (keyOrder=="key3")
    localStorage.setItem('keyOrder','key4');
    else if (keyOrder=="key4")
    localStorage.setItem('keyOrder','key5');
    else
    localStorage.setItem('keyOrder','key1');
  }

  function showSnackBar(msg:string) {
    var snackbarDiv = $("#snackbarDiv");
    var snackbarError = $("#snackbarError");
    var weatherDescription = $("#weatherDescription");
  
    // Add the "show" class to DIV
    snackbarDiv.addClass("show");
    snackbarError.text(msg);
    weatherDescription.text("");
  
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ snackbarDiv.removeClass("show"); }, 3000);
  }



  




