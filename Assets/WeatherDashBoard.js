$(document).ready(function () {


    let cityRecord = [];

    // let cityRecord = [];

    $("#searchBtn").on("click", function () {
        let cityName = $("input").val();
        cityRecord.push(cityName);
        localStorage.setItem("city", cityRecord);
        createHistory(cityName);



        var queryUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=e112c6863270100dda4434fef755e48f&units=imperial";

        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function (response) {
            $(".citydata").empty();
            let currentCityD = $("<div>").attr("class", "currentcitydata");
            $(".citydata").append(currentCityD);
            let tempResult = "Temperature: " + response.main.temp;
            let humidityResult = "Humidity:" + response.main.humidity;
            let windResult = "Wind Speed: " + response.wind.speed;
            let city = "City: " + response.name;
            

            createCityDateEl(city);
            createCityDateEl(tempResult);
            createCityDateEl(humidityResult);
            createCityDateEl(windResult);
    

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
                     console.log(forcastInfo);
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
                       let uvResult = "UVI: " + forcastInfo.current.uvi
                        createCityDateEl(uvResult);    

                });


        });


    });

    if (localStorage.getItem("city") !== null&&localStorage.getItem("city").length>0) {
        cityRecord = localStorage.getItem("city").split(",");
        for (let i = 0; i < cityRecord.length; i++) {
            createHistory(cityRecord[i]);

        }
    }



})





function createHistory(cityName) {
    let rowDiv = $("<div>").attr("class", "historyitem");
    $(rowDiv).text(cityName);
    $("#searchRecord").append(rowDiv);

}


function createCityDateEl(cityData) {
    let newDiv = $("<div>");
    $(newDiv).append(cityData);
    $(".currentcitydata").append(newDiv);
}

function createForecastEl(forecastData) {
    let newDiv = $("<div>").attr("class", "forecastitem");
    let weatherIcon = "http://openweathermap.org/img/wn/" + forecastData.icon + ".png"

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
    let newIcon = $("<img>").attr("src", data);
    $(forecastItemDiv).append(newIcon);
}


