// p5.js 静态海报：动态海报的"定格版"
// 深色底 + 蓝红金渐变粒子，与 dynamic.js 同一套视觉语言，只是不动
let particles = [];

class Particle {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(5, 16);
    this.alpha = random(0.4, 0.9);
  }
  draw() {
    noStroke();
    colorMode(HSB);
    // 颜色采样自蓝→红→金渐变：越靠上越蓝，越靠下越金（与动态海报一致）
    let t = constrain(this.y / height, 0, 1);
    let h = t < 0.5 ? lerp(228, 360, t * 2) : lerp(0, 43, (t - 0.5) * 2);
    let c = color(h, 80, 90);
    colorMode(RGB);
    // 用 canvas 阴影做柔和发光，贴近动态粒子的光感
    drawingContext.shadowBlur = this.size * 2.4;
    drawingContext.shadowColor = 'rgba(' + red(c) + ',' + green(c) + ',' + blue(c) + ',0.8)';
    fill(red(c), green(c), blue(c), this.alpha * 255);
    circle(this.x, this.y, this.size);
    drawingContext.shadowBlur = 0;
  }
}

function setup() {
  createCanvas(800, 1200);
  background(15, 18, 32);
  textFont('Microsoft YaHei');

  // 用固定随机种子，保证画面可控
  randomSeed(7);

  // 生成粒子并定格
  for (let i = 0; i < 220; i++) {
    particles.push(new Particle());
  }
  // 先画底层小粒子，再画少量大粒子做视觉焦点
  for (let p of particles) p.draw();

  // 少量粒子拖出运动轨迹，暗示"这是动态的定格"
  noFill();
  for (let i = 0; i < 12; i++) {
    let x = random(width);
    let y = random(height * 0.25, height);
    let len = random(40, 120);
    colorMode(HSB);
    let t = constrain(y / height, 0, 1);
    let h = t < 0.5 ? lerp(228, 360, t * 2) : lerp(0, 43, (t - 0.5) * 2);
    stroke(h, 80, 90, 0.25);
    strokeWeight(random(1, 3));
    line(x, y, x - len * 0.4, y - len);
    colorMode(RGB);
  }
  noStroke();

  // 暗角，让视线聚到中间的文字
  let ctx = drawingContext;
  let g = ctx.createRadialGradient(width / 2, height * 0.42, height * 0.22, width / 2, height * 0.42, height * 0.8);
  g.addColorStop(0, 'rgba(0,0,0,0)');
  g.addColorStop(1, 'rgba(0,0,0,0.6)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, width, height);

  // 标题：与动态海报同款式排版
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  fill(255);
  textSize(64);
  text("热爱不息 · 静", width / 2, 96);

  textStyle(NORMAL);
  textFont('monospace');
  textSize(24);
  fill(160, 200, 255);
  text("SERIES 01 · random() / freeze", width / 2, 186);
  textFont('Microsoft YaHei');

  // 中间文字
  textAlign(CENTER, CENTER);
  textSize(26);
  fill(255, 220);
  text("保持专注 · 奔赴目标\n不惧前路，自有光芒", width / 2, height / 2);

  // 底部分隔线与信息
  textAlign(RIGHT, BOTTOM);
  textSize(20);
  stroke(255, 100);
  strokeWeight(1);
  line(60, height - 140, width - 60, height - 140);
  noStroke();
  text("主题：粒子 · 定格", width - 60, height - 90);
  text("设计：p5.js", width - 60, height - 60);

  noLoop();
}

function draw() {
  // 静态海报，一次渲染即定格
  noLoop();
}
