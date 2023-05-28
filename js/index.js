let citySearch = $("#city-search");
let submitBtn = $("#submit-button");
// api key
let key = "f70fcd8738d0bfa67a0c033bc83aab2d";

let date = dayjs().format('dddd, MMMM D YYYY');
let dateTime = dayjs().format('YYYY-MM-DD HH:MM:SS');

let apiUrl = `api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`
$(function(){
    citySearchForm();
})

// holds an event listener that listens for the city search form submit
function citySearchForm() {

    citySearch.submit(function(event){
        event.preventDefault();
        var city = $('#new-city').val();
        console.log('button clicked');
        if(!city){
            console.log('its blank')
            return;
        }
    })
    var city = $('#new-city').val();
    
};

document
