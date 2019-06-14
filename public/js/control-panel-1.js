var socket = io("http://localhost:8080");
// status Control by web from PLC
socket.on('server-send-status-controlByWeb-1',function(data){
  if (data == '1') {
    $('#ledControl_1').css('background','radial-gradient(circle at 100px 100px, green,#97f78c')
  } else {
    $('#ledControl_1').css('background','radial-gradient(circle at 100px 100px, #2e2f30,#babbbc')
  }
});
// status active from PLC
socket.on('server-send-status-active-1',function(data){
  if (data == '1') {
    $('#ledStatus_1').css('background','radial-gradient(circle at 100px 100px, green,#97f78c');
    $("#textMotorStatus_1").html("<span style='color: green'>On</span>");
  } else {
    $('#ledStatus_1').css('background','radial-gradient(circle at 100px 100px, #2e2f30,#babbbc');
    $("#textMotorStatus_1").html("<span>Off</span>");
  }
});
// Faulst inverter from PLC
socket.on('server-send-fault-active-1',function(data){
  if (data == '1') {
    $('#faultStatus_1').css('background','radial-gradient(circle at 100px 100px, red ,#7a3434')
  } else {
    $('#faultStatus_1').css('background','radial-gradient(circle at 100px 100px, #2e2f30,#babbbc')
  }
});
// button Start
$('#btnStart_1').click(function(){
  socket.emit('client-send-data-start/stop-1','1');
});
// button Stop
$('#btnStop_1').click(function(){
  socket.emit('client-send-data-start/stop-1','0');
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
$('#btnSP_1').click(function(){
  socket.emit('client-send-data-setSpeed-1',setSpeed)
  });

//  Speed inverter from Server
socket.on('server-send-speed-data-1',function(data){
  $("#textMotorSpeed_1").html("<span style='color: green'>"+data+"</span>");
});

