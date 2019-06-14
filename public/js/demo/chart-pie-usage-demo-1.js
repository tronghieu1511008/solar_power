var socket = io("http://localhost:8080");
function randomScalingFactor() {
    return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
}

var powerUsage_1 = Number();
var powerRemain_1 = Number();
// received power usage from sever
socket.on('server-send-power-usage-1', function (data) {
    powerUsage_1 = parseFloat(data)    
})
// received power remain from sever
socket.on('server-send-power-remain-1', function (data1) {
    powerRemain_1 = parseFloat(data1)
})
// chart
Highcharts.chart('pie_usage_1', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
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
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '{point.name}:{point.percentage:.1f} %',
                style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                }
            }
        }
    },
    series: [{
        name: 'Percent',
        colorByPoint: true,
        data: [{
            name: '<b>Usage</b>',
            y: 0,
        }, {
            name: '<b>Remain</b>',
            y: 0
        }]
    }]
},
    // Add some life
    function (chart) {
        if (!chart.renderer.forExport) {
            setInterval(function () {
                // a=Math.round(Math.random() * 100)
                chart.series[0].points[0].update(powerUsage_1);
                chart.series[0].points[1].update(powerRemain_1)
            }, 500);
        }
    }
);