// General setting up the canvas 

var canvas = document.getElementById('canvas'); // Targetting the HTML element 'canvas'
var ctx = canvas.getContext('2d'); // Choosing the perspective. (could also use webGL for 3d)

canvas.width = "800"; // The canvas height and width 
canvas.height = "600";

// -----------------------------------

// Making the sprite ()

var mySprite = {

	x: 200, // x and y dictate the coordinates (200,200)
	y: 200,
	width: 64, // Hight and width of pacman (64,64)
	height: 64,
	speed: 200, // The speed of the square (200 pixels per second)
	state: 0
};

// ------------------------------------

// Making the collectable (White dot)

var item = {
	x: Math.random() * canvas.width, // creates random values on the canvas for both x & y values
	y: Math.random() * canvas.height,
	width: 10, 
	height: 10,
	color: '#fff'
};

// -----------------------------------------

// Making Pac-Man! 

var pacmanTiles = {

	loaded: false,
	image: new Image(),
	tileWidth: 64,
	tileHeight: 64
};

pacmanTiles.image.onload = function() { // makes sure the image is drawn AFTER it has loaded
	pacmanTiles.loaded = true;
}

pacmanTiles.image.src = 'pacman.png';

// -----------------------------------------------------------------------

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
		mySprite.state = 2; // dictates which image to draw depending on the direction
		mySprite.x -= mySprite.speed * mod;
	};


	if (38 in keysDown) { // up 
		mySprite.state = 3;
		mySprite.y -= mySprite.speed * mod;
	};


	if (39 in keysDown) { // right
		mySprite.state = 0;
		mySprite.x += mySprite.speed * mod;
	};
	

	if (40 in keysDown) { // down
		mySprite.state = 1;
		mySprite.y += mySprite.speed * mod;
	};

	if ( // collision dection

		mySprite.x < item.x + item.width &&
		mySprite.x + mySprite.width > item.x &&
		mySprite.y < item.y + item.height &&
		mySprite.y + mySprite.height > item.y
		) {

		item.x = Math.random() * canvas.width; // when the sprite collides with the item the item then moves to another random point on the canvas
		item.y = Math.random() * canvas.height;
	}

}


function render () { // Drawing 

	// drawing the background
	ctx.fillStyle = '#000'; // Sets color to black
	ctx.fillRect(0, 0, canvas.width, canvas.height); // draws a rectangle starting from coordinates 0, 0. Sets a hight and width the same as the canvas

	// Drawing the pacman (pacmanTiles)
	if (pacmanTiles.loaded) {
		ctx.drawImage (

			pacmanTiles.image, // image
			mySprite.state * pacmanTiles.tileWidth, //source x (pacman images are one part of one big image, need to determine which section of the image to use)
			0, // source y
			mySprite.width, // tile width 
			mySprite.height, // tile height
			Math.round(mySprite.x), // destination x. Math.round stops the canvas drawing on a decimal point, keeping the image as clear as possible
			Math.round(mySprite.y), // destination y
			mySprite.width, // destination width
			mySprite.height	// destination hight
			);
	}

	//Drawing the collectable (item)
	ctx.fillStyle = item.color; // sets color to the one defined in the item variable
	ctx.fillRect(item.x, item.y, item.width, item.height); // draws the item on the canvas at a random point

}

function run () { // Calls both the update & render functions. Calculate the 'mod' paramater in the update function
	
	update((Date.now() - time) / 1000);
	render();
	time = Date.now();
}

var time = Date.now();
setInterval(run, 10); // Calling the 'run' function every 10 milliseconds 


