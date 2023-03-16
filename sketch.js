let nMtn = 5;
let landscape = [];
let rdmSeed = 13847;
let widthController;
let heightController;
let saveButton;

function setup() {
  createCanvas(300, 300);
  frameRate(10);
  noStroke(255);

  widthController = select('#canvasWidth');
  widthController.input(updateCanvasSize);
  heightController = select('#canvasHeight');
  heightController.input(updateCanvasSize);
  saveButton = select('#saveButton');
  saveButton.mouseReleased(saveMyCanvas);

  for (let i = nMtn; i > 2; i--) {
    landscape.push(new Mountain((height * 5) / i));
  }
}

function draw() {
  let clr1 = select('#color-1');

  background(clr1.value());
  randomSeed(rdmSeed);
  noiseSeed(rdmSeed);

  for (let i = 0; i < landscape.length; i++) {
    let m = landscape[i];
    m.display();
    m.update();
  }

  fill(255);
  text('@interactuate', 20, height - 20);

  let shapeUpdater = select('#shapeUpdater');
  shapeUpdater.mouseClicked(updateShape);

  // noLoop();
}

function updateCanvasSize() {
  let cWidth = select('#canvasWidth').value();
  let cHeight = select('#canvasHeight').value();
  resizeCanvas(cWidth, cHeight);
}

function updateShape() {
  rdmSeed++;
}

class Mountain {
  constructor(mtnHeight) {
    this.h = mtnHeight;
    this.c = 100;
  }

  update() {
    let clr2 = select('#color-2');
    let clr3 = select('#color-3');
    let clr4 = select('#color-4');

    for (let i = 0; i < landscape.length; i++) {
      landscape[0].c = clr2.value();
      landscape[1].c = clr3.value();
      landscape[2].c = clr4.value();
    }
  }

  display() {
    fill(this.c);
    let detail = select('#detail').value();

    beginShape();
    vertex(-100, random(height))
    for (let i = -100; i < width + 100; i += width / detail) {
      let x = i;
      let y = height / 2;
      let offx = x + random(-30, 30);
      let offy = (y + this.h/1.5) * noise(x, this.h);
      curveVertex(offx, offy);
    }
    vertex(width + 100, random(height));
    vertex(width, height);
    vertex(0, height);
    endShape(CLOSE);
  }
}

function saveMyCanvas() {
  let fileN = select('#fileName').value();
  save(fileN + '.png');
}

