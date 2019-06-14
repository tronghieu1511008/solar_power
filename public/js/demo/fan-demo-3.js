var socket = io("http://localhost:8080");
var newFan, fan = $('#fan_3');

  $('#fan_3').hide();
  $('fan-static_3').show()
socket.on('server-send-speed-data-3', function (data) {
  $('#fan_3').show();
  $('#fan-static_3').hide()
  // chon toc do quay
  if (data == 0 || data == null) {
    TweenLite.to(newFan, 1, { timeScale: 0 });
  }else if (data > 0 && data <= 150) {
    TweenLite.to(newFan, 1, { timeScale: 0.1 });
  }else if (data > 150 && data <= 300) {
    TweenLite.to(newFan, 1, { timeScale: 0.2 });
  }else if (data > 300 && data <= 450) {
    TweenLite.to(newFan, 1, { timeScale: 0.3 });
  }else if (data > 450 && data <= 600) {
    TweenLite.to(newFan, 1, { timeScale: 0.4 });
  }else if (data > 600 && data <= 750) {
    TweenLite.to(newFan, 1, { timeScale: 0.5 });
  }else if (data > 750 && data <= 900) {
    TweenLite.to(newFan, 1, { timeScale: 0.6 });
  }else if (data > 900 && data <= 1050) {
    TweenLite.to(newFan, 1, { timeScale: 0.7 });
  }else if (data > 1050 && data <= 1200) {
    TweenLite.to(newFan, 1, { timeScale: 0.8 });
  }else if (data > 1200 && data <= 1350) {
    TweenLite.to(newFan, 1, { timeScale: 0.9 });
  }else {
    TweenLite.to(newFan, 1, { timeScale: 1 });
  }
});

newFan = new TweenMax.to('#fan_3', .3, { rotation: "360" , ease: Linear.easeNone, repeat: -1 }, { timeScale: 0 });
