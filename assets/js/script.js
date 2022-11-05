var locations = [];
var city = "chicago"
var date = moment().format("dddd, MMMM Do YYYY");
var key = "c4a9e8715d261e0f1a0290347bef37d8";

function init() {
    console.log("initilize function started")
    // get any stored locations
    var storedLocations = JSON.parse(localStorage.getItem("locations"));

    if (storedLocations !== null) { // if stored locations is not empty, display in locations array
        locations = storedLocations;
        console.log(locations)
    }


    renderHistory();
}


$("#submitBtn").on("click", function (event) {
    console.log("get the weather button clicked")
    event.preventDefault();

    var searchedCity = $("#cityInput").val().toUpperCase().trim(); //grabs the text input saves it in all uppercase characters

    if (searchedCity === "") {
        console.log("input for city was blank")
        return;
    }
    console.log("searched city is: " + searchedCity);

    // currently saving duplicates, look into stopping that
    locations.push(searchedCity);


    storedHistory();
    getWeather(searchedCity);
    getFiveDayForecast(searchedCity);
});


// store searched history in local storage
function storedHistory() {
    console.log("stored history function started")
    localStorage.setItem("locations", JSON.stringify(locations))
    console.log("list of all inputs in local storage: " + locations.join(", "))
    renderHistory();
}


// display cities previously searched under seach history heading, pull from local storage
function renderHistory() {
    console.log("render history function started")

    $('#searchHistory').empty(); // clears the search history list to re-write with now-stored data

    for (var i = 0; i < locations.length; i++) {
        var location = locations[i];

        var li = $("<li>").text(location); // adds a list item with locations name
        li.attr('type', 'button');  // makes the created list item a button
        li.attr('id', 'historyBtn')
        li.attr('class', 'Btn')
        $('#searchHistory').prepend(li);

    } if (location) {

        // run get Weather function on created button in search history on selected location

    } else {
        return
    };
}


// create new element to display each search history


function renderWeather(weather) {
    var weatherResults = $('#currentSearch');
    $('#currentSearch').empty(); // clears previous search before displaying new search

    console.log(weather);



    // create h2 for name
    var cityName = document.createElement("h2");
    cityName.textContent = weather.name;
    weatherResults.append(cityName);

    // create p for temp
    var temp = document.createElement("p");
    temp.textContent = "Temp: " + weather.main.temp + " °F";
    weatherResults.append(temp)

    // create p for humidity
    var humidity = document.createElement("p");
    humidity.textContent = "Humidity: " + weather.main.humidity + " %";
    weatherResults.append(humidity)
    // create p for wind
    var wind = document.createElement("p");
    wind.textContent = "Wind Speed: " + weather.wind.speed + " mph, " + weather.wind.deg + "°";
    weatherResults.append(wind)

    var weatherDetails = weather.weather[0]
    if (weatherDetails && weatherDetails.description) {
        var description = document.createElement("p");
        description.textContent = weatherDetails.description;
        weatherResults.append(description);
    }
}

function renderFiveDayForecast(forecast) {
    console.log(forecast)
    var fiveDayArray = forecast.list;
    var myForecast = [];
    var fiveDayForecast = $('#fiveDayForecast');
    $('#fiveDayForecast').empty();
    console.log(fiveDayArray)
    // create 5 day forecast cards

    $.each(fiveDayArray, function (index, value) {
        
        stock = {
            date: value.dt_txt.split(" ")[0],
            temp: value.main.temp,
            feels_like: value.main.feels_like,
            humidity: value.main.humidity
        };

        if (value.dt_txt.split(" ")[1] === "12:00:00") { // only takes noon temp to push into stock card
            myForecast.push(stock);
            
            console.log(myForecast);
        }

        //populate each forecast card
        for (let i = 0; i < myForecast.length; i++) {
            var forecastCard = $("<div>");
            forecastCard.attr("class", "card text-white bg-primary mb-3 cardOne");
            forecastCard.attr("style", "max-width: 200px;");
            fiveDayForecast.append(forecastCard);

            var forecastHeader = $("<div>");
            forecastHeader.attr("class", "card-header");
           
            var date = moment(`${myForecast[i].date}`).format("MM-DD-YYYY");
            forecastHeader.text(date);
            forecastCard.append(forecastHeader);

            var forecastBody = $("<div>");
            forecastBody.attr("class", "card-body");
            forecastCard.append(forecastBody);

            //Temp
            var pTemp = $("<p>").text('Temperature: ' + myForecast[i].temp + ' °F');
            forecastBody.append(pTemp);
            //Feels Like
            var pFeel = $("<p>").text('Feels Like: ' + myForecast[i].feels_like + ' °F');
            forecastBody.append(pFeel);
            //Humidity
            var pHumid = $("<p>").text('Humidity: ' + myForecast[i].humidity + ' %');
            forecastBody.append(pHumid);
        }
    });
}



function locateFiveDayForecast(coordinates) {
    console.log("beginning five day forecast rendering function")
    console.log(coordinates);

    var cityLat = coordinates[0].lat;
    var cityLon = coordinates[0].lon;

    console.log("city latitude is: " + cityLat);
    console.log("city longitude is: " + cityLon);

    var forecast = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + cityLat + '&lon=' + cityLon + '&units=imperial&appid=' + key;
    fetch(forecast)
        .then((response) => response.json())
        .then((data) => renderFiveDayForecast(data))
}



function getFiveDayForecast(city) {
    console.log("get five day forecast function started")

    var fetchFiveDayForecast = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&units=imperial&appid=' + key;

    fetch(fetchFiveDayForecast)
        .then((response) => response.json())
        .then((data) => locateFiveDayForecast(data))
}



// have function run on form submit
function getWeather(city) {
    console.log("get weather function started")
    console.log("city that get weather function is fetching: " + city)



    var fetchWeather = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=' + key;

    fetch(fetchWeather)
        .then((response) => response.json())
        .then((data) => renderWeather(data))
}



$('#historyBtn').on("click", function(event) {
    console.log("search history button pressed")
    event.preventDefault();
    city = $(this).text();
    console.log(city)
    getWeather(city);
    getFiveDayForecast(city);
});

init()