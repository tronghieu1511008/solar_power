var socket = io("http://localhost:8080");
// status Control from PLC
socket.on('server-send-status-controlByWeb',function(data){
  if (data == '1') {
    $('#ledControl').css('background','radial-gradient(circle at 100px 100px, green,#97f78c')
  } else {
    $('#ledControl').css('background','radial-gradient(circle at 100px 100px, #2e2f30,#babbbc')
  }
});
// status active from PLC
socket.on('server-send-status-active',function(data){
  if (data == '1') {
    $('#ledStatus').css('background','radial-gradient(circle at 100px 100px, green,#97f78c');
    $("#textMotorStatus").html("<span style='color: green'>On</span>");
  } else {
    $('#ledStatus').css('background','radial-gradient(circle at 100px 100px, #2e2f30,#babbbc');
    $("#textMotorStatus").html("<span>Off</span>");
  }
});
// Faulst inverter from PLC
socket.on('server-send-fault-active',function(data){
  if (data == '1') {
    $('#faultStatus').css('background','radial-gradient(circle at 100px 100px, red ,#7a3434')
  } else {
    $('#faultStatus').css('background','radial-gradient(circle at 100px 100px, #2e2f30,#babbbc')
  }
});
// button Start
$('#btnStart').click(function(){
  socket.emit('client-send-data-start/stop','1');
});
// button Stop
$('#btnStop').click(function(){
  socket.emit('client-send-data-start/stop','0');
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
$('#btnSP').click(function(){
  socket.emit('client-send-data-setSpeed',setSpeed)
  });

//  Speed inverter from Server
socket.on('server-send-speed-data',function(data){
  $("#textMotorSpeed").html("<span style='color: green'>"+data+"</span>");
});

