var walkers = []; // Declare object
var moreButton, lessButton, saveButton, resetButton, colorButton;
var totalWalkers = 0;
var colorScheme = 0;

function setup() {
    var width = document.getElementById('content').offsetWidth;
    var myCanvas = createCanvas(width, 600,'NAME');
    myCanvas.parent('myContainer');
    background(50, 89, 100);
    for (i = 0; i < 3; i++) {
        walkers[i] = new Walker((totalWalkers) * 20000);
        totalWalkers += 1;
    }

     moreButton = createButton(' + ', 'asdf');
     moreButton.parent('myContainer2');
    moreButton.mousePressed(more);
    lessButton = createButton(' - ');
    lessButton.parent('myContainer2');
    lessButton.mousePressed(less)
    saveButton = createButton('save');
    saveButton.parent('myContainer2');
    saveButton.mousePressed(saveWithName)
    resetButton = createButton('reset');
    resetButton.parent('myContainer2');
    resetButton.mousePressed(reset);
    colorButton = createButton('colors');
    colorButton.parent('myContainer2');
    colorButton.mousePressed(toggleColors);
}

function more() {
    curLen = walkers.length;
    walkers[curLen] = new Walker(totalWalkers * 20000);
    totalWalkers += 1
}

function less() {
    walkers = walkers.slice(0, walkers.length - 1);
}

function reset() {
    if (mouseX >= 0 && mouseX <= width) {
        background(50, 89, 100);
        for (i = 0; i < walkers < length; i++) {
            walkers[i].x = random() * width;
            walkers[i].y = random() * height;
        }
    }
}

function toggleColors() {
    colorScheme = (colorScheme + 1) % 3;
}

function draw() {
    for (i = 0; i < walkers.length; i++) {
        walkers[i].display();
        walkers[i].move();
    }
    //bug.display();
    //bug.move();
}


// Jitter class
function Walker(t_offset) {
    this.x = 0;
    this.y = 0;
    this.tx = 0 + t_offset;
    this.ty = 10000 + t_offset;
    this.maxStep = 10;
    this.diameter = 10;
    this.offset = t_offset;
    this.move = function () {
        var stepx = map(noise(this.tx), 0, 1, -this.maxStep, this.maxStep);
        var stepy = map(noise(this.ty), 0, 1, -this.maxStep, this.maxStep);
        this.x += stepx;
        this.y += stepy;
        if (this.x > window.width || this.x < 0) {
            this.x -= 2 * stepx;
            this.tx += 10;
        }
        if (this.y > window.height || this.y < 0) {
            this.y -= 2 * stepy;
            this.ty += 10;
        }
        this.tx += .01;
        this.ty += .01;
    };

    this.display = function () {
        if (colorScheme == 0) {
            fill(255);
            stroke(0);
            strokeWeight(2);
        } else if (colorScheme == 1) {
            var Color = map(noise(this.tx + 50000), 0, 1, 0, 255);
            var alpha = map(noise(this.tx + 2500000), 0, 1, 0, 255) - this.tx / 100000;
            noStroke();
            fill(Color, alpha)
        } else if (colorScheme == 2) {
            var r = map(noise(this.tx + 50000), 0, 1, 0, 255);
            var g = map(noise(this.tx + 100000), 0, 1, 0, 255);
            var b = map(noise(this.tx + 1500000), 0, 1, 0, 255);
            var alpha = map(noise(this.tx + 2500000), 0, 1, 0, 255) - this.tx / 100000;
            noStroke();
            fill(r, g, b, alpha)
        }
        ellipse(this.x, this.y, this.diameter, this.diameter);
    }
};

function keyPressed() {
    if (key == ' ') {
        saveWithName();
    }

}

function saveWithName() {
    var today = new Date();
    var min = today.getMinutes();
    var sec = today.getSeconds();
    save('perlinWalker-' + min + ':' + sec + '.png');
}

function windowResized() {
    var width = document.getElementById('content').offsetWidth;
    resizeCanvas(width, height);
    background(50, 89, 100);
    for(i=0;i<walkers.length;i++){
        if(walkers[i].x>width){
            walkers[i].x=0;
        }
    }
}
