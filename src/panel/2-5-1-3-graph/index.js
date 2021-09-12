var graph_chart_netspeed;
var graph_chart_throughput;

var graph_netspeed_config = {
	type: 'line',
	data: {
		labels: ["14:50", "15:00", "15:10", "15:20", "15:30", "15:40", "15:50", "16:00", "16:10", "16:20"],
		datasets: [{
			loadFrom: 'down',
			label: 'IN / Download',
			backgroundColor: '#e5c07b',
			borderColor: '#e5c07b',
			data: [45, 39, 42, 43, 42, 46, 44, 40, 41, 45],
			fill: false,
			borderWidth: 1
		},{
			loadFrom: 'up',
			label: 'OUT / Upload',
			fill: false,
			backgroundColor: '#e06c75',
			borderColor: '#e06c75',
			data: [9, 7, 8, 8, 7, 11, 10, 11, 14, 13, 10],
			fill: false,
			borderWidth: 1
		},{
			loadFrom: 'ping',
			label: 'Ping',
			backgroundColor: '#98c379',
			borderColor: '#98c379',
			data: [15, 20, 19, 18, 19, 14, 15, 14, 11, 15],
			fill: false,
			borderWidth: 1
		}]
	},
	options: {
		normalized: true,
		spanGaps: true,
		animation: false,
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			x: {
				display: true,
				ticks: {
					font: {
						size: 7
					},
					color: '#FFF',
					padding: 5
				},
				grid: {
					color: 'rgba(255, 255, 255, 0.5)',
					lineWidth: 0.25,
					drawTicks: false
				}
			},
			y: {
				position: 'right',
				display: true,
				ticks: {
					font: {
						size: 7
					},
					color: '#FFF',
					padding: 5
				},
				grid: {
					color: 'rgba(255, 255, 255, 0.5)',
					lineWidth: 0.25,
					drawTicks: false
				},
				min: 0,
				max: 60
			}
		},
		plugins: {
			legend: {
				display: true,
				labels: {
					font: {
						size: 7
					},
					boxWidth: 20,
					color: '#FFF'
				}
			}
		},
		elements: {
			point: {
				radius: function(context){
					//make latest datapoints have a dot
					if(context.index == context.dataset.data.length - 1){
						return 2;
					} else {
						return 0;
					}
				}
			}
		}
	}
};

var graph_throughput_config = {
	type: 'line',
	data: {
		labels: ["14:50", "15:00", "15:10", "15:20", "15:30", "15:40", "15:50", "16:00", "16:10", "16:20"],
		datasets: [
			{
				loadFrom: 'in',
				label: 'IN / Download',
				yAxisID: 'in',
				backgroundColor: '#e5c07b',
				borderColor: '#e5c07b',
				data: [2, 5, 43, 13, 7, 4, 3, 2, 6, 3],
				fill: false,
				borderWidth: 1,
				yAxisID: "y_in"
			},{
				loadFrom: 'out',
				label: 'OUT / Upload',
				yAxisID: 'out',
				backgroundColor: '#e06c75',
				borderColor: '#e06c75',
				data: [1, 2, 6, 4, 7, 12, 11, 5, 3, 2],
				fill: false,
				borderWidth: 1,
				yAxisID: "y_out"
			}
		]
	},
	options: {
		normalized: true,
		spanGaps: true,
		animation: false,
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			x: {
				display: true,
				ticks: {
					font: {
						size: 7
					},
					color: '#FFF',
					padding: 5
				},
				grid: {
					color: 'rgba(255, 255, 255, 0.5)',
					lineWidth: 0.25,
					drawTicks: false
				}
			},
			y_in: {
				type: 'linear',
				position: 'right',
				display: true,
				ticks: {
					font: {
						size: 7
					},
					color: '#FFF',
					padding: 5
				},
				grid: {
					color: 'rgba(255, 255, 255, 0.5)',
					lineWidth: 0.25,
					drawTicks: false
				},
				min: 0,
				max: 60,
				stack: 'throughput'
			},
			y_out: {
				type: 'linear',
				position: 'right',
				display: true,
				ticks: {
					callback: function(value, index, values){
						//hide biggest tick (cause it is at the same place as the first tick of upper chart)
						if(index == values.length - 1){
							return null;
						}
						
						return value;
					},
					font: {
						size: 7
					},
					color: '#FFF',
					padding: 5
				},
				grid: {
					color: 'rgba(255, 255, 255, 0.5)',
					lineWidth: 0.25,
					drawTicks: false
				},
				min: 0,
				max: 60,
				stack: 'throughput'
			}
		},
		plugins: {
			legend: {
				display: false
			}
		},
		elements: {
			point: {
				radius: function(context){
					//make latest datapoints have a dot
					if(context.index == context.dataset.data.length - 1){
						return 2;
					} else {
						return 0;
					}
				}
			}
		}
	}
};



document.addEventListener("DOMContentLoaded", function(){
	// INITIALIZE CHARTS //
	graph_chart_netspeed = new Chart(document.getElementById("graph_netspeed").getContext('2d'), graph_netspeed_config);
	graph_chart_throughput = new Chart(document.getElementById("graph_throughput").getContext('2d'), graph_throughput_config);
});
