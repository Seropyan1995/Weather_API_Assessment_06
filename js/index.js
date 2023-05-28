let citySearch = $("#city-search");
let submitBtn = $("#submit-button");
let key = "f70fcd8738d0bfa67a0c033bc83aab2d";
let date = dayjs().format('dddd, MMMM D YYYY');
let dateTime = dayjs().format('YYYY-MM-DD HH:MM:SS');
var cities = [];
let apiUrl = `api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`

$(function(){

})

function hoistFunctions(){

};

function cityClick() {
    var cityButton = $('.city');

    cityButton.on("click", function (event) {
        event.preventDefault()
        city = $(event.target).text()
});
}

function cityForm() {

    citySearch.submit(function(event){
        event.preventDefault();
        var city = $('#new-city').val();
        console.log('button clicked');
        if(!city){
            console.log('its blank')
            return;
        }
    })

};
// testing fetch lat lon 
function fetchForecast(lat, lon) {
    fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat +  '&lon=' + lon + '&units=imperial&appid=' + key)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            displayForecast(data);
        })

}

function displayCurrentWeather(data) {
    console.log("display current weather works")

    var currentCardBody = $("#current-card-body")
    $(currentCardBody).empty();

    $('#city-name-today').text(data.name)
    $('#card-today-date').text(date);

    $('.icons').attr('src', 'https://openweathermap.org/img/w/' + data.weather[0].icon + '.png')

    var tempEl = $('<p>').text('Temperature: ' + data.main.temp + '°F');
    currentCardBody.append(tempEl);

    var windEl = $('<p>').text('Wind: ' + data.wind.speed + ' MPH');
    currentCardBody.append(windEl);

    var humEl = $('<p>').text('Humidity: ' + data.main.humidity + '%')
    currentCardBody.append(humEl);

}

function cityStorage() {
    console.log("save cities local storage works")

    localStorage.setItem('cities', JSON.stringify(cities));
}

function updateList() {
    console.log("update city list on page works");

    cities = JSON.parse(localStorage.getItem('cities'));

    var $cityList = $('#city-list');

    var citiesHtml = "";

    for (var i=0; i < cities.length; i++) {
        citiesHtml += '<row class="row btnRow">';
        citiesHtml += '<button class="btn btn-light btn-outline-secondary city">' + cities[i] + '</button>';
        citiesHtml += '</row>';
    }
    $cityList.html(citiesHtml);
}

function displayForecast(data) {
     var weekForecastEl = $('#weekForecast');
         weekForecastEl.empty();

    var weekArray = data.list;
		var forecast = [];
		$.each(weekArray, function (index, value) {
			testObj = {
				date: value.dt_txt.split(' ')[0],
				temp: value.main.temp,
				icon: value.weather[0].icon,
				humidity: value.main.humidity,
                wind: value.wind.speed
			}

			if (value.dt_txt.split(' ')[1] === "12:00:00") {
				forecast.push(testObj);
			}
		})

};
