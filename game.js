// General setting up the canvas 

var canvas = document.getElementById('canvas'); // Targetting the HTML element 'canvas'
var ctx = canvas.getContext('2d'); // Choosing the perspective. (could also use webGL for 3d)

canvas.width = "800"; // The canvas height and width 
canvas.height = "600";

// -----------------------------------

// Making the sprite (A red square)

var mySprite = {

	x: 200, // x and y dictate the coordinates (200,200)
	y: 200,
	width: 50, // Hight and width of the square (50,50)
	height: 50,
	speed: 200, // The speed of the square (200 pixels per second)
	color: '#c00' 
};

// ------------------------------------

// Checking for keyboard input

var keysDown = {}; // stores which keys are pressed

window.addEventListener('keydown', function(e) { // Event listener for key being pressed down
	keysDown[e.keyCode] = true;
});

window.addEventListener('keyup', function(e) { // Event listener for key being released up
	delete keysDown[e.keyCode];
});  

// ------------------------------------------


// Functions 

function update (mod) { // dictating movement depending on which key is pressed & update coordinates
	
	if (37 in keysDown) { // left
		mySprite.x -= mySprite.speed * mod;
	};


	if (38 in keysDown) { // up 
		mySprite.y -= mySprite.speed * mod;
	};


	if (39 in keysDown) { // right
		mySprite.x += mySprite.speed * mod;
	};
	

	if (40 in keysDown) { // down
		mySprite.y += mySprite.speed * mod;
	};
}

function render () { // Drawing 
	
	ctx.fillStyle = '#000'; // Sets color to black
	ctx.fillRect(0, 0, canvas.width, canvas.height); // draws a rectangle starting from coordinates 0, 0. Sets a hight and width the same as the canvas

	ctx.fillStyle = mySprite.color; // sets color to the one defined in the mySprite variable
	ctx.fillRect(mySprite.x, mySprite.y, mySprite.width, mySprite.height); // draws the sprite on the canvas using the values found in the mySprite variable
}

function run () { // Calls both the update & render functions. Calculate the 'mod' paramater in the update function
	
	update((Date.now() - time) / 1000);
	render();
	time = Date.now();
}

var time = Date.now();
setInterval(run, 10); // Calling the 'run' function every 10 milliseconds 