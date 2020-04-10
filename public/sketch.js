let angle = 0;
let bg;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  _text = createGraphics(window.innerWidth - 4, window.innerHeight - 4);
  _text.textFont('Source Code Pro');
  _text.textAlign(CENTER);
  _text.textSize(50);
  _text.fill(0);
  _text.text('welcome to my zone', width * 0.5, height * 0.5);
}

function draw() {
  background(255);
  fill(0, 0, 255);

  normalMaterial();
  translate(-width/4, 0, 0);
  push();
  rotateX(angle * 0.25);
  rotateY(angle * 0.15);
  rotateZ(angle * 0.05);
  torus(50, 7);
  pop();

  translate(-width/6, 0, 0);
  push();
  rotateX(angle * 0.25);
  rotateY(angle * 0.15);
  rotateZ(angle * 0.05);
  box();
  pop();

  translate(width/3,0,0);
  push();
  rotateX(angle * 0.25);
  rotateY(angle * 0.15);
  rotateZ(angle * 0.05);
  cone();
  pop();


  push();
  translate(0, -70, 0);
  rotateY(angle * .1);
  texture(_text);
  plane(window.innerWidth - 4, window.innerHeight - 4);
  pop();


  angle += 0.05;

}