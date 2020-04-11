//let user put in the cityName
let cityName = "Atlanta";

var queryUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=e112c6863270100dda4434fef755e48f&units=imperial";

$.ajax({
    url: queryUrl,
    method: "GET"
}).then(function (response) {

    let tempResult = "Temperature: " + response.main.temp;
    let humidityResult = "Humidity:" + response.main.humidity;
    let windResult = "Wind Speed: " + response.wind.speed;
    let city = "City: " + response.name;
    let uvResult = "UV: "


    createCityDateEl(city);
    createCityDateEl(tempResult);
    createCityDateEl(humidityResult);
    createCityDateEl(windResult);
    createCityDateEl(uvResult);

    let labelDay = $("<label>").text("5-Day Forecast:");
    $(".citydata").append(labelDay);

    let forecastDataD = $("<div>").attr("class", "forecastcontainer");
    $(".citydata").append(forecastDataD);



    let latInfo = response.coord.lat;
    let lonInfo = response.coord.lon;

    let forecastUrl = "https://api.openweathermap.org/data/2.5/onecall?" + "lat=" + latInfo + "&lon=" + lonInfo + "&appid=e112c6863270100dda4434fef755e48f&units=imperial";
    -
        $.ajax({
            url: forecastUrl,
            method: "GET"
        }).then(function (forcastInfo) {

            for (let a = 0; a < 5; a++) {
                let today = new Date();
                let in_a_week = new Date();
                in_a_week.setDate(today.getDate() + a + 1);
                let forecastData = {
                    "temp": forcastInfo.daily[a].temp.day,
                    "humidity": forcastInfo.daily[a].humidity,
                    "icon": forcastInfo.daily[a].weather[0].icon,
                    "date": in_a_week.toLocaleDateString()
                }
                createForecastEl(forecastData)
            };
          

        });


});


function createCityDateEl(cityData) {
    let newDiv = $("<div>");
    $(newDiv).append(cityData);
    $(".currentcitydata").append(newDiv);
}

let currentCityD = $("<div>").attr("class", "currentcitydata");
$(".citydata").append(currentCityD);


function createForecastEl(forecastData) {
    let newDiv = $("<div>").attr("class", "forecastitem");
let weatherIcon =  "http://openweathermap.org/img/wn/"+forecastData.icon+".png"

    createForecastItemDataElement(forecastData.date, newDiv);
    createForecastItemDataElement(forecastData.temp, newDiv);
    createForecastWeatherIcon(weatherIcon, newDiv);
    createForecastItemDataElement(forecastData.humidity, newDiv);

    $(".forecastcontainer").append(newDiv);
}


function createForecastItemDataElement(data, forecastItemDiv) {
    let newDiv = $("<div>")
    $(newDiv).append(data);
    $(forecastItemDiv).append(newDiv);
}

function createForecastWeatherIcon(data, forecastItemDiv) {
    let newIcon = $("<img>").attr("src",data);
    $(forecastItemDiv).append(newIcon);
}   


