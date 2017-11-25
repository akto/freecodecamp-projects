/* 
* create a scale from -40 to 50 C
* DONE: create an background image changer to show all kind of weather situations
* DONE: create a wind indicator
* DONE: create a function to change temp value to fahr.
* PROBLEMATIC USAGE FOR HTTPS: create a function to indiate location on world with smallworld.js
* I SHOULD ALERT THE PEOPLE WHO LOOK AT THIS PEN ABOUT CODEPEN MAY BE NOT SHOW PROPERLY THE WEATHER API CONTENT BECAUSE OF HTTPS USAGE
*/

if (location.protocol == 'https:'){
  alert('OpenWeather API not work with https protocol! \nPlease change "https://" part with "http://" in your url!');
}
              
var clientLocationUrl = "https://ipinfo.io";
var clientCity = "london";
function celFah( temp, to ){
  /* When need to use &#8451 kind of notation, use html() instead of text() in jQuery */
  return to === 'cel' ? Math.round(temp)+' &#8451' : Math.round((temp * 9)/5 + 32)+' &#8457';
}


$.getJSON(clientLocationUrl,function(data){
  clientCity = data.city;
  var clientCountry= data.country;
  //console.log(data);
  var clientWeatherAPIURL = "http://api.openweathermap.org/data/2.5/weather?q="+clientCity+"&appid=a68a683ba48bd76e63122c74cd50d66b&units=metric";
  $('#city').text(clientCity+', '+clientCountry);
  
  $.getJSON(clientWeatherAPIURL,function(d){
    var windDir = d.wind.deg;
    var windDirText = 'North';
    if( windDir > 0 && windDir <90 ){ windDirText = 'North East'; }
    else if( windDir === 90){ windDirText = 'East'; }
    else if( windDir > 90 && windDir < 180){ windDirText = 'South East'; }
    else if( windDir === 180){ windDirText = 'South'; }
    else if( windDir > 180 && windDir < 270){ windDirText = 'South West'; }
    else if( windDir === 270){ windDirText = 'West'; }
    else if( windDir > 270 && windDir < 360){ windDirText = 'North West'; }
    //console.log(d);
    var weatherDesc = {
      'Clouds': 1056,
      'Clear':791, //165,884
      'Thunderstorm': 149,
      'Drizzle': 680, //123,115,41
      'Rain': 542,//178,171
      'Snow': 730,//1004,730
      'Atmosphere': 965,//650,651
      'Extreme': 1052,
      'Additional':1064 //1028,645
    };
   
    $('body').css('background',"url(https://unsplash.it/1920/1080?image="+weatherDesc[d.weather[0].main]+")");
    $('#temp').html(celFah(d.main.temp,'cel'));
    $('#weather-icon').html("<img alt='' src='http://openweathermap.org/img/w/"+d.weather[0].icon+".png'>")
    $('.wind-dir-text').html( windDir == undefined ? 'We have no data about wind direction at the moment!': windDir +'&#176, '+windDirText );
    $('.arrow-transform').css('transform',"rotate("+d.wind.deg+"deg)");
   
    $('.temp-changer a').click(function(e){
      var id = $(this).attr('id');
      $(this).addClass('clicked');
      $(this).siblings().removeClass('clicked');
      $('#temp').html(celFah(d.main.temp,id));
      e.preventDefault();
      
    });
    
  });
});