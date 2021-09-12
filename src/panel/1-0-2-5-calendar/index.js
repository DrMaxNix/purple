let event_list = [
	[
		[],
		[{"name": "Repeating event", "icon": "alarm", "color": 1}],
		[],
		[],
		[{"name": "Kai's birthday", "icon": "gift", "color": 6}],
		[],
		[]
	],[
		[],
		[],
		[],
		[],
		[{"name": "Sports club", "icon": "ball-american-football", "color": 0}],
		[],
		[{"name": "Noah's birthday", "icon": "gift", "color": 6}]
	],[
		[],
		[{"name": "Repeating event", "icon": "alarm", "color": 1}],
		[],
		[],
		[{"name": "English-test", "icon": "school", "color": 3}, {"name": "Barbecue evening", "icon": "meat", "color": 5}],
		[],
		[]
	],[
		[{"name": "Pool", "icon": "scuba-mask", "color": 0}],
		[{"name": "Kat's birthday", "icon": "gift", "color": 6}],
		[],
		[],
		[],
		[{"name": "Bowling evening", "icon": "ball-bowling", "color": 0}],
		[]
	],[
		[],
		[{"name": "Repeating event", "icon": "alarm", "color": 1}],
		[],
		[{"name": "Doctor's appointment", "icon": "stethoscope", "color": 2}],
		[],
		[],
		[]
	]
];

document.addEventListener("DOMContentLoaded", function(){
	// REDRAW CALENDAR //
	calendar_update();
	window.setInterval(function(){
		calendar_update();
	}, 1000);
});

async function calendar_update(){
	// GET OBJECT OF CURRENT DATE //
	var now = new Date();
	
	
	// GET WEEKS TO LOAD //
	//get current week's unix
	var weekday = now.getDay();
	var weekday = (weekday == 0 ? 6 : (weekday - 1));
	var reference_week_unix = new Date(Date.UTC(now.getFullYear(), now.getMonth(), (now.getDate() - weekday))).getTime() / 1000;
	
	//get current day's unix
	var reference_day_unix = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())).getTime() / 1000;
	
	
	// STORE MONTH NAMES FOR LATER //
	let month_name = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	
	
	// GENERATE CALENDAR //
	//reset month-html-buffer and start with weekday-header
	var month_html = "<tr><td></td><td class=\"weekday\"><span>Mon</span></td><td class=\"weekday\"><span>Tue</span></td><td class=\"weekday\"><span>Wed</span></td><td class=\"weekday\"><span>Thu</span></td><td class=\"weekday\"><span>Fri</span></td><td class=\"weekday\"><span>Sat</span></td><td class=\"weekday\"><span>Sun</span></td></tr>";
	
	//reset timeline-html-buffer
	var timeline_html = "";
	
	//add weeks
	for(var q = -1; q <= 3; q++){
		//get this week's unix
		var this_week_unix = reference_week_unix + (q * (7 * 24 * 60 * 60));
		
		//open this week's tr
		month_html += "<tr>";
		
		//add week-number
		var weeknum = new Date(this_week_unix * 1000).getWeekNumber();
		month_html += "<td class=\"weeknum\"><span>W" + weeknum + "</span></td>";
		
		//add days
		for(var w = 0; w <= 6; w++){
			//get this day's unix
			var this_day_unix = this_week_unix + (w * (24 * 60 * 60));
			var this_day_date = new Date(this_day_unix * 1000);
			
			//get if pastday, today, day and month
			var pastday = (this_day_unix < reference_day_unix);
			var today = (this_day_unix == reference_day_unix);
			var day = this_day_date.getDate();
			var month = this_day_date.getMonth();
			
			//maybe append zeroes
			var day_string = (day < 10 ? "0" : "") + day;
			var month_string = (month < 10 ? "0" : "") + month;
			
			//open day
			month_html += "<td class=\"day" + (pastday ? " pastday" : "") + (today ? " today" : "") + "\"><span class=\"daynum\">" + day_string + "</span><div class=\"circles\">";
			
			
			// ADD EVENTS | WARNING: INEFFICIENT BUT TIMEZONES SUCK //
			//get events for this day
			var events_today = event_list[(q + 1)][w]; //<-- load your own events here
			
			//add to calendar
			for(var e = 0; e < events_today.length; e++){
				var this_event = events_today[e];
				
				let all_colors = ["blue", "green", "orange", "purple", "cyan", "yellow", "red"];
				var color = all_colors[this_event.color];
				var icon = this_event.icon;
				var name = this_event.name;
				
				//add to month
				month_html += "<div class=\"circle\" style=\"background-color: var(--color-" + color + ");\"></div>";
				
				//add to timeline
				timeline_html += "<tr class=\"" + (e != (events_today.length - 1) ? " not-last" : "") + (pastday ? " pastday" : "") + (today ? " today" : "") + "\">" + (e == 0 ? "<td class=\"date\"><span>" + (today ? "Today" : (day + " " + month_name[month])) + "</span></td>" : "<td></td>") + "<td class=\"icon\"><span class=\"ti ti-" + icon + "\" style=\"color: var(--color-" + color + ");\"></span></td><td class=\"name\"><span>" + name + "</span></td></tr>";
			}
			
			
			//close day
			month_html += "</div></td>";
		}
		
		//close this week's tr
		month_html += "</tr>";
	}
	
	
	//set html values
	document.getElementById("calendar-month").innerHTML = month_html;
	document.getElementById("calendar-timeline").innerHTML = timeline_html;
}
























/* https://stackoverflow.com/questions/6117814/get-week-of-year-in-javascript-like-in-php */
Date.prototype.getWeekNumber = function(){
	var d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
	var dayNum = d.getUTCDay() || 7;
	d.setUTCDate(d.getUTCDate() + 4 - dayNum);
	var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
	return Math.ceil((((d - yearStart) / 86400000) + 1)/7)
};
