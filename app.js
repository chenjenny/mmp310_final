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
