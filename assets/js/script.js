var locations = [];
var city = "Chicago"
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
    renderHistory();

});




// store searched history in local storage
function storedHistory() {
    console.log("stored history function started")
    localStorage.setItem("locations", JSON.stringify(locations))
    console.log("list of all inputs in local storage: " + locations.join(", "))
}






// display cities previously searched under seach history heading, pull from local storage
function renderHistory() {
    console.log("render history function started")

    $('#searchHistory').empty(); // clears the search history list to re-write with now-stored data

    for (var i = 0; i < locations.length; i++) {
        var location = locations[i];

        var li = $("<li>").text(location); // adds a list item with locations name
        li.attr('type', 'button');  // makes the created list item a button
        $('#searchHistory').prepend(li);

    } if (location) {
        getWeather(location) // run get Weather function on created button in search history on selected location

    } else {
        return
    };
}



// create new element to display each search history


function renderWeather(weather) {
    console.log(weather);
    var weatherResults = $('#currentSearch');
    // create h2 for name
    var cityName = document.createElement("h2");
    cityName.textContent = weather.name;
    weatherResults.append(cityName);

    // create p for temp
    var temp = document.createElement("p");
    temp.textContent = "Temp: " + weather.main.temp + " F";
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




// have function run on form submit
function getWeather(city) {
    console.log("get weather function started")
    console.log("city that get weather function is fetching: " + city)
    $('#currentSearch').empty();

    var fetchWeather = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=' + key;

    fetch(fetchWeather)
        .then((response) => response.json())
        .then((data) => renderWeather(data))
}

getWeather();

/* 
 var currentWeatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key}`;
 
 
 
 
 $(".currentSearch").empty();
 
 
 
 $.ajax({
     url: currentWeatherApi,
     method: "GET"
 
 }).then(function (response) {
     $(".searhedCityName").text(response.name);
     $(".searchedCurrentDate").text(date);
     $(".icons").attr("src", `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`);
 
     var currentTemperatureEl = $('<p>').text(`Feels Like: ${response.main.feels_like} °F`);
     currentSearch.append(currentTemperatureEl);
 
     var currentFeelsLikeTemperatureEl = $("<p>").text(`Feels Like: ${response.main.feels_like} °F`);
     currentSearch.append(currentFeelsLikeTemperatureEl);
 
     var currentHumidityEl = $("<p>").text(`Humidity: ${response.main.humidity} %`);
     currentSearch.append(currentHumidityEl);
 
 
 
 
     var searchLon = response.coord.lon;
     console.log(searchLon);
     var searchLat = response.coord.lat;
     console.log(searchLat);
 
 
 
 })
 // getFiveDayForecast();
}
*/



/*
function getFiveDayForecast() {
    var fiveDayForecastApi = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${key}`;
 
    $.ajax({
        url: fiveDayForecastApi,
        method: "GET"
 
    }).then(function (response) {
 
        $("#fiveDayForecast").empty();
        console.log(response);
        for (var i = 0, j = 0; j <= 5; i = i + 6) {
            var eachDate = response.list[i].dt;
            if (response.list[i].dt != response.list[i + 1].dt) {
                var FivedayDiv = $("<div>");
                FivedayDiv.attr("class", "col-3 m-2 bg-primary");
                var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
                d.setUTCSeconds(eachDate);
                var date = d;
                console.log(date);
                var month = date.getMonth() + 1;
                var day = date.getDate();
                var dayOutput =
                    date.getFullYear() +
                    "/" +
                    (month < 10 ? "0" : "") +
                    month +
                    "/" +
                    (day < 10 ? "0" : "") +
                    day;
                var Fivedayh4 = $("<h6>").text(dayOutput);
                //Set src to the imags
                var imgtag = $("<img>");
                var skyconditions = response5day.list[i].weather[0].main;
                if (skyconditions === "Clouds") {
                    imgtag.attr(
                        "src",
                        "https://img.icons8.com/color/48/000000/cloud.png"
                    );
                } else if (skyconditions === "Clear") {
                    imgtag.attr(
                        "src",
                        "https://img.icons8.com/color/48/000000/summer.png"
                    );
                } else if (skyconditions === "Rain") {
                    imgtag.attr(
                        "src",
                        "https://img.icons8.com/color/48/000000/rain.png"
                    );
                }
 
                var pTemperatureK = response5day.list[i].main.temp;
                console.log(skyconditions);
                var TempetureToNum = parseInt((pTemperatureK * 9) / 5 - 459);
                var pTemperature = $("<p>").text(
                    "Tempeture: " + TempetureToNum + " °F"
                );
                var pHumidity = $("<p>").text(
                    "Humidity: " + response5day.list[i].main.humidity + " %"
                );
                FivedayDiv.append(Fivedayh4);
                FivedayDiv.append(imgtag);
                FivedayDiv.append(pTemperature);
                FivedayDiv.append(pHumidity);
                $("#boxes").append(FivedayDiv);
                console.log(response5day);
                j++;
            }
        }
    });
 
}
*/





// will need button click function for created location history buttons

init()