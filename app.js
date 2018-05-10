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
<<<<<<< HEAD
=======
/*
** Document Ready Event (Type All Code in There)
*/
$(document).ready(function() {
    
    $(function(){
        var apiKey = '27659eba6e7ec121ab63b30de42a931a';
        var units = 'imperial';
        var baseUrl = 'http://api.openweathermap.org/data/2.5/weather?APPID=' + apiKey 
//        + units
        ;
        
        $(".submit").click(function(e){
            e.preventDefault();
            
            var cityValue = $('.city').val();
            
            var params = {
                url: baseUrl +'&q=' + cityValue,
                method: 'GET'
            };
            
            $.ajax(params).done(function(response){
                // Show card
                $('.card').removeClass('d-none');
                
                // Error
                $('#city').removeClass('is-invalid');
                $('.invalid-feedback').slideUp();
                $('.card').show();
                
                // Title
                $('.card-title').text(response.name);
                
                // Description 
                $('.description-weather').text(response.weather[0].description);
                
                // Temperature 
                var temp = Math.round(response.main.temp)+ ' F';
                var tempMax = Math.round(response.main.temp) + ' F';
                var tempMin = Math.round(response.main.temp) + ' F'; 
                
                $('.temp-weather').text(temp);
                $('.temp-max-weather').text(tempMax);
                $('.temp-min-weather').text(tempMin);
                
                // Images 
                var image = response.weather[0].icon;
                $('.image-weather').attr('src', 'http://openweathermap.org/img/w/' + image + '.png');
                $('.image-weather').attr('alt', response.name);
            });
//            .fail(function(){
//                $('.invalide-feedback') .slideDown();
//                $('#city') .addClass('is-valid');
//                $('.card').hide();
//                console.error('Error');
//            });
        });
    });
});
>>>>>>> 1ae79c9de5f1033aeddf6cea4d16ed3732ccf02c
