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



var speed = Number();
var preSpeed = Number() ;
var SP = Number();

// nghe tốc độ từ PLC gửi lên Server
socket.on('server-send-speed-data',function(vantoc){
			speed = parseInt(vantoc)
			// console.log('gia tri nhan '+ speed +' ' + typeof(speed)  )
            if(speed != preSpeed){ 
                preSpeed=speed;
            }
		})
// nghe Tốc độ từ Sever gửi xuống PLC
socket.on('server-send-setpoint-speed',function(data){
	SP = parseInt(data)
});
function onRefresh(chart) {
	index=0;
	list_speed=[SP,speed]
	chart.config.data.datasets.forEach(function(dataset) {
		dataset.data.push({
			x: Date.now(),
			y: list_speed[index]
		});
		index++;
	});
}

var color = Chart.helpers.color;
var config = {
	type: 'line',
	data: {
		datasets: [
			{
			label: 'Set Speed',
			backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
			borderColor: chartColors.red,
			fill: false,
			lineTension: 0,
			borderDash: [8, 4],
			data: []
		}, 
		{
			label: 'Actual Speed',
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
		scales: {
			xAxes: [{
				type: 'realtime',
				realtime: {
					duration: 20000,
					refresh: 1000,
					delay: 1000,
					onRefresh: onRefresh
				}
			}],
			yAxes: [{
				scaleLabel: {
					display: true,
					labelString: 'Speed (RPM)'
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
		layout:{
			padding:{
				left: 0,
				right:0,
				top:5,
				down:0,
			}
		},
		// 
	}
};





window.onload = function() {
	var ctx = document.getElementById('myAreaChart').getContext('2d');
	window.myAreaChart = new Chart(ctx, config);
};

// document.getElementById('randomizeData').addEventListener('click', function() {
// 	config.data.datasets.forEach(function(dataset) {
// 		dataset.data.forEach(function(dataObj) {
// 			dataObj.y = randomScalingFactor();
// 		});
// 	});
// 	window.myChart.update();
// });

// var colorNames = Object.keys(chartColors);
// document.getElementById('addDataset').addEventListener('click', function() {
// 	var colorName = colorNames[config.data.datasets.length % colorNames.length];
// 	var newColor = chartColors[colorName];
// 	var newDataset = {
// 		label: 'Dataset ' + (config.data.datasets.length + 1),
// 		backgroundColor: color(newColor).alpha(0.5).rgbString(),
// 		borderColor: newColor,
// 		fill: false,
// 		lineTension: 0,
// 		data: []
// 	};

// 	config.data.datasets.push(newDataset);
// 	window.myChart.update();
// });

// document.getElementById('removeDataset').addEventListener('click', function() {
// 	config.data.datasets.pop();
// 	window.myChart.update();
// });

// document.getElementById('addData').addEventListener('click', function() {
// 	onRefresh(window.myChart);
// 	window.myChart.update();
// });


