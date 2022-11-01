var locationInputEl = $('#locationInput');
var locationSearchedEl = $('#locationSearched');
var apiKey = "";

function init() {
    console.log("initilize function started")


    renderHistory() // display any stored history when initialized
}


var inputSumbitHandler = function (event) {
    event.preventDefault();
    console.log("input submit handler function started")


    var searchedLocation = locationInputEl.value().trim();
    console.log("searched location is: " + searchedLocation);
    if (searchedLocation) {
        getWeather(searchedLocation);

        locationSearchedEl.textContent = '';
        locationInputEl.value = '';
    } else {
        alert('Please enter a location to search for weather forcast')
    }
};



// store searched history in local storage
function storedHistory() {
    console.log("stored history function started")


}




// display cities previously searched, pull from local storage
function renderHistory() {
    console.log("render history function started")



    // create new element to display each search history



}







// have function run on form submit
var getWeather = function (locationName) {
    console.log("get weather function started")
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + locationName + "&appid=" + apiKey;

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
        .catch(function (error){
            alert('Unable to connect to OpenWeatherMap')
        })
}



$('#submitBtn').on('click', function () {
    inputSumbitHandler();
})

// will need button click function for created location history buttons

init()

