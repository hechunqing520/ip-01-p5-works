function setup() {
  createCanvas(380, 570);
  textFont('monospace');
  // 打开页面就先生成一批粒子，避免画面空白；点击鼠标可重新生成
  initParticles();
}

let particles = [];

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = random(width);
    this.y = random(height);
    this.vx = random(-2, 2);
    this.vy = random(-2, 2);
    this.size = random(3, 8);
  }
  update() {
    if (mouseX > width / 2) {
      this.vx += 0.04;
    } else {
      this.vx -= 0.04;
    }
    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
      this.reset();
    }
    this.x += this.vx;
    this.y += this.vy;
  }
  draw() {
    noStroke();
    colorMode(HSB);
    // 颜色采样自静态海报的蓝→红→金渐变：越靠上越蓝，越靠下越金
    let t = constrain(this.y / height, 0, 1);
    let h = t < 0.5 ? lerp(228, 360, t * 2) : lerp(0, 43, (t - 0.5) * 2);
    fill(h, 80, 90, 0.7);
    circle(this.x, this.y, this.size);
    colorMode(RGB);
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < 80; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  background(15, 18, 32, 35);

  // 标题与静态海报同系列
  textFont('Microsoft YaHei');
  textStyle(BOLD);
  fill(255);
  textSize(30);
  textAlign(CENTER);
  text("热爱不息 · 动", width / 2, 62);
  textStyle(NORMAL);
  textFont('monospace');
  textSize(13);
  fill(160,200,255);
  text("SERIES 02 · if / random() / mouseX", width / 2, 96);

  for (let p of particles) {
    p.update();
    p.draw();
  }

  stroke(255, 100);
  line(width/2, 0, width/2, height);
  noStroke();
  fill(255);
  textSize(12);
  text("mouseX: " + nf(mouseX,0,0), width/2, height - 30);
}

function mousePressed() {
  initParticles();
}