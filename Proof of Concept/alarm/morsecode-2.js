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
var dash = 600;
var ledArray = [];
var codeArray = [];

var i, j, k, arrayCounter;

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
  	socket.on('led', function (data) {
  		if(board.isReady) {    
  			led.strobe(data.delay); 
  		}
  	});

  	socket.on('morse', function(data) {
  		//var morsecode = alphabet.find(data.letter);
  		ledArray = [];
  		codeArray = [];
  		var ledCodeArray = [];
  		i = 0;
  		var message = data.letter.toLowerCase();
  		var message = message.split("");

  		for( i = 0; i < message.length; i++ ) {
  			var letter = message[ i ];
  			codeArray.push( alphabet[ letter ] );
  		}

  		for( i = 0; i < codeArray.length; i++ ) {
  			ledCodeArray[ i ] = new Array( ledArray.lenght );
  			k = 0;
  			ledArray = [];
  			ledArray = codeArray[ i ].split("");

  			while( k < ledArray.length ) {
  				if ( ledArray[ k ] == '.' ) {
  					ledCodeArray[ i ][ k ] = dot;
  				}
  				else {
  					ledCodeArray[ i ][ k ] = dash;
  				}
  				k++;	
  			}
  		}

  		var i = 0;
  		var j = 0;
  		var l = 0;
  		var time;
  		var arrayLength = 0;

  		console.log( ledCodeArray );


  		function ledOn () { //  create a loop function
	  		console.log("on");
	  		console.log( i, j );
	  		led.on();
   			setTimeout(function () { //  call a defined setTimeout when the loop is called
      			if (j < ledCodeArray[ i ].length) { //  if the counter < ledArray.length, call the loop function
         			ledOff();             //  ..  again which will trigger another 
      			}                        //  ..  setTimeout()
  			}, ledCodeArray[ i ][ j ])
		}

		function ledOff () { //  create a loop function
	  		console.log("off");
	  		console.log( i, j );
	  		led.off();
   			setTimeout(function () { //  call a defined setTimeout when the loop is called
      			j++;   			
      			if (j < ledCodeArray[ i ].length) { //  if the counter < ledArray.length, call the loop function
         			ledOn();             //  ..  again which will trigger another 
      			}    
      			else {
      				if( i < ledCodeArray.length-1 ) {
	      				i++;
	      				j = 0;
	      				console.log( i, j, ledCodeArray.length);
	      				ledOn();
	      			}
	      			else {
	      				console.log("end");
	      			}
      			}                    //  ..  setTimeout()
  			}, ledCodeArray[ i ][ j ])
		}

		ledOn(); 



















	  	/*function ledOn () { //  create a loop function
	  		console.log("on");
	  		led.on();
   			setTimeout(function () { //  call a defined setTimeout when the loop is called
      			//led.on(); //  your code here  
      			if (l < 1) { //  if the counter < ledArray.length, call the loop function
         			ledOff();             //  ..  again which will trigger another 
      			}                        //  ..  setTimeout()
      		}, time)
   		}

		function ledOff () { //  create a loop function
			console.log("off");
			//led.off();
   			setTimeout(function () { //  call a defined setTimeout when the loop is called
      			//led.off(); //  your code here   
      			l++;   			
      			if (l < 1) { //  if the counter < ledArray.length, call the loop function
         			ledOn();             //  ..  again which will trigger another 
      			}                     //  ..  setTimeout()
      			else {
      				j++;
      				getTime( i, j );
      			}
      		}, time)
      	}

      	function getTime( indexI, indexJ ) {
      		if ( arraylength < CodeArray[ indexI ].length ) {
	      		time = ledCodeArray[ indexI ][ indexJ ];
	      		console.log(time);
	      		console.log(l);
	      		l = 0;
      		}
      		else {
      			i++

      		}
      	}

      	getTime( i, j );*/
    });
});