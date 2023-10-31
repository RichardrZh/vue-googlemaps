# Vue Google Maps Application

A Google Maps Vue application showing how to integrate Google Maps API with modern UI frameworks. 

This application uses Vue 3, Axios, TailwindCSS, Bootstrap, Pinia, JavaScript, and integrated with Google Maps API. It features a google map and a searchable input field to allow seaching for any location. Searched places and addresses will be marked in the google map, and the application also displays a list of searched addresses with pagenation support. 

The application demonstrates how to use Vue 3 for a single page application, using compsition api, and single-file components. It shows how to implement reactivity through event & property binding, watchers, lifecycle hooks, and conditional rendering. It also shows how to call the Google Maps API and how to integrate a google map into an application. 

This application is responsive and can adapt to different devices with different screen sizes, ranging from a desktop computer to a mobile phone. 

## Description

This application was built with a responsive mobile first methodology. 

It features: 
* A button that allows the user to get their current location from the browser.
* A searchbar with autocomplete that is triggered by dropdown click, search button click, and enter keypress.
* A google map with markers for each searched location.
* A table with pagination to show all searched places with:
    * A maximum of 10 locations per page.
    * A select all checkbox that selects and unselects all locations.
    * A delete button that removes locations and markers from the map.
* A panel to display the time zone and local time of the latest searched location.
* A triangle button to toggle sidebar opening and closing.

![Application Example](./public/application_example.png?raw=true "Application Example")

## Getting Started

### Dependencies

* Axios
* Pinia
* Vue Google Maps Community Fork
* TailwindCSS
* Bootstrap
* Font Awesome

### Installing

* Add your Google API Key to ./src/config.json
* Optional: change the const debug value in ./src/stores/locations.js to true to add 101 locations to test pagination.

<!-- ### Executing program

* How to run the program
* Step-by-step bullets
```
code blocks for commands
``` -->

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE file](LICENSE) for details.
