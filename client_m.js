const sock = new WebSocket('ws://127.0.0.1:5001');

// 接続
sock.addEventListener('open',function(e){
    console.log('Socket 接続成功');
});

// サーバーからデータを受け取る
sock.addEventListener('message',function(e){
    console.log(e.data);
});

document.addEventListener('DOMContentLoaded',function(e){
    // サーバーにデータを送る
    document.getElementById('sample').addEventListener('click',function(e){
        sock.send('hello');
    });
});

$(function () {

  if(navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/)){
    window.addEventListener("deviceorientation", handleOrientation, true);
      if(window.DeviceOrientationEvent){
      　if(DeviceOrientationEvent.requestPermission){
              $(".btn").on("click", function(){
      　　　DeviceOrientationEvent.requestPermission().then(function(response){
      　　　　if(response === "granted"){
      　　　　　$(window).on("deviceorientation", handleOrientation);
      　　　　}
      　　　});
              });
      　}else{
      　　$(window).on("deviceorientation", handleOrientation);
      　}
      }
  }

  $('#data-img').on('change', loadLocalImage);

  $('#testbtn').on('click', function(){
    console.log("クリック");
  });

});

function handleOrientation(evt) {
  var alpha = Math.floor(evt.alpha);
  var beta = Math.floor(evt.beta);
  var gamma = Math.floor(evt.gamma);
  $("#alpha").text(alpha);
  $("#beta").text(beta);
  $("#gamma").text(gamma);
  var msg_gyro = {
    type: "gyro",
    datas: {
      gyroX : gamma,
      gyroY: beta
    },
    date: Date.now()
  };
  socket.send(msg_gyro);
}

function loadLocalImage(evt) {
    var fileData = evt.target.files[0];
    if(!fileData.type.match('image.*')) {
        alert('画像を選択してください');
        return;
    }
    var reader = new FileReader();
    reader.onload = function() {
        socket.emit('data_img', reader.result);
    }
    reader.readAsDataURL(fileData);
}
