document.addEventListener("DOMContentLoaded", function(){
	// UPDATE TIME & DATE //
	clock_time_date_update();
	window.setInterval(function(){
		clock_time_date_update();
	}, 500);
	
	
	// UPDATE WEATHER //
	clock_weather_update();
	window.setInterval(function(){
		clock_weather_update();
	}, (5 * 60 * 1000));
});

async function clock_time_date_update(){
	// GET OBJECT OF CURRENT DATE //
	var now = new Date();
	
	
	// TIME //
	//get numbers
	var hours = now.getHours();
	var minutes = now.getMinutes();
	
	//maybe append zeroes
	if(hours < 10){
		hours = "0" + hours;
	}
	if(minutes < 10){
		minutes = "0" + minutes;
	}
	
	//format
	var time = hours + ":" + minutes;
	
	//set html value
	document.getElementById("clock-time").textContent = time;
	
	
	// DATE //
	//get numbers
	var weekday = now.getDay();
	var day = now.getDate();
	var month = now.getMonth();
	
	//maybe append zeroes
	if(day < 10){
		day = "0" + day;
	}
	
	//convert from number to name
	let weekday_name = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	let month_name = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	
	var weekday = weekday_name[weekday];
	var month = month_name[month];
	
	//format
	var date = weekday + ", " + day + " " + month;
	
	//set html value
	document.getElementById("clock-date").textContent = date;
}

async function clock_weather_update(){
	/*
		This code is ment to work with the api of openweathermap.org
	*/
	
	// SET WEATHER ICON //
	//lookup-table for icons
	let weather_icon_list = {
		"01d": "sun", "01n": "moon",
		"02d": "cloud", "02n": "cloud",
		"03d": "cloud", "03n": "cloud",
		"04d": "cloud", "04n": "cloud",
		"09d": "cloud-rain", "09n": "cloud-rain",
		"10d": "cloud-rain", "10n": "cloud-rain",
		"11d": "cloud-storm", "11n": "cloud-storm",
		"13d": "cloud-snow", "13n": "cloud-snow",
		"50d": "mist", "50n": "mist"
	};
	
	//load correct icon
	var weather_icon = "10d";
	weather_icon = "ti-" + weather_icon_list[weather_icon];
	
	//set html
	document.getElementById("clock-weather-icon").className = "";
	document.getElementById("clock-weather-icon").classList.add("icon", "ti", weather_icon);
	
	
	// SET WEATHER NAME //
	//get name
	var weather_name = "light rain";
	
	//capitalize first letter of every word
	weather_name = weather_name.replace(/(\b[a-z](?!\s))/g, function(x){ return(x.toUpperCase()); });
	
	//set html
	document.getElementById("clock-weather-value").textContent = weather_name;
	
	
	// SET TEMPERATURE //
	//format
	var temperature = Math.round(23) + " °C";
	
	//set html
	document.getElementById("clock-temperature-value").textContent = temperature;
}
