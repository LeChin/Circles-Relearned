var circleLand = function(){
	//gets canvas element from html, so we can use it
	var canvas;
	var guy;
	
	
	var shapes = [];
	var square;
	
	var randomPosition = function(){
		return 10 + Math.floor(Math.random() * 491);
	};
	
	//this function stores the circle variable and all the elements needed to draw a random circle
	var makeCircle = function(x,y){
		var circle = {
			x: x,
			y: y,
			dx: (Math.random() * 10) - 5, //negative number adds other directions
			dy: (Math.random() * 10) - 5,
			radius: 10 + Math.floor(Math.random() * 10),
			color: "rgb(" + Math.floor(Math.random() * 5)+ "," + Math.floor(Math.random() * 5)+ "," + Math.floor(Math.random() * 255) + ")",					draw: function(){ //moved this from independent function, to part of object.
				guy.fillStyle = this.color;
				guy.beginPath();
				guy.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
				guy.closePath();
				guy.fill();
			},
			move: function(){
				this.x += this.dx;
				this.y += this.dy;
			}
		};
		return circle; //returns the circle variable, need this to see what we've done
	};
	
	
	var makeSquare = function(x,y,w,h){
		var square = {
			x: x,
			y: y,
			w: w,
			h: h,
			theta: 0.0,
			dtheta: Math.random(),
			color: "rgb(" + Math.floor(Math.random() * 255)+ "," + Math.floor(Math.random() * 0) + "," + Math.floor(Math.random() * 255) + ")",
			draw: function(){
				//guy.clearRect(700,900,700,900)
				guy.save();
				guy.translate(this.x, this.y);
				guy.rotate(this.theta);
				guy.fillStyle = this.color;
				guy.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
				guy.restore();
			},
			move: function(){
				this.theta += this.dtheta;
			}
		};
		console.log("square");
		return square;
	};
	
	
	square = makeSquare(randomPosition(), randomPosition(), 50, 50);
	
	var makeAllShapes = function(){
		for (var i = 0; i < 100; i++){	
			shapes.push(makeCircle(230, 220), makeSquare(randomPosition(), randomPosition(), 25, 25));
		}	
	};
	
	var drawAllShapes = function() {
		clear();
		for (var i = 0; i < shapes.length; i++) {
			var shape = shapes[i];
			shape.draw();
		}
	};
	
	var moveAllShapes = function(){
		for (var cc = 0; cc < shapes.length; cc++){
			shapes[cc].move();
		}
	};
	
	var startCircles = function(circle){
		var startMoving = function(){
			moveAllShapes();
			drawAllShapes();
		};
		timerID = setInterval(startMoving, 50);
	};
	
	
	var clear = function() {
		guy.clearRect(0, 0, canvas.width, canvas.height);
		console.log("clearing!");
	};
	
	
	//when the window loads, the functions that are called execute
	var init = function() {
		canvas = document.getElementById('circles');
		guy = canvas.getContext('2d');
		
		makeAllShapes();
		drawAllShapes();
		
		document.getElementById("move").onclick = function(e) {
			moveAllShapes();
			drawAllShapes();
		};
		
		document.getElementById("start").onclick = function(e) {
			startCircles();
		};
		
		document.getElementById("stop").onclick = function(e) {
			clearInterval(timerID);
		};
		
		document.getElementById("reset").onclick = function(e) {
			shapes = []; //clears circles from list
			drawAllShapes(); //clears circles from this function
		};
		
		document.getElementById("circles").onclick = function(e) {
			console.log(e);
			shapes.push(makeCircle(e.layerX, e.layerY)/*, makeSquare(e.layerX, e.layerY, 70, 70)*/); //offsetX/Y doesn't work in Firefox
			
			drawAllShapes();
		};
	
	};
	
	return {
		init: init
	};
}(); 