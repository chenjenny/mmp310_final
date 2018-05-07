/*
** Document Ready Event (Type All Code in There)
*/
$(document).ready(function() {   
    $(".submit").click(function(){
		        	var city = $(".city").val()
		        	//Make the API Call
		        	$.getJSON("http://api.openweathermap.org/data/2.5/weather?id=5128638&APPID=0db405f4f4c3f54c4a45e42c5a0788a2",
//                    $.getJSON("http://api.openweathermap.org/data/2.5/find?lat=40.7128&lon=74.0060&cnt=50&APPID=0db405f4f4c3f54c4a45e42c5a0788a2",
				{
					units:"imperial"
				},
				function(response){
					console.log(response)
					$(".country").html(response.sys.country)
					$(".temp").html(response.main.temp);
					$(".city-name").html(response.name);
				    $(".weather").html(response.weather[0].description)
				});
	        })
});
