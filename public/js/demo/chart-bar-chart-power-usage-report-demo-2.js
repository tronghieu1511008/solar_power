
// get day/mon/year 
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = mm + '/' + dd + '/' + yyyy;
//
var dateOfmonth;
var dayOf28 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28];
var dayOf29 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29];
var dayOf30 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
var dayOf31 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
// function get mumber day in month
function daysInMonth (month, year) {
  return new Date(year, month, 0).getDate();
}

// Bar Chart
var barChartPowerUsageReport_2 = document.getElementById('barChartPowerUsageReport_2').getContext('2d');
    // Global Options
    // Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 16;
    // Chart.defaults.global.defaultFontColor = '#777';

		$(function() {
      $('#datepicker_powerUsage_2').datepicker( {
          changeMonth: true,
          changeYear: true,
          showButtonPanel: true,
          dateFormat: 'MM yy',
          onClose: function(dateText, inst) { 
              var temp_month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
              var month = parseInt(temp_month)+1 // jan =0 !
              var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
              $(this).datepicker('setDate', new Date(year, temp_month, 1));        
              // 
              $.get('/datepicker_powerUsage_2?month='+month+'&year='+year , function( response ) {
                
                 
                  dateOfmonth=null;
                  switch(daysInMonth (month, year)) {
                    case 28:
                    dateOfmonth = dayOf28;
                      break;
                    case 29:
                    dateOfmonth = dayOf29;
                      break;
                      case 30:
                      dateOfmonth = dayOf30;
                      break;
                    default:
                    dateOfmonth = dayOf31;
                  }
                  cur_data=[]
                  data_fullyear = []
                  data_power = []
                  data_excel = []
                  var thismonth;
                  var thisyear;
                  var monthyear;
                for(var i=0;i<dateOfmonth.length;i++){
                  cur_data.push(0)
                }
                response.forEach(element => {
                  cur_data[parseInt(element.day)-1]= parseInt(element.power) ;
                  data_fullyear[parseInt(element.day) - 1] = (element.fullyear);
                  data_power[parseInt(element.day) - 1] = parseFloat(element.power);
                  thismonth = element.month;
                  thisyear = element.year;
                });
                data_excel.push(data_fullyear, data_power) // get data full year + data power
                monthyear = thismonth + '/' + thisyear
                  var PowerUsageChart_2 = new Chart(barChartPowerUsageReport_2, {
                    type:'bar', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
                    data:{
                      
                      labels:dateOfmonth, // number day in month
                      datasets:[{
                        label:'Power Usage',
                        data:cur_data,
                        //backgroundColor:'green',
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        borderWidth:1,
                        borderColor:'#777',
                        hoverBorderWidth:1,
                        hoverBorderColor:'#000'
                      }]
                    },
                    options:{
                      title:{
                        display:false,
                        text:'',
                        fontSize:25
                      },
                      legend:{
                        display:false,
                        position:'right',
                        labels:{
                          fontColor:'#000'
                        }
                      },
                      layout:{
                        padding:{
                          left:10,
                          right:10,
                          bottom:0,
                          top:30
                        }
                      },
                      tooltips:{
                        enabled:true
                      }
                    }
                  });
                  // Excel
                  var wb = XLSX.utils.book_new();
                  wb.Props = {
                    Title: "Sheet Power Usage",
                    Subject: "Power Usage" + monthyear,
                    Author: "Huynh Trong Hieu",
                    // CreatedDate: new Date(2017,12,19)
                  };
                  wb.SheetNames.push("Power Usage");
                  var ws_data = data_excel;  //data excel
                  var ws = XLSX.utils.aoa_to_sheet(ws_data);
                  wb.Sheets["Power Usage"] = ws;
                  // Exporting Workbook for Download
                  var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
                  function s2ab(s) {
                    var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
                    var view = new Uint8Array(buf);  //create uint8array as viewer
                    for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
                    return buf;
                  }
                  $("#btnExcelPowerUsage_2").click(function () {
          
                    saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), 'PowerUsage_BS0_' + monthyear + '.xlsx');
                  });
                  // 
                });
          }
      });
  });
  