let citySearch = $("#city-search");
let submitBtn = $("#submit-button");
let key = "f70fcd8738d0bfa67a0c033bc83aab2d";
let date = dayjs().format('dddd, MMMM D YYYY');
let dateTime = dayjs().format('YYYY-MM-DD HH:MM:SS');
var cities = [];
let apiUrl = `api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`

$(function(){

})


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

function cityStorage() {
    console.log("save cities local storage works")

    localStorage.setItem('cities', JSON.stringify(cities));
}

function previousCityList() {
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
