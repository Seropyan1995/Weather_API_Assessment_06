var citySearch = $("#city-search");
var submitBtn = $("#submit-button");
var key = "f70fcd8738d0bfa67a0c033bc83aab2d";
var date = dayjs().format('dddd, MMMM D YYYY');
var dateTime = dayjs().format('YYYY-MM-DD HH:MM:SS');
var cities = [];


$(function(){
    defaultLoad();
})

function cityButton() {
    var cityBtn = $('.city');

    cityBtn.on("click", function (event) {
        event.preventDefault()
        city = $(event.target).text()
        getCoordinates(city)
});
}

function cityForm() {
    citySearch.submit(function(event){
        event.preventDefault();
        var city = $('#cityNew').val();
        if(!city){
            return;
        }
    })
    getCoordinates(city);
};

function fetchForecast(lat, lon) {
    fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat +  '&lon=' + lon + '&units=imperial&appid=' + key)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            displayForecast(data);
        })

}

function getCoordinates(city) {

    fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=' + key)
        .then(function(response) {
            return response.json();
        })
        .then(function(data){
            var lat= data[0].lat
            var lon= data[0].lon
            addCity(city);
            getCurrentWeather(lat, lon);
            fetchForecast(lat, lon);
        });
};

function getCurrentWeather(lat, lon) {
    fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat +  '&lon=' + lon + '&units=imperial&appid=' + key)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            displayCurrentWeather(data);
        })
};

function displayCurrentWeather(data) {
    var todayCard = $("#todayCard")
    $(todayCard).empty();

    $('#nameToday').text(data.name)
    $('#todayDate').text(date);

    $('.icons').attr('src', 'https://openweathermap.org/img/w/' + data.weather[0].icon + '.png')

    var tempEl = $('<p>').text('Temperature: ' + data.main.temp + '°F');
    todayCard.append(tempEl);

    var windEl = $('<p>').text('Wind: ' + data.wind.speed + ' MPH');
    todayCard.append(windEl);

    var humEl = $('<p>').text('Humidity: ' + data.main.humidity + '%')
    todayCard.append(humEl);

}

function cityStorage() {
    localStorage.setItem('cities', JSON.stringify(cities));
}

function updateList() {
    cities = JSON.parse(localStorage.getItem('cities'));

    var $cityList = $('#city-list');

    var citiesHtml = "";

    for (var i=0; i < cities.length; i++) {
        citiesHtml += '<row class="row btnRow">';
        citiesHtml += '<button class="btn btn-light btn-outline-secondary city">' + cities[i] + '</button>';
        citiesHtml += '</row>';
    }
    $cityList.html(citiesHtml);
    cityButton();
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
        // creating cards on the screen
        for (let i = 0; i < 5; i++) {

			var divElCard = $('<div>');
			divElCard.attr('class', 'card  bg-light mb-3 cardOne');
			divElCard.attr('style', 'max-width: 215px;');
			weekForecastEl.append(divElCard);

			var divElHeader = $('<div>');
			divElHeader.attr('class', 'card-header')
			var dayFormat = dayjs(`${forecast[i].date}`).format('MM-DD-YYYY');
			divElHeader.text(dayFormat);
			divElCard.append(divElHeader)

			var divElBody = $('<div>');
			divElBody.attr('class', 'card-body');
			divElCard.append(divElBody);

			var divElIcon = $('<img>');
			divElIcon.attr('class', 'icons');
			divElIcon.attr('src', `https://openweathermap.org/img/wn/${forecast[i].icon}@2x.png`);
			divElBody.append(divElIcon);


			var pElTemp = $('<p>').text('Temperature: ' + forecast[i].temp + ' °F');
			divElBody.append(pElTemp);


			var pElHumid = $('<p>').text('Humidity: ' + forecast[i].humidity + ' %');
			divElBody.append(pElHumid);

            var pwindEl = $('<p>').text('Wind: ' +  forecast[i].wind + ' MPH');
            divElBody.append(pwindEl);
}};

function addCity (city) {
    var cityIndex = cities.indexOf(city);
    if (cityIndex !== -1) {
        cities.splice(cityIndex, 1);
    }
    cities.unshift(city)
    cityStorage();
    updateList();

    $('#cityNew').val("");
}

function defaultLoad(city) {
    var citiesStored = JSON.parse(localStorage.getItem('cities'));

    if (citiesStored === null) {
        var city= "New York";

            var cities = {
                city: city
            }
            getCoordinates(city);
            cityForm();

    } else if (citiesStored !== null) {
		var cities = citiesStored

        for (var i=0; i < cities.length; i++) {

    if (!cities) {
        cities = [];
        return;
    };

    getCoordinates(cities[0]);
    updateList(cities[i]);
    cityForm();
    }
    }
};
