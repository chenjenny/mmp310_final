//source https://openweathermap.org/current
//source https://github.com/erikflowers/weather-icons

window.onload = function () {
	//ip address of user location
	var ipUrl = 
		"https://ipapi.co/json";

		
	//	weather api by city id
	var appid = "appid=e9d1d91a643a5e52993dd817a7469bba";
	//	Finding the location of the ui
	var location = document.getElementById("location");


	//  Display current data
	var currentDate = new Date();
	var dayNight = "day";

	//setting the date
	var dateElem = document.getElementById("date");
	var strDate = currentDate.toString();
	dateElem.innerHTML = strDate.substring(0, strDate.length - 18)

	//calling ipinfo.io/json function
	RequestIp(ipUrl);

	//request to ipinfo.io/json
	function RequestIp(url, callback) {
		var reqIp = new XMLHttpRequest();
		reqIp.open("GET", url, true)
		reqIp.onreadystatechange = function () {
			if (reqIp.readyState == 4 && reqIp.status == 200) {
				var jsonIp = JSON.parse(reqIp.responseText)
				var ip = jsonIp.ip;
				var city = jsonIp.city;
				var country = jsonIp.country;
				//location format
				location.innerHTML = `${city}, ${country}`;
				var lat = jsonIp.loc.split(",")[0];
				var lon = jsonIp.loc.split(",")[1];

				var weatherApi =
					//By geographic coordinates
					//API call:
					//api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}
					//Parameters:
					//lat, lon coordinates of the location of your interest
					//http://openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=b6907d289e10d714a6e88b30761fae22
					`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&${appid}`;
				
			
				// openweathermap api 
				httpReqWeatherAsync(weatherApi);
			}
		}
		reqIp.send();
	}

	//api request
	function httpReqWeatherAsync(url, callback) {
		var httpReqWeather = new XMLHttpRequest();
		httpReqWeather.open("GET", url, true);
		httpReqWeather.onreadystatechange = function () {
			if (httpReqWeather.readyState == 4 && httpReqWeather.status == 200) {
				var jsonWeather = JSON.parse(httpReqWeather.responseText);
				console.log(jsonWeather)
				var weatherDesc = jsonWeather.weather[0].description;
				var id = jsonWeather.weather[0].id;
				var icon = `<i class="wi wi-owm-${id}"></i>`
				var temperature = jsonWeather.main.temp;
				var findTemp = Math.round(1.8 * (temperature - 273) + 32)


				//display data
				var description = document.getElementById("description");
				description.innerHTML = `<i id="icon-desc" class="wi wi-owm-${dayNight}-${id}"></i><p>${weatherDesc}</p>`;
				
				var tempElement = document.getElementById("temperature");
				tempElement.innerHTML = `${findTemp}<i id="icon-thermometer" class="wi wi-thermometer"></i>`;
			}
		}
		httpReqWeather.send();
	}
}
/*
** Document Ready Event (Type All Code in There)
*/
$(document).ready(function() {
    
    $(function(){
        var apiKey = '27659eba6e7ec121ab63b30de42a931a';
        var units = '&units=imperial';
        var baseUrl = 'http://api.openweathermap.org/data/2.5/weather?APPID=' + apiKey + units;
        
        $(".submit").click(function(e){
            e.preventDefault();
            
            var cityValue = $('.city').val();
            
            var params = {
                url: baseUrl +'&q=' + cityValue,
                method: 'GET'
            };
            
            $.ajax(params).done(function(response){
                // Show card
                $('.card').show();
                
                // Title
                $('.card-title').text(response.name);
                
                // Images 
                var image = response.weather[0].icon;
                $('.image-weather').attr('src', 'http://openweathermap.org/img/w/' + image + '.png');
                $('.image-weather').attr('alt', response.name);
                
                // Description 
                $('.description-weather').text(response.weather[0].description);
                
                // Temperature 
                var temp = Math.round(response.main.temp)+ ' °F';
                var tempMax = Math.round(response.main.temp_max) + ' °F';
                var tempMin = Math.round(response.main.temp_min) + ' °F'; 
                
                $('.temp-weather').text(temp);
                $('.temp-max-weather').text(tempMax);
                $('.temp-min-weather').text(tempMin);
                
                // Wind
                var wind = Math.round(response.wind.speed)+ ' MPH';
                $('.wind-speed').text(wind);
                
                // Sunrise and Sunset
                var sunrise = new Date(1000*response.sys.sunrise);
                $('.sys-sunrise').text(sunrise);
                var sunset = new Date(1000*response.sys.sunset);
                $('.sys-sunset').text(sunset);
            });
        });
    });
});
function initMap() {
    // Set Latitude and Longitude
	var algeria = {
		lat: 28.0339,
		lng: 1.6596
	};
    var newYork = {
		lat: 40.730610,
		lng: -73.935242
	};
    var russia = {
		lat: 62.40091936118402,
		lng: 94.64788124999995
	};
    // Connect to HTML to show map
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 2,
		center: algeria
	});
	// Add marker
	var markerOne = new google.maps.Marker({
		position: algeria,
		map: map,
		title: "Algeria"
	});
    var markerTwo = new google.maps.Marker({
		position: newYork,
		map: map,
		title: "New York"
	});
    var markerThree = new google.maps.Marker({
		position: russia,
		map: map,
		title: "Russia"
	});
	// Clicked zoom to position centered
	markerOne.addListener("click", function() {
		map.setZoom(7);
		map.setCenter(markerOne.getPosition());
	});
    markerTwo.addListener("click", function() {
		map.setZoom(7);
		map.setCenter(markerTwo.getPosition());
	});
    markerThree.addListener("click", function() {
		map.setZoom(7);
		map.setCenter(markerThree.getPosition());
	});
	// show lat & lng where clicked on map in console
	map.addListener("click", function(event) {
		console.log(event);
		console.log(event.latLng.lat());
		console.log(event.latLng.lng());
	});
	
}
