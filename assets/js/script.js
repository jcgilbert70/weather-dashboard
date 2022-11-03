var locations = [];
var cityInputEl = $('#cityInput');
var locationSearchedEl = $('#locationSearched');
var apiKey = "c4a9e8715d261e0f1a0290347bef37d8";

function init() {
    console.log("initilize function started")
    // get any stored locations
    var storedLocations = JSON.parse(localStorage.getItem("locations"));

    if (storedLocations !== null) { // if stored locations is not empty, display in locations array
        locations = storedLocations;
        console.log(locations)
    }


    renderHistory(); // after collecting array from local storage, run render function
}





var inputSumbitHandler = function (event) {
    event.preventDefault();
    console.log("input submit handler function started")


    var searchedCity = cityInputEl.value().trim();

    console.log("searched city is: " + searchedCity);
    if (searchedCity) {  // if searched city has an input, run get weather function, bringing 
        getWeather(searchedCity);

        locationSearchedEl.textContent = '';  // clears previous 5 day forceast
        cityInputEl.value = '';  // clears city input area

    } else {
        alert('Please enter a location to search for weather forcast')
    }
};






// store searched history in local storage
function storedHistory() {
    console.log("stored history function started")
    localStorage.setItem("locations", JSON.stringify(locations))

}






// display cities previously searched, pull from local storage
function renderHistory() {
    console.log("render history function started")

    locationSearchedEl.empty();

    for (var i = 0; i < locations.length; i++) {
        var location = locations[i];

        var li = $("<li>").text(location);
        li.attr('type', 'button');

    } if (location) {
        getWeather(location)

    } else {
        return
    };
}



// create new element to display each search history







// have function run on form submit
var getWeather = function () {
    console.log("get weather function started")
    var apiUrl = "api.openweathermap.org/data/2.5/forecast?q=" + cityName + "," + stateName + "," + countryName + "&appid=" + apiKey;

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displaySearch(data);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to OpenWeatherMap')

        })
    console.log.apply(response)
}




$('#submitBtn').on('click', function () {
    inputSumbitHandler();
})

// will need button click function for created location history buttons

init()

