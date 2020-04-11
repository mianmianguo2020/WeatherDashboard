//let user put in the cityName
let cityName = "Atlanta";

var queryUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=e112c6863270100dda4434fef755e48f";

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

    console.log(response)
    console.log(response.coord)

    let latInfo = response.coord.lat;
    let lonInfo = response.coord.lon;

    var forecastUrl = "https://api.openweathermap.org/data/2.5/onecall?" + "lat=" + latInfo + "&lon=" + lonInfo + "&appid=e112c6863270100dda4434fef755e48f&units=imperial";
-
    $.ajax({
        url: forecastUrl,
        method: "GET"
    }).then(function (forcastInfo) {

        for (let a = 0; a < 6; a ++){
            let forecastData = {"temp": forcastInfo.daily[0].temp.day,
                                "humidity":forcastInfo.daily[0].humidity,
                                "icon":forcastInfo.daily[0].weather[0].icon
                                // "date":
                       
        };

        createForecastEl(forecastData)
        console.log(forcastInfo)

        var today       =new Date();
        var in_a_week   =new Date();
       in_a_week.setDate(today.getDate()+1);
        console.log(today.toLocaleDateString())
        console.log(in_a_week.toLocaleDateString())
      


        }
        // console.log(forcastInfo)
        // console.log(forcastInfo.daily[0].temp.day)
        // console.log(forcastInfo.daily[0].humidity)
        // console.log(forcastInfo.daily[0].weather[0].icon)
     
      
        // createForecastEl(sampleData[0])
        // createForecastEl(sampleData[1])
        // createForecastEl(sampleData[2])
        // createForecastEl(sampleData[3])
        // createForecastEl(sampleData[4])

    

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

    createForecastItemDataElement(forecastData.date, newDiv);
    createForecastItemDataElement(forecastData.temp, newDiv);
    createForecastItemDataElement(forecastData.icon, newDiv);
    createForecastItemDataElement(forecastData.humidity, newDiv);

    $(".forecastcontainer").append(newDiv);
}

let forecastDataD = $("<div>").attr("class", "forecastcontainer");
$(".citydata").append(forecastDataD);

function createForecastItemDataElement(data, forecastItemDiv) {
    let newDiv = $("<div>")
    $(newDiv).append(data);
    $(forecastItemDiv).append(newDiv);
}