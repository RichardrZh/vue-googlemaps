# Vue Google Maps Application

A google maps vue application for the accuenergy pre-interview code submission. 

It has a map, searchbar, and panel to see searched and most recently searched locations.

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

## Help

Feel free to contact me at richard.zhuang91@gmail.com for any issues or questions.
<!-- ```
command to run if program contains helper info
``` -->

## Authors

Richard Zhuang
* Email: richard.zhuang91@gmail.com
* LinkedIn: [https://www.linkedin.com/in/richardzhuang91/](https://www.linkedin.com/in/richardzhuang91/)

<!-- ## Version History

* 0.2
    * Various bug fixes and optimizations
    * See [commit change]() or See [release history]()
* 0.1
    * Initial Release -->

## License

This project is licensed under the GNU General Public License v3.0 - see the LICENSE.md file for details

<!-- ## Acknowledgments -->
