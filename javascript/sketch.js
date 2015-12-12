var bug;  // Declare object

function setup() {
  createCanvas(400,400);
//  var myCanvas = createCanvas(window.innerWidth, window.innerHeight);
  //myCanvas.parent('content post');
  // Create object
  bug = new Jitter();
}

function draw() {
  //background(50, 89, 100);
  bug.move();
  bug.display();
}

// Jitter class
function Jitter() {
  this.x=width/2;
  this.y=height/2;
  this.tx=0;
  this.ty=10000;
  this.maxStep=10;
  this.diameter=10;

  this.move = function() {
   var stepx = map(noise(this.tx),0,1,-this.maxStep,this.maxStep);
   var stepy = map(noise(this.ty),0,1,-this.maxStep,this.maxStep);
   this.x+=stepx;
   this.y+=stepy;
      if(this.x>width || this.x < 0){
     this.x-=2*stepx;
     this.tx += 10;
   }
   if(this.y>height||this.y<0){
     this.y-=2*stepy;
     this.ty+=10;
   }
       this.tx += .01;
    this.ty += .01;
  };

  this.display = function() {
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
};
s
