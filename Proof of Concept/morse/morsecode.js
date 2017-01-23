var app = require('http').createServer(handler),
io = require('socket.io').listen(app), 
fs = require('fs'), 
five = require("johnny-five"),
board, led;

var alphabet = {
    'a': '.-',    'b': '-...',  'c': '-.-.', 'd': '-..',
    'e': '.',     'f': '..-.',  'g': '--.',  'h': '....',
    'i': '..',    'j': '.---',  'k': '-.-',  'l': '.-..',
    'm': '--',    'n': '-.',    'o': '---',  'p': '.--.',
    'q': '--.-',  'r': '.-.',   's': '...',  't': '-',
    'u': '..-',   'v': '...-',  'w': '.--',  'x': '-..-',
    'y': '-.--',  'z': '--..',  ' ': '/',
    '1': '.----', '2': '..---', '3': '...--', '4': '....-', 
    '5': '.....', '6': '-....', '7': '--...', '8': '---..', 
    '9': '----.', '0': '-----', 
}
var dot = 200;
var dash = dot * 3;
var ledArray = [];
var i;

/*var sequence = [{
	method: "on",
	duration: ledArray[ i ]
}, {
	method: "off",
	duration: ledArray[ i ]
}];*/

board = new five.Board({port: "COM6"});


board.on("ready", function() {

	led = new five.Led(13);

	this.repl.inject({
    	led: led
  	});

});	

//webserver luistert op poort 80
app.listen(80);

function handler (req, res) {
	fs.readFile(__dirname + '/index.html',
		function (err, data) {
			if (err) {
				res.writeHead(500);
				return res.end('Error loading index.html');
			}

			res.writeHead(200);
			res.end(data);
		}
	);
}


//socket connection
io.sockets.on('connection', function (socket) {
	socket.emit('news', { hello: 'world' });
  
  	// if led message received
  	/*socket.on('led', function (data) {
  		if(board.isReady) {    
  			led.strobe(data.delay); 
  		}
  	});*/

  	socket.on('morse', function(data) {
  		//var morsecode = alphabet.find(data.letter);
  		ledArray = [];
  		i = 0;
  		var message = data.letter;
  		var message = message.toLowerCase();

  		var code = alphabet[message];
  		var codeArray = code.split("");
  		console.log(codeArray);

  		while( i < codeArray.length ) {
  			if ( codeArray[ i ] == '.' ) {
  				ledArray[ i ] = dot;
  			}
  			else {
  				ledArray[ i ] = dash;
  			}

  			i++;	
  		}

	  	i = 0;

	  	function ledOn () { //  create a loop function
	  		console.log("on");
	  		console.log( ledArray[ i ] );
	  		led.on();
   			setTimeout(function () { //  call a defined setTimeout when the loop is called
      			//led.on(); //  your code here  
      			if (i < ledArray.length) { //  if the counter < ledArray.length, call the loop function
         			ledOff();             //  ..  again which will trigger another 
      			}                        //  ..  setTimeout()
  			}, ledArray[ i ])
		}

		function ledOff () { //  create a loop function
	  		console.log("off");
	  		console.log( ledArray[ i ] );
	  		led.off();
   			setTimeout(function () { //  call a defined setTimeout when the loop is called
      			//led.off(); //  your code here   
      			i++;   			
      			if (i < ledArray.length) { //  if the counter < ledArray.length, call the loop function
         			ledOn();             //  ..  again which will trigger another 
      			}                        //  ..  setTimeout()
  			}, ledArray[ i ])
		}

		ledOn(); 
  	});
});