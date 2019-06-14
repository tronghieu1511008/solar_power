var socket = io("http://localhost:8080");
// status Control by web from PLC
socket.on('server-send-status-controlByWeb-2',function(data){
  if (data == '1') {
    $('#ledControl_2').css('background','radial-gradient(circle at 100px 100px, green,#97f78c')
  } else {
    $('#ledControl_2').css('background','radial-gradient(circle at 100px 100px, #2e2f30,#babbbc')
  }
});
// status active from PLC
socket.on('server-send-status-active-2',function(data){
  if (data == '1') {
    $('#ledStatus_2').css('background','radial-gradient(circle at 100px 100px, green,#97f78c');
    $("#textMotorStatus_2").html("<span style='color: green'>On</span>");
  } else {
    $('#ledStatus_2').css('background','radial-gradient(circle at 100px 100px, #2e2f30,#babbbc');
    $("#textMotorStatus_2").html("<span>Off</span>");
  }
});
// Faulst inverter from PLC
socket.on('server-send-fault-active-2',function(data){
  if (data == '1') {
    $('#faultStatus_2').css('background','radial-gradient(circle at 100px 100px, red ,#7a3434')
  } else {
    $('#faultStatus_2').css('background','radial-gradient(circle at 100px 100px, #2e2f30,#babbbc')
  }
});
// button Start
$('#btnStart_2').click(function(){
  socket.emit('client-send-data-start/stop-2','1');
});
// button Stop
$('#btnStop_2').click(function(){
  socket.emit('client-send-data-start/stop-2','0');
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
$('#btnSP_2').click(function(){
  socket.emit('client-send-data-setSpeed-2',setSpeed)
  });

//  Speed inverter from Server
socket.on('server-send-speed-data-2',function(data){
  $("#textMotorSpeed_2").html("<span style='color: green'>"+data+"</span>");
});

