var chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)'
};

function randomScalingFactor() {
	return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
}

var socket = io("http://localhost:8080");

var power_real = Number();
var prePower_real = Number();
var voltage_real = Number();
var preVoltage_real = Number();
var ampe_real = Number();
var preAmpe_real = Number();
var powerGenerate_real = Number();
var PrePowerGenerate_real = Number();

// received power from SERVER
socket.on('server-send-power', function (data) {
	power_real = parseFloat(data)
	if (power_real != prePower_real) {
		prePower_real = power_real;
	}
})
// received voltage from SERVER
socket.on('server-send-voltage', function (data) {
	voltage_real = parseFloat(data)
	if (voltage_real != preVoltage_real) {
		preVoltage_real = voltage_real;
	}
})
// received ampe from SERVER
socket.on('server-send-ampe', function (data) {
	ampe_real = parseFloat(data)
	if (ampe_real != preAmpe_real) {
		preAmpe_real = ampe_real;
	}
})
// received powerGenerate from SERVER
socket.on('server-send-powerGenerate', function (data) {
	powerGenerate_real = parseFloat(data)
	if (powerGenerate_real != PrePowerGenerate_real) {
		PrePowerGenerate_real = powerGenerate_real;
	}
})
// onRefresh power chart
function onRefresh() {
	config.data.datasets.forEach(function (dataset) {
		dataset.data.push({
			x: Date.now(),
			y: power_real
		});
	});
}
// onRefresh voltage chart
function onRefresh1() {
	config1.data.datasets.forEach(function (dataset) {
		dataset.data.push({
			x: Date.now(),
			y: voltage_real
		});
	});
}
// onRefresh ampe chart
function onRefresh2() {
	config2.data.datasets.forEach(function (dataset) {
		dataset.data.push({
			x: Date.now(),
			y: ampe_real
		});
	});
}
// onRefresh Power Generate chart
function onRefresh3() {
	config3.data.datasets.forEach(function (dataset) {
		dataset.data.push({
			x: Date.now(),
			y: powerGenerate_real
		});
	});
}
// config Power char
var color = Chart.helpers.color;
var config = {
	type: 'line',
	data: {
		datasets:
			[
				// 	{
				// 	label: 'Set Speed',
				// 	backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
				// 	borderColor: chartColors.red,
				// 	fill: false,
				// 	lineTension: 0,
				// 	borderDash: [8, 4],
				// 	data: []
				// }, 
				{
					label: 'Power',
					backgroundColor: color(chartColors.orange).alpha(0.5).rgbString(),
					borderColor: chartColors.orange,
					fill: false,
					cubicInterpolationMode: 'monotone',
					data: []
				}
			]
	},
	options: {
		// title: {
		// 	display: false,
		// 	text: 'Line chart (Speed Realtime)'
		// },
		legend: {
			display: false,
		},
		scales: {
			xAxes: [{
				type: 'realtime',
				realtime: {
					duration: 15000,
					refresh: 1000,
					delay: 1000,
					onRefresh: onRefresh
				}
			}],
			yAxes: [{
				scaleLabel: {
					display: true,
					labelString: 'W'
				}
			}]
		},
		tooltips: {
			mode: 'nearest',
			intersect: false
		},
		hover: {
			mode: 'nearest',
			intersect: false
		},
		// 
		layout: {
			padding: {
				left: 0,
				right: 0,
				top: 5,
				down: 0,
			}
		},
		// 
	}
};
// Config Voltage chart
var config1 = {
	type: 'line',
	data: {
		datasets:
			[
				// 	{
				// 	label: 'Set Speed',
				// 	backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
				// 	borderColor: chartColors.red,
				// 	fill: false,
				// 	lineTension: 0,
				// 	borderDash: [8, 4],
				// 	data: []
				// }, 
				{
					label: 'Voltage',
					backgroundColor: color(chartColors.yellow).alpha(0.5).rgbString(),
					borderColor: chartColors.yellow,
					fill: false,
					cubicInterpolationMode: 'monotone',
					data: []
				}
			]
	},
	options: {
		// title: {
		// 	display: false,
		// 	text: 'Line chart (Speed Realtime)'
		// },
		legend: {
			display: false,
		},
		scales: {
			xAxes: [{
				type: 'realtime',
				realtime: {
					duration: 15000,
					refresh: 1000,
					delay: 1000,
					onRefresh: onRefresh1
				}
			}],
			yAxes: [{
				scaleLabel: {
					display: true,
					labelString: 'V'
				}
			}]
		},
		tooltips: {
			mode: 'nearest',
			intersect: false
		},
		hover: {
			mode: 'nearest',
			intersect: false
		},
		// 
		layout: {
			padding: {
				left: 0,
				right: 0,
				top: 5,
				down: 0,
			}
		},
		// 
	}
};
// Ampe config Chart
var config2 = {
	type: 'line',
	data: {
		datasets:
			[
				// 	{
				// 	label: 'Set Speed',
				// 	backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
				// 	borderColor: chartColors.red,
				// 	fill: false,
				// 	lineTension: 0,
				// 	borderDash: [8, 4],
				// 	data: []
				// }, 
				{
					label: 'Ampe',
					backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
					borderColor: chartColors.blue,
					fill: false,
					cubicInterpolationMode: 'monotone',
					data: []
				}
			]
	},
	options: {
		// title: {
		// 	display: false,
		// 	text: 'Line chart (Speed Realtime)'
		// },
		legend: {
			display: false,
		},
		scales: {
			xAxes: [{
				type: 'realtime',
				realtime: {
					duration: 15000,
					refresh: 1000,
					delay: 1000,
					onRefresh: onRefresh2
				}
			}],
			yAxes: [{
				scaleLabel: {
					display: true,
					labelString: 'A'
				}
			}]
		},
		tooltips: {
			mode: 'nearest',
			intersect: false
		},
		hover: {
			mode: 'nearest',
			intersect: false
		},
		// 
		layout: {
			padding: {
				left: 0,
				right: 0,
				top: 5,
				down: 0,
			}
		},
		// 
	}
};
//
// 
var config3 = {
	type: 'line',
	data: {
		datasets:
			[
				// 	{
				// 	label: 'Set Speed',
				// 	backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
				// 	borderColor: chartColors.red,
				// 	fill: false,
				// 	lineTension: 0,
				// 	borderDash: [8, 4],
				// 	data: []
				// }, 
				{
					label: 'Power Generate',
					backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
					borderColor: chartColors.blue,
					fill: false,
					cubicInterpolationMode: 'monotone',
					data: []
				}
			]
	},
	options: {
		// title: {
		// 	display: false,
		// 	text: 'Line chart (Speed Realtime)'
		// },
		legend: {
			display: false,
		},
		scales: {
			xAxes: [{
				type: 'realtime',
				realtime: {
					duration: 100000,
					refresh: 1000,
					delay: 1000,
					onRefresh: onRefresh3
				}
			}],
			yAxes: [{
				scaleLabel: {
					display: true,
					labelString: 'W'
				}
			}]
		},
		tooltips: {
			mode: 'nearest',
			intersect: false
		},
		hover: {
			mode: 'nearest',
			intersect: false
		},
		//  
		layout: {
			padding: {
				left: 0,
				right: 0,
				top: 5,
				down: 0,
			}
		},
		// 
	}
}; 
window.onload = function () {
	// chart power
	var power = document.getElementById('power').getContext('2d');
	window.power = new Chart(power, config);
	// chart voltage
	var voltage = document.getElementById('voltage').getContext('2d');
	window.voltage = new Chart(voltage, config1);
	// chart ampe
	var ampe = document.getElementById('ampe').getContext('2d');
	window.ampe = new Chart(ampe, config2);
	// powergenerate
	var powerGenerate = document.getElementById('powerGenerate').getContext('2d');
	window.powerGenerate = new Chart(powerGenerate, config3);
};




