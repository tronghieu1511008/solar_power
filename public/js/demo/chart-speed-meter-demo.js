var socket = io("http://localhost:8080");
var speed = Number();
var preSpeed = Number();

socket.on('server-send-speed-data', function (vantoc) {
  speed = parseInt(vantoc)
  // console.log('gia tri nhan '+ speed +' ' + typeof(speed)  )
  if (speed != preSpeed) {
    preSpeed = speed;
  }
})
// 
Highcharts.chart('container', {

  chart: {
    type: 'gauge',
    plotBackgroundColor: null,
    plotBackgroundImage: null,
    plotBorderWidth: 0,
    plotShadow: false
  },

  title: {
    text: ''
  },
  // xóa text: Hightcharts.com
  credits: {
    enabled: false
  },
  // xóa chart context menu
  exporting: { enabled: false },
  pane: {
    startAngle: -150,
    endAngle: 150,
    background: [{
      backgroundColor: {
        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
        stops: [
          [0, '#FFF'],
          [1, '#333']
        ]
      },
      borderWidth: 0,
      outerRadius: '109%'
    }, {
      backgroundColor: {
        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
        stops: [
          [0, '#333'],
          [1, '#FFF']
        ]
      },
      borderWidth: 1,
      outerRadius: '107%'
    }, {
      // default background
    }, {
      backgroundColor: '#DDD',
      borderWidth: 0,
      outerRadius: '105%',
      innerRadius: '103%'
    }]
  },

  // the value axis
  yAxis: {
    min: 0,
    max: 1500,

    minorTickInterval: 'auto',
    minorTickWidth: 1,
    minorTickLength: 10,
    minorTickPosition: 'inside',
    minorTickColor: '#666',

    tickPixelInterval: 30,
    tickWidth: 2,
    tickPosition: 'inside',
    tickLength: 10,
    tickColor: '#666',
    labels: {
      step: 2,
      rotation: 'auto'
    },
    title: {
      text: 'RPM'
    },
    plotBands: [{
      from: 0,
      to: 500,
      color: '#55BF3B' // green
    }, {
      from: 500,
      to: 1000,
      color: '#DDDF0D' // yellow
    }, {
      from: 1000,
      to: 1500,
      color: '#DF5353' // red
    }]
  },

  series: [{
    name: 'Speed',
    data: [0],
    tooltip: {
      valueSuffix: ' km/h'
    }
  }]

},

  // Add some life
  function (chart) {
    if (!chart.renderer.forExport) {
      setInterval(function () {
        var point = chart.series[0].points[0],
          newVal,
          inc = speed;
        newVal = inc;
        // if (newVal < 0 || newVal > 200) {
        //   newVal = point.y - inc;
        // }
        point.update(newVal);
      }, 100);
    }
  }
  );