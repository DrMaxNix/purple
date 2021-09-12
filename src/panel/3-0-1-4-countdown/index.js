document.addEventListener("DOMContentLoaded", function(){
	countdown_update();
	window.setInterval(function(){
		countdown_update();
	}, 100);
});

async function countdown_update(){
	/* EXAMPLECODE */
	var now = new Date();
	var goal = new Date(now.getFullYear(), (12 -1), 24, 0, 0);
	
	var difference = goal.getTime() - now.getTime();
	
	var day_raw = Math.floor(difference / (24 * 60 * 60 * 1000));
	var day = (day_raw < 10 ? ("0" + day_raw) : day_raw);
	
	var hour_raw = Math.floor((difference - (day_raw * 24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
	var hour = (hour_raw < 10 ? ("0" + hour_raw) : hour_raw);
	
	var minute_raw = Math.floor((difference - (day_raw * 24 * 60 * 60 * 1000) - (hour_raw * 60 * 60 * 1000)) / (60 * 1000));
	var minute = (minute_raw < 10 ? ("0" + minute_raw) : minute_raw);
	
	var second_raw = Math.floor((difference - (day_raw * 24 * 60 * 60 * 1000) - (hour_raw * 60 * 60 * 1000) - (minute_raw * 60 * 1000)) / 1000);
	var second = (second_raw < 10 ? ("0" + second_raw) : second_raw);
	
	var millis_raw = difference - (day_raw * 24 * 60 * 60 * 1000) - (hour_raw * 60 * 60 * 1000) - (minute_raw * 60 * 1000) - (second_raw * 1000);
	var millis = "0".repeat(3 - millis_raw.toString().length) + millis_raw;
	
	//format countdown-time
	if(difference < 0){
		var time = "Now";
	} else if(day_raw > 0){
		var time = day + "<span class=\"unit\">d</span> " + hour + "<span class=\"unit\">h</span> <span class=\"unit\">" + minute + "m</span>";
	} else if(hour_raw > 0){
		var time = hour + "<span class=\"unit\">h</span> " + minute + "<span class=\"unit\">m</span> <span class=\"unit\">" + second + "s</span>";
	} else {
		var time = minute + "<span class=\"unit\">m</span> " + second + "<span class=\"unit\">s</span>";
	}
	
	
	document.querySelector("#countdown-big .time").innerHTML = time;
}
