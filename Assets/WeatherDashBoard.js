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

    var forecastUrl = "https://api.openweathermap.org/data/2.5/onecall?" + "lat=" + latInfo + "&lon=" + lonInfo + "&appid=e112c6863270100dda4434fef755e48f";

    $.ajax({
        url: forecastUrl,
        method: "GET"
    }).then(function (forcastInfo) {
        console.log(forcastInfo)
        let sampleData = [
            {date:"Day1",temp:"Day1Temp",weather:"Day1Weather",humidity:"Day1Humidity"},
            {date:"Day2",temp:"Day2Temp",weather:"Day2Weather",humidity:"Day2Humidity"},
            {date:"Day3",temp:"Day3Temp",weather:"Day3Weather",humidity:"Day3Humidity"},
            {date:"Day4",temp:"Day4Temp",weather:"Day4Weather",humidity:"Day4Humidity"},
            {date:"Day5",temp:"Day5Temp",weather:"Day5Weather",humidity:"Day5Humidity"},
        ];
      
        createForecastEl(sampleData[0])
        createForecastEl(sampleData[1])
        createForecastEl(sampleData[2])
        createForecastEl(sampleData[3])
        createForecastEl(sampleData[4])

    

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
    createForecastItemDataElement(forecastData.weather, newDiv);
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