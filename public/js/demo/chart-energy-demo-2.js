var socket = io("http://localhost:8080");

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

var power_real_2 = Number();
var prePower_real_2 = Number();
var voltage_real_2 = Number();
var preVoltage_real_2 = Number();
var ampe_real_2 = Number();
var preAmpe_real_2 = Number();
var powerGenerate_real_2 = Number();
var PrePowerGenerate_real_2 = Number();

// received power from SERVER
socket.on('server-send-power-2', function (data) {
	power_real_2 = parseFloat(data)
	if (power_real_2 != prePower_real_2) {
		prePower_real_2 = power_real_2;
	}
})
// received voltage from SERVER
socket.on('server-send-voltage-2', function (data) {
	voltage_real_2 = parseFloat(data)
	if (voltage_real_2 != preVoltage_real_2) {
		preVoltage_real_2 = voltage_real_2;
	}
})
// received ampe from SERVER
socket.on('server-send-ampe-2', function (data) {
	ampe_real_2 = parseFloat(data)
	if (ampe_real_2 != preAmpe_real_2) {
		preAmpe_real_2 = ampe_real_2;
	}
})
// received powerGenerate from SERVER
socket.on('server-send-powerGenerate-2', function (data) {
	powerGenerate_real_2 = parseFloat(data)
	if (powerGenerate_real_2 != PrePowerGenerate_real_2) {
		PrePowerGenerate_real_2 = powerGenerate_real_2;
	}
})
// onRefresh power chart
function onRefresh() {
	config.data.datasets.forEach(function (dataset) {
		dataset.data.push({
			x: Date.now(),
			y: power_real_2
		});
	});
}
// onRefresh voltage chart
function onRefresh1() {
	config1.data.datasets.forEach(function (dataset) {
		dataset.data.push({
			x: Date.now(),
			y: voltage_real_2
		});
	});
}
// onRefresh ampe chart
function onRefresh2() {
	config2.data.datasets.forEach(function (dataset) {
		dataset.data.push({
			x: Date.now(),
			y: ampe_real_2
		});
	});
}
// onRefresh Power Generate chart
function onRefresh3() {
	config3.data.datasets.forEach(function (dataset) {
		dataset.data.push({
			x: Date.now(),
			y: powerGenerate_real_2
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
	var power_2 = document.getElementById('power_2').getContext('2d');
	window.power_2 = new Chart(power_2, config);
	// chart voltage
	var voltage_2 = document.getElementById('voltage_2').getContext('2d');
	window.voltage_2 = new Chart(voltage_2, config1);
	// chart ampe
	var ampe_2 = document.getElementById('ampe_2').getContext('2d');
	window.ampe_2 = new Chart(ampe_2, config2);
	// 
	var powerGenerate_2 = document.getElementById('powerGenerate_2').getContext('2d');
	window.powerGenerate_2 = new Chart(powerGenerate_2, config3);
};




