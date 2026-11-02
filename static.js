// p5.js 静态海报，竖版
function setup() {
  createCanvas(800, 1200);
  // 背景渐变
  let c1 = color(26, 42, 108);
  let c2 = color(178, 31, 31);
  let c3 = color(253, 187, 45);
  for(let y=0;y<height;y++){
    let t = map(y,0,height,0,1);
    let bg = lerpColor(lerpColor(c1,c2,t), c3, t*0.7);
    stroke(bg);
    line(0,y,width,y);
  }
  fill(0,0,0,60);
  rect(0,0,width,height);

  // 标题
  fill(255);
  textFont('Microsoft YaHei');
  textAlign(LEFT, TOP);
  textSize(72);
  textStyle(BOLD);
  text("热爱不息", 60, 80);

  textSize(26);
  textStyle(NORMAL);
  text("STATIC POSTER DEMO", 60, 170);

  // 中间文字
  textAlign(CENTER, CENTER);
  textSize(22);
  text("保持专注 · 奔赴目标\n不惧前路，自有光芒", width/2, height/2);

  // 底部信息
  textAlign(LEFT, BOTTOM);
  textSize(20);
  let lineY = height - 140;
  stroke(255,100);
  line(60, lineY, width-60, lineY);
  noStroke();

  textAlign(RIGHT, BOTTOM);
  text("主题：简约静态海报", width-60, height - 90);
  text("设计：p5.js", width-60, height - 60);

  // 右下角标签
  textAlign(RIGHT, BOTTOM);
  textSize(24);
  let tw = textWidth("静 态 海 报");
  noFill();
  stroke(255);
  rect(width-60-tw-30, height-220, tw+30, 50);
  noStroke();
  fill(255);
  text("静 态 海 报", width-75, height-185);
}

function draw() {
  // 静态海报，不需要循环渲染
  noLoop();
}
