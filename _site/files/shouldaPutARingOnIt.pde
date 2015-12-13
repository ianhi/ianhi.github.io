

Ring[] rings; // Declare the array
int numRings = 100;
int currentRing = 0; 
boolean rand=false;

void setup() {
  //size(600, 600);
  rings = new Ring[numRings]; // Create the array
  for (int i = 0; i < rings.length; i++) {
    rings[i] = new Ring(); // Create each object
  }
  fullScreen();
}
void draw() {
  background(0);
  for (int i = 0; i < rings.length; i++) {
    rings[i].grow();
    rings[i].display();
  }
}
// Click to create a new Ring
void mousePressed() {
  rings[currentRing].start(mouseX, mouseY);
  currentRing++;
  if (currentRing >= numRings) {
    currentRing = 0;
  }
}
void mouseDragged() { // Move black circle
  mousePressed();
}
void keyPressed() {
  if (key == ' ') {
    background(0);
    for (int i =0;i<rings.length;i++){
      rings[i].on=false;
    }
  } else if (key == 'r'){
    rand = !rand;
  }
}
class Ring {
  float x, y;          // X-coordinate, y-coordinate
  float diameter;      // Diameter of the ring
  boolean on = false;  // Turns the display on and off
  float rate;

  void start(float xpos, float ypos) {
    x = xpos;
    y = ypos; 
    rate = random(1,50);
    diameter = 1;
    on = true;
  }
  
  void grow() {
    if (on == true) {
      if(rand) diameter += 0.5*rate;
      else diameter += 5;
      if (diameter > width+200 && diameter >height+200) {
        on = false;
       diameter = 1;
      }
    }
  }

  void display() {
    if (on == true) {
      noFill();
      strokeWeight(4);
      stroke(204, 153);
      ellipse(x, y, diameter, diameter);
    }
  }
}