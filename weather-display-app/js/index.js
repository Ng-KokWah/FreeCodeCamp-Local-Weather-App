var url = 'https://fcc-weather-api.glitch.me/api/current?';
var lat, lon;
var degreesC;
var maxDegreesC, minDegreesC;
var faren;
var maxFaren, minFaren;
var desc;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
    
}

function showPosition(position) {
  lat = "lat=" + position.coords.latitude;
  lon = "lon=" + position.coords.longitude;
  $.getJSON(url + lat + "&" + lon, function(data) {
    document.getElementById("icon").src = JSON.stringify(data.weather[0].icon).replace(/['"]+/g, '');
    document.getElementById("temp").innerHTML = "Temp: "+JSON.stringify(data.main.temp) + " &#8451;";
    degreesC = JSON.stringify(data.main.temp);
    document.getElementById("maxmin").innerHTML = "Max Temp: "+JSON.stringify(data.main.temp_max)  + " &#8451; Min Temp: "+ JSON.stringify(data.main.temp_min)+ " &#8451;";
   maxDegreesC = JSON.stringify(data.main.temp_max);
    minDegreesC = JSON.stringify(data.main.temp_min);
   document.getElementById("location").innerHTML = "<br>Location: <br>" + JSON.stringify(data.sys.country).replace(/['"]+/g, '') + "<br>"+  JSON.stringify(data.name).replace(/['"]+/g, '');  
    document.getElementById("desc").innerHTML = "<br> Description: <br><br>" + JSON.stringify(data.weather[0].description).replace(/['"]+/g, '');
    desc = JSON.stringify(data.weather[0].description).replace(/['"]+/g, '');
    document.getElementById("windspeed").innerHTML = "<br>Wind Speed:<br><br>"+JSON.stringify(data.wind.speed) + " Knots";
    
    document.getElementById("degree").checked = true;
    
    if(desc.includes("clouds")) {
      document.body.style.backgroundImage = "url('https://wallpapercave.com/wp/3d4rQec.jpg')";
      document.body.style.color = "black";
    }
    else if(desc.includes("rain")) {
      document.body.style.backgroundImage = "url('https://wallpapercave.com/wp/wg4qgvh.jpg')";
      document.body.style.color = "black";
    }
    else {
      document.body.style.backgroundImage = "url('https://wallpapercave.com/wp/oWfnrb6.jpg')";
      document.body.style.color = "black";
    }
  });
}

function todegrees() {
  document.getElementById("degree").checked = true;
  document.getElementById("faren").checked = false;
   document.getElementById("temp").innerHTML = "Temp: "+degreesC + " &#8451;";
   document.getElementById("maxmin").innerHTML = "Max Temp: "+maxDegreesC + " &#8451; Min Temp: "+ minDegreesC+ " &#8451;";
}

function tofaren() {
  document.getElementById("faren").checked = true;
  document.getElementById("degree").checked = false;
  faren = Math.round(degreesC) * 9 / 5 + 32;
  maxFaren = Math.round(maxDegreesC) * 9 / 5 + 32;
  minFaren = Math.round(minDegreesC) * 9 / 5 + 32;
  document.getElementById("temp").innerHTML = "Temp: "+ faren + " &#8457;";
  document.getElementById("maxmin").innerHTML = "Max Temp: "+maxFaren + " &#8451; Min Temp: "+ minFaren+ " &#8451;";
}