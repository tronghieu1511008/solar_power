var socket = io("http://localhost:8080");
// status Control by web from PLC
socket.on('server-send-status-controlByWeb-3',function(data){
  if (data == '1') {
    $('#ledControl_3').css('background','radial-gradient(circle at 100px 100px, green,#97f78c')
  } else {
    $('#ledControl_3').css('background','radial-gradient(circle at 100px 100px, #2e2f30,#babbbc')
  }
});
// status active from PLC
socket.on('server-send-status-active-3',function(data){
  if (data == '1') {
    $('#ledStatus_3').css('background','radial-gradient(circle at 100px 100px, green,#97f78c');
    $("#textMotorStatus_3").html("<span style='color: green'>On</span>");
  } else {
    $('#ledStatus_3').css('background','radial-gradient(circle at 100px 100px, #2e2f30,#babbbc');
    $("#textMotorStatus_3").html("<span>Off</span>");
  }
});
// Faulst inverter from PLC
socket.on('server-send-fault-active-3',function(data){
  if (data == '1') {
    $('#faultStatus_3').css('background','radial-gradient(circle at 100px 100px, red ,#7a3434')
  } else {
    $('#faultStatus_3').css('background','radial-gradient(circle at 100px 100px, #2e2f30,#babbbc')
  }
});
// button Start
$('#btnStart_3').click(function(){
  socket.emit('client-send-data-start/stop-3','1');
});
// button Stop
$('#btnStop_3').click(function(){
  socket.emit('client-send-data-start/stop-3','0');
});


// rangeslider
var setSpeed = '';
var rangeSlider = function(){
    var slider = $('.range-slider'),
        range = $('.range-slider__range'),
        value = $('.range-slider__value');
      
    slider.each(function(){
      value.each(function(){
        var value = $(this).prev().attr('value');
        $(this).html(value);       
      });
      range.on('input', function(){
        $(this).next(value).html(this.value);
        setSpeed = this.value;
      });
    });
  };
  rangeSlider();
//
$('#btnSP_3').click(function(){
  socket.emit('client-send-data-setSpeed-3',setSpeed)
  });

//  Speed inverter from Server
socket.on('server-send-speed-data-3',function(data){
  $("#textMotorSpeed_3").html("<span style='color: green'>"+data+"</span>");
});

