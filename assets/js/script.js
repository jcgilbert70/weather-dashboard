var locations = [];
var unique = [];
var city = "chicago"
var date = moment().format("dddd, MMMM Do YYYY");
var key = "c4a9e8715d261e0f1a0290347bef37d8";

function init() {
    console.log("initilize function started")
    // get any stored locations
    var storedLocations = JSON.parse(localStorage.getItem("locations"));

    if (storedLocations !== null) { // if stored locations is not empty, display in locations array
        locations = storedLocations;
        console.log("all locations in local storage: " + locations)
    }
    removeDuplicates(); // removing duplicate locations before rendering the locations in the search history
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
    locations.push(searchedCity);

    storedHistory();
    getWeather(searchedCity);
    getFiveDayForecast(searchedCity);

});

// store searched history in local storage
function storedHistory() {
    console.log("stored history function started")
    localStorage.setItem("locations", JSON.stringify(locations)) //added all searched names into locations array
    console.log("list of all inputs in local storage: " + locations.join(", "))
    removeDuplicates();
}

function removeDuplicates() {
    console.log("remove duplicates from history function started")
    for (i = 0; i < locations.length; i++) {
        if (unique.indexOf(locations[i]) === -1) {
            unique.push(locations[i]);
        }
        console.log("list of only unique cities: " + unique)
    }
    renderHistory();
}

// display cities previously searched under seach history heading, pull from local storage
function renderHistory() {
    console.log("render history function started")
    $('#searchHistory').empty(); // clears the search history list to re-write with now-stored data

    for (var i = 0; i < unique.length; i++) {
        var location = unique[i];


        var li = $("<li>").text(location); // adds a list item with locations name
        li.attr('type', 'button');  // makes the created list item a button
        li.attr('id', 'historyBtn');
        $('#searchHistory').prepend(li);
    };

    $(document).on("click", "#historyBtn", function (event) {
        event.preventDefault();
        city = $(this).text();
        getWeather(city);
        getFiveDayForecast(city);
    });
}

// create new element to display each search history
function renderWeather(weather) {
    var weatherResults = $('#currentSearch');
    $('#currentSearch').empty(); // clears previous search before displaying new search

    // create h2 for name
    var cityName = document.createElement("h2");
    cityName.textContent = weather.name;
    weatherResults.append(cityName);

    // create img for weather icon
    var icon = $("<img>").val(weather.weather[0].icon);
    icon.attr("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
    weatherResults.append(icon)

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

        var title = document.createElement("h2");
        title.textContent = "Your 5 Day Forecast for: " + weather.name;
        weatherResults.append(title);
    }
}

function renderFiveDayForecast(forecast) {
    console.log(forecast)
    var myForecast = [];
    var fiveDayArray = forecast.list;

    var fiveDayForecast = $('#fiveDayForecast');
    $('#fiveDayForecast').empty();
    console.log("data from five day forecast fetch next line")
    console.log(fiveDayArray)

    // create 5 day forecast cards
    $.each(fiveDayArray, function (index, value) {

        stock = {
            date: value.dt_txt,
            icon: value.weather[0].icon,
            temp: value.main.temp,
            feels_like: value.main.feels_like,
            humidity: value.main.humidity
        };

        if (value.dt_txt.split(" ")[1] === "12:00:00") { // only takes noon temp to push into stock card
            myForecast.push(stock);
        } else {
            return
        }
    });

    //populate each forecast card
    for (var i = 0; i < myForecast.length; i++) { // create the cards with syling
        var forecastCard = $("<div>");
        forecastCard.attr("class", "card text-white mb-3 bg-primary");
        forecastCard.attr("style", "max-width: 280px;");
        forecastCard.attr("style", "margin: 5px;");
        fiveDayForecast.append(forecastCard);

        var forecastHeader = $("<div>"); // create teh header with styling
        forecastHeader.attr("class", "card-header");

        var date = moment(`${myForecast[i].date}`).format("MM-DD-YYYY"); // add date with moment format
        forecastHeader.text(date);
        forecastCard.append(forecastHeader);

        var forecastBody = $("<div>"); // the body of the cards with styling, add and append icon, temp, feel, and humidity
        forecastBody.attr("class", "card-body");
        forecastCard.append(forecastBody);
        console.log(myForecast[i].icon)

        //Icon
        var icon = $("<img>").val(myForecast[i].icon);
        icon.attr("src", `https://openweathermap.org/img/wn/${myForecast[i].icon}@2x.png`);
        forecastBody.append(icon);
        console.log(icon)
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
};

function locateFiveDayForecast(coordinates) {
    console.log("beginning five day forecast location function")
    console.log("coordinates data from fetch: " + coordinates);

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
    console.log("the city that get five day forecast function is fetching: " + city)

    var fetchFiveDayForecast = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=' + key;

    fetch(fetchFiveDayForecast)
        .then((response) => response.json())
        .then((data) => locateFiveDayForecast(data))
}

// have function run on form submit
function getWeather(city) {
    console.log("get weather function started")
    console.log("the city that get weather function is fetching: " + city)

    var fetchWeather = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=' + key;

    fetch(fetchWeather)
        .then((response) => response.json())
        .then((data) => renderWeather(data))
}

init()