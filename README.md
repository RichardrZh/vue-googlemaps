# Vue Google Maps Application

A Google Maps Vue application showing how to integrate Google Maps API with modern UI frameworks. 

## Description

This application uses Vue 3, Axios, TailwindCSS, Bootstrap, Pinia, JavaScript, and integrated with Google Maps API. It features a google map and a searchable input field to allow searching for any location. It also features a button that allows the user to get their current location from the browser. Searched places and addresses will be marked in the google map, and the application also displays a list of searched addresses with pagination support. 

The application demonstrates how to use Vue 3 for a single page application, using composition API, and single-file components. It makes use of Vue's event & property binding, watchers, lifecycle hooks, conditional rendering, and other features to make the application more responsive and user friendly. 

Contained within is a custom library that can handle all possible Google Maps API services. It currently supports the geocode, timezone, places details, and place autocomplete Google Maps API endpoints.

This application is responsive and can adapt to different devices with different screen sizes, ranging from a desktop computer to a mobile phone. 

![Application Example](./public/application_example.png?raw=true "Application Example")

## Implemented Features from Practice Project Request

* A button that allows the user to get their current location from the browser.
* A search-bar with autocomplete that is triggered by dropdown click, search button click, and on enter key pressed.
* A google map embed, with markers for each searched location.
* A table with pagination to show all searched locations with:
    * A maximum of 10 locations per page.
    * A checkbox that selects and unselects all selected locations from the current page.
    * A delete button that removes selected locations and location markers from the google map.
* A panel to display the address, time zone and local time of the latest searched location.

## Restrictions and Issues Discovered

This application integrates a Google Map component by using the vue-google-maps library. However due to the library, on certain edge cases this map component exhibits strange behaviour. Moreover, vue-google-maps does not expose its map controls making it difficult to fix these behaviours.
* Losing focus of the autocomplete input field will fire a place change event which may not be desired.
* When the enter key is pressed on the autocomplete input field with an incomplete address data input, will fire a place change event with the place object containing incorrect data.
* Autocomplete dropdown is sometime not adaptive on screen resize (reason unknown as the control is not exposed).

Additionally, the Google Maps Places API is a server side service and Google restricts client side calls. Any client side call to the Places API will cause a CORS issue (No 'Access-Control-Allow-Origin').

The more comprehensive solution is to install and use the javascript Google Maps API library, or modify the vue-google-maps library. However this may require more time and effort. This project attempted a different approach by examining the contents from the Google Maps dropdown component. Using the address data obtained from the component, along with the Google Maps Geocoding API service, the location data could be obtained to achieve the desired result.

## Getting Started

### Dependencies and Libraries

* Axios
* Pinia
* Vue Google Maps Community Fork
* TailwindCSS
* Bootstrap
* Font Awesome

### Installation

To install and run the project locally first make sure you have node installed. Then download the application and run the following commands.

For development:
```
npm install
npm run dev
```
For deployment:
```
npm install
npm run build
```
Required Configurations:
* Add your Google Maps API Key to the following [config file](./src/config.json).

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE file](LICENSE) for details.
