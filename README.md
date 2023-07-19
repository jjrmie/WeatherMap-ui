# WeatherMapUi
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.11.
Estimated time and effort spent on api and ui deliverables is around 10-12 hours in total.

# The WeatherMapUi is Angular Code Base with the following implementations/ features in mind using Microsoft Visual Studio Code.
 - HTML5
 - CSS3
 - Angular TypeScript
 - JavaScript
 - Bootstrap
 - JQuery
 - Dynamically filter and load cities based on the country option selected
 - Handles and display exception with the SnackBar style
 - Rotate to the next Api Key (used by the Api authentication) if StatusCode 429 is received
 
## Development server
Run `ng serve --port 4200` or `npm start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build
 - Run `npm install` to restore/ install all packages
 - Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running the app
 - Run `ng serve --port 4200` or `npm start` to start the app
 - Navigate to localhost:4200 when the build is successful

Make your selection of a country and a city to retrieve the weather from the OpenWeathermap.org
![image](https://github.com/jjrmie/WeatherMap-ui/assets/139659998/dff256ee-0611-4d57-8df0-6cb6b3076136)

## Testing the app
- Uses the REST URL from the WeatherMap-api
- Allows user to select city name and country name
- Presents the result to user
- Handles any error and present the proper messages
