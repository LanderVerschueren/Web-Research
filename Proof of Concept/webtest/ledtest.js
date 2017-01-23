var five = require("johnny-five"),board, led;

board = new five.Board({port: "COM6"});

board.on("ready", function() {
  led = new five.Led(13);
  led.strobe(1000); // on off every second
});


