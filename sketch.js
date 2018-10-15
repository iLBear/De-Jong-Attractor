var Vec2 = function(x, y) {
	this.x = x;
	this.y = y;
};

var win_w = 500;
var win_h = 500;
var gui_h = 100;

var pos = new Vec2(0.0, 0.0);
var prev_pos = new Vec2(0.0, 0.0);

var param = {
	a: -2.78,
	b: -2.79,
	c: -0.85,
	d: 2.79
	// a: 0.876516856696007, 
	// b: -2.54053425359419, 
	// c: 2.77398819840079, 
	// d: -1.74025543774336 
	// a: 2.57259992316601,
	// b: -1.42254655924675,
	// c: 2.43240554290837,
	// d: -1.45852401048238
};

var sa, sb, sc, cd;

function initGUI(){
	var range = [-3.0, 3.0];
	
	sa = createSlider(range[0], range[1], param.a, 0);
	sb = createSlider(range[0], range[1], param.b, 0);
	sc = createSlider(range[0], range[1], param.c, 0);
	sd = createSlider(range[0], range[1], param.d, 0);
	
	sa.position(win_w * 0.2 - 20, win_h+3);
	sb.position(win_w * 0.2 - 20, win_h+26);
	sc.position(win_w * 0.2 - 20, win_h+49);
	sd.position(win_w * 0.2 - 20, win_h+72);

	var w = win_w * 0.8;
	sa.style('width', w+'px');
	sb.style('width', w+'px');
	sc.style('width', w+'px');
	sd.style('width', w+'px');
}

function randomizeParam() {
	param.a = random(-3.0, 3.0);
	param.b = random(-3.0, 3.0);
	param.c = random(-3.0, 3.0);
	param.d = random(-3.0, 3.0);
	// console.log(param.a, param.b, param.c, param.d);
	sa.value(param.a);
	sb.value(param.b);
	sc.value(param.c);
	sd.value(param.d);  
}

function getParam(){
	param.a = sa.value();
	param.b = sb.value();
	param.c = sc.value();
	param.d = sd.value();
}

function drawPoint(){
	fill(200);
	for(var n = 0; n < 1000; n++){ // noprotect  
		pos.x = sin(param.a * prev_pos.y) - cos(param.b * prev_pos.x);
		pos.y = sin(param.c * prev_pos.x) - cos(param.d * prev_pos.y);
		prev_pos = JSON.parse(JSON.stringify(pos));
	  // stroke(map(pos.x, -2, 2, 0, 20), map(pos.y, -2, 2, 0, 20), 100);
	  // fill(map(pos.x, -2, 2, 0, 100), map(pos.y, -2, 2, 0, 100), 100);
		fill(n%30+30, n%50+50, n%50+50);
		ellipse(map(pos.x, -2.0, 2.0, win_w*0.1, win_w*0.9), map(pos.y, -2.0, 2.0, win_h*0.1, win_h*0.9), 1, 1);
	}
}

function setup() {
	createCanvas(win_w, win_h+gui_h);
	colorMode(HSB, 100);
	background(0);
	// frameRate(15);
	initGUI();
	// noLoop();
	noStroke();
}

function drawSliderValue(){
	fill(40, 10, 90);
	rect(0, win_h, win_w, gui_h);
	push();
		fill(0);
		textSize(14);
		translate(20, win_h+20)
		text(Math.round(sa.value()*10000)/10000, 0, 0);
		text(Math.round(sb.value()*10000)/10000, 0, 23);
		text(Math.round(sc.value()*10000)/10000, 0, 46);
		text(Math.round(sd.value()*10000)/10000, 0, 69);
	pop();
}

function draw() {
	// background(0);
	drawSliderValue();
	getParam();  
	drawPoint();
}

function keyPressed() {
	switch(keyCode){
	  case 32:  //space_key
	    clear();
	    randomizeParam();
	    background(0);
	    draw();
	    break;

	  case 66:  //B key 
	    break;

	  case 71:
	    break;

	  case 80:  //P key
	    console.log("a: "+param.a+",");
	    console.log("b: "+param.b+",");
	    console.log("c: "+param.c+",");
	    console.log("d: "+param.d);
	    break;

	  case 82:  //R key
	    break;
	    
	  default:
	    break;
	}
}