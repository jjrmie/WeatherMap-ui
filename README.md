# About WeatherMapUi
 - This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.11.
 - This Angular-based WeatherMap Ui captures country and city parameters and sends to the WeatherMap-api requesting the weather objects from the OpenWeatherMap.org
 - Estimated time and effort spent on both Api and Ui deliverables was around 10-12 hours in total
 - HTML5
 - CSS3
 - Angular TypeScript
 - JavaScript
 - Bootstrap
 - JQuery
 - Dynamically filters and loads cities based on the country option selected
 - Handles and displays exceptions with the SnackBar style
 - Rotate to the next Api Key (5 in total, used by the Api authentication) if StatusCode 429 is received **(a)**
 
## Development server
Open the workspace in VS Code, run `ng serve --port 4200` or `npm start` in the Terminal for a dev server. The application will automatically reload if you change any of the source files.

## Build and run in VS Code
 - Run `npm install` to restore/ install all packages
 - Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
 - Run `ng serve --port 4200` or `npm start` to start the app

## Running the app
 - Navigate to http://localhost:4200 once the build is successful

Make your selection of a country and a city to retrieve the weather from the OpenWeathermap.org
![image](https://github.com/jjrmie/WeatherMap-ui/assets/139659998/dff256ee-0611-4d57-8df0-6cb6b3076136)

## Contributing
Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## Remarks
 - (a) Since the IP Rate Limit is implemented, though an alternative mechanism is in place, when the key rotation of 5 keys is exceeded, the Rate Limit may not work as per requirement. Refer to the Api README to learn more

## Testing the app
- Play with different screen sizes on different modern browsers (e.g Google Chrome, Firefox, Edge) to test the responsive design
- Select a country and a city while the api is **stopped** to test the error handling
- Modify the ApiKey.key1 in the environment.ts, select a country and a city while the api is running to test the Api Key Authentication
- Revert the ApiKey modification, select a country and a city while the api is running to start testing the weather results
- Repeat the Country/ city selections while the api is running to test the Rate Limit and Key Rotation (5 attempts per key)

