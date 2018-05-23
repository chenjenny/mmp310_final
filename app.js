function getDate() {
	var d = new Date();
	var h = d.getHours();
	var m = d.getMinutes();
	var s = d.getSeconds();
	var session = "AM";

	if (h == 0) {
		h = 12;
	}

	if (h > 12) {
		h = h - 12;
		session = "PM";
	}

	h = h < 10 ? "0" + h : h;
	m = m < 10 ? "0" + m : m;
	s = s < 10 ? "0" + s : s;

	var time = h + ":" + m + ":" + s + " " + session;
	document.getElementById("date").innerText = time;
	document.getElementById("date").textContent = time;
	setTimeout(getDate, 1000);
}
getDate();

var date = new Date(),
	year = date.getFullYear(),
	month = date.getMonth(),
	day = date.getUTCDate(),
	days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
	months = ["January", "February", "March", "April", "May", "June", "July", "Augast", "September", "October", "Novamber", "December"];

document.getElementById('daymonth').innerHTML = months[month] + " " + day + " ";
document.getElementById('year').innerHTML = year;

function time() {
	var d = new Date(),
		s = d.getSeconds() * 6,
		m = d.getMinutes() * 6 + (s / 60),
		h = d.getHours() % 12 / 12 * 360 + (m / 12);

	document.getElementById('day').innerHTML = days[d.getDay()] + ", ";
}
time();

/*
 ** Document Ready Event (Type All Code in There)
 */
// Searched country, city, and zipcode
$(document).ready(function () {

	$(function () {
		var apiKey = '27659eba6e7ec121ab63b30de42a931a';
		var units = '&units=imperial';
		var baseUrl = 'http://api.openweathermap.org/data/2.5/weather?APPID=' + apiKey + units;

		$(".zip").click(function () {
			var zipValue = $('.zip').val();
			var round = {
				url: baseUrl + '&zip=' + zipValue,
				method: 'GET'
			};

			$.getJSON(params).done(function (response) {

				// Show card
				$('.weather').show();

				// Title
				$('.weather-title').text(response.name);

				// Images
				var image = response.weather[0].icon;
				$('.image-weather').attr('src', 'http://openweathermap.org/img/w/' + image + '.png');
				$('.image-weather').attr('alt', response.name);

				// Description
				$('.description-weather').text(response.weather[0].description);

				// Temperature
				var temp = Math.round(response.main.temp) + ' °F';
				var tempMax = Math.round(response.main.temp_max) + ' °F';
				var tempMin = Math.round(response.main.temp_min) + ' °F';

				$('.temp-weather').text(temp);
				$('.temp-max-weather').text(tempMax);
				$('.temp-min-weather').text(tempMin);

				// Wind
				var wind = Math.round(response.wind.speed) + ' MPH';
				$('.wind-speed').text(wind);

				// Sunrise and Sunset
				var sunrise = new Date(1000 * response.sys.sunrise);
				$('.sys-sunrise').text(sunrise);
				var sunset = new Date(1000 * response.sys.sunset);
				$('.sys-sunset').text(sunset);
			});

		});

		$(".submit").click(function () {

			var cityValue = $('.city').val();

			var params = {
				url: baseUrl + '&q=' + cityValue,
				method: 'GET'
			};

			// For country/city
			$.ajax(params).done(function (response) {
				// Show card
				$('.weather').show();

				// Title
				$('.weather-title').text(response.name);

				// Images 
				var image = response.weather[0].icon;
				$('.image-weather').attr('src', 'http://openweathermap.org/img/w/' + image + '.png');
				$('.image-weather').attr('alt', response.name);

				// Description 
				$('.description-weather').text(response.weather[0].description);

				// Temperature 
				var temp = Math.round(response.main.temp) + ' °F';
				var tempMax = Math.round(response.main.temp_max) + ' °F';
				var tempMin = Math.round(response.main.temp_min) + ' °F';

				$('.temp-weather').text(temp);
				$('.temp-max-weather').text(tempMax);
				$('.temp-min-weather').text(tempMin);

				// Wind
				var wind = Math.round(response.wind.speed) + ' MPH';
				$('.wind-speed').text(wind);

				// Sunrise and Sunset
				var sunrise = new Date(1000 * response.sys.sunrise);
				$('.sys-sunrise').text(sunrise);
				var sunset = new Date(1000 * response.sys.sunset);
				$('.sys-sunset').text(sunset);
			});

			//For zip code


		});
	});
});

var map;
var geoJSON;
var request;
var gettingData = false;
var openWeatherMapKey = "27659eba6e7ec121ab63b30de42a931a"

function initialize() {
	var mapOptions = {
		zoom: 2,
		center: new google.maps.LatLng(40.730610, -73.935242)
	};
	map = new google.maps.Map(document.getElementById('map-canvas'),
		mapOptions);
	//      var newYork = {
	//		lat: 40.730610,
	//		lng: -73.935242
	//	};
	//      var marker = new google.maps.Marker({
	//		position: newYork,
	//		map: map,
	//		title: "New York"
	//	});
	//      marker.addListener("click", function() {
	//		map.setZoom(7);
	//		map.setCenter(marker.getPosition());
	//	});
	//      var map = new google.maps.Map(document.getElementById('map-canvas'), {
	//		zoom: 2,
	//		center: newYork
	//	});
	// Add interaction listeners to make weather requests
	google.maps.event.addListener(map, 'idle', checkIfDataRequested);
	// Sets up and populates the info window with details
	map.data.addListener('click', function (event) {
		infowindow.setContent(
			"<img src=" + event.feature.getProperty("icon") + ">" +
			"<br /><strong>" + event.feature.getProperty("city") + "</strong>" +
			"<br />" + event.feature.getProperty("temperature") + "&deg;C" +
			"<br />" + event.feature.getProperty("weather")
		);
		infowindow.setOptions({
			position: {
				lat: event.latLng.lat(),
				lng: event.latLng.lng()
			},
			pixelOffset: {
				width: 0,
				height: -15
			}
		});
		infowindow.open(map);
	});
}
var checkIfDataRequested = function () {
	// Stop extra requests being sent
	while (gettingData === true) {
		request.abort();
		gettingData = false;
	}
	getCoords();
};
// Get the coordinates from the Map bounds
var getCoords = function () {
	var bounds = map.getBounds();
	var NE = bounds.getNorthEast();
	var SW = bounds.getSouthWest();
	getWeather(NE.lat(), NE.lng(), SW.lat(), SW.lng());
};
// Make the weather request
var getWeather = function (northLat, eastLng, southLat, westLng) {
	gettingData = true;
	var requestString = "http://api.openweathermap.org/data/2.5/box/city?bbox=" +
		westLng + "," + northLat + "," //left top
		+
		eastLng + "," + southLat + "," //right bottom
		+
		map.getZoom() +
		"&cluster=yes&format=json" +
		"&APPID=" + openWeatherMapKey;
	request = new XMLHttpRequest();
	request.onload = proccessResults;
	request.open("get", requestString, true);
	request.send();
};

// Take the JSON results and proccess them
var proccessResults = function () {
	console.log(this);
	var results = JSON.parse(this.responseText);
	if (results.list.length > 0) {
		resetData();
		for (var i = 0; i < results.list.length; i++) {
			geoJSON.features.push(jsonToGeoJson(results.list[i]));
		}
		drawIcons(geoJSON);
	}
};
var infowindow = new google.maps.InfoWindow();

// For each result that comes back, convert the data to geoJSON
var jsonToGeoJson = function (weatherItem) {
	var feature = {
		type: "Feature",
		properties: {
			city: weatherItem.name,
			weather: weatherItem.weather[0].main,
			temperature: weatherItem.main.temp,
			min: weatherItem.main.temp_min,
			max: weatherItem.main.temp_max,
			humidity: weatherItem.main.humidity,
			pressure: weatherItem.main.pressure,
			windSpeed: weatherItem.wind.speed,
			windDegrees: weatherItem.wind.deg,
			windGust: weatherItem.wind.gust,
			icon: "http://openweathermap.org/img/w/" +
				weatherItem.weather[0].icon + ".png",
			coordinates: [weatherItem.coord.Lon, weatherItem.coord.Lat]
		},
		geometry: {
			type: "Point",
			coordinates: [weatherItem.coord.Lon, weatherItem.coord.Lat]
		}
	};
	// Set the custom marker icon
	map.data.setStyle(function (feature) {
		return {
			icon: {
				url: feature.getProperty('icon'),
				anchor: new google.maps.Point(25, 25)
			}
		};
	});

	// returns object
	return feature;
};

// Add the markers to the map
var drawIcons = function (weather) {
	map.data.addGeoJson(geoJSON);
	// Set the flag to finished
	gettingData = false;
};
// Clear data layer and geoJSON
var resetData = function () {
	geoJSON = {
		type: "FeatureCollection",
		features: []
	};
	map.data.forEach(function (feature) {
		map.data.remove(feature);
	});
};
google.maps.event.addDomListener(window, 'load', initialize);
