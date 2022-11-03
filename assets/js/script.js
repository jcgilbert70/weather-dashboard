var locations = [];
var cityInputEl = $('#cityInput');
var stateInputEl = $('#stateInput');
var countryInputEl = $('#countryInput');
var locationSearchedEl = $('#locationSearched');
var apiKey = "c4a9e8715d261e0f1a0290347bef37d8";

function init() {
    console.log("initilize function started")


    renderHistory() // display any stored history when initialized
}





var inputSumbitHandler = function (event) {
    event.preventDefault();
    console.log("input submit handler function started")


    var searchedCity = cityInputEl.value().trim();
    var searchedState = stateInputEl.value().trim();
    var searchedCountry = countryInputEl.value().trim();
    console.log("searched location is: " + searchedCity + ", " + searchedState + ", " + searchedCountry);
    if (searchedCity) {
        getWeather(searchedCity, searchedState, searchedCountry);

        locationSearchedEl.textContent = '';  // clears previous 5 day forceast
        cityInputEl.value = '';  // clears city input area
        stateInputEl.value = '';  //  clears state input area
        countryInputEl.value = '';  // clears country input area
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
for (var i = 0; i < locations.length; i++) {
    var location = locations[i]; 
}


    // create new element to display each search history



}







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

