let buttonIntro, buttonQuiz, buttonWebsite, buttonBack, buttonSubmit;
let currentPage = 'main'; // 預設頁面為主選單
let currentQuestion = 0; // 當前題目編號
let score = 0; // 分數
let userAnswer = ''; // 使用者的答案
let questions = []; // 題目陣列
let correctAnswer = ''; // 正確答案
let iframeElement; // 用於存儲 iframe 元素的變數
let seaweed = []; // 用於存儲海草的陣列
let angleOffset = 0; // 用於控制海草擺動的角度偏移
let fishes = []; // 用於存儲魚的陣列
let shrimps = []; // 用於存儲蝦子的陣列

function setup() {
  createCanvas(windowWidth, windowHeight); // 設定畫布大小為視窗大小
  generateSeaweed(); // 生成海草
  generateFishes(); // 生成魚
  generateShrimps(); // 生成蝦子

  // 主選單按鈕
  buttonIntro = createButton('自我介紹');
  buttonIntro.style('font-size', '20px');
  buttonIntro.style('padding', '15px 30px');
  buttonIntro.position(width / 2 - 100, height / 2 - 150);
  buttonIntro.mousePressed(() => (currentPage = 'intro'));

  buttonQuiz = createButton('測驗題目');
  buttonQuiz.style('font-size', '20px');
  buttonQuiz.style('padding', '15px 30px');
  buttonQuiz.position(width / 2 - 100, height / 2 - 50);
  buttonQuiz.mousePressed(startQuiz);

  buttonWebsite = createButton('教科系 系網');
  buttonWebsite.style('font-size', '20px');
  buttonWebsite.style('padding', '15px 30px');
  buttonWebsite.position(width / 2 - 100, height / 2 + 50);
  buttonWebsite.mousePressed(() => (currentPage = 'website'));

  // 返回主選單按鈕
  buttonBack = createButton('返回主選單');
  buttonBack.style('font-size', '16px');
  buttonBack.style('padding', '10px 20px');
  buttonBack.position(10, 10);
  buttonBack.mousePressed(() => {
    currentPage = 'main';
    clearIframe(); // 清除 iframe
  });
  buttonBack.hide(); // 預設隱藏返回按鈕

  // 填答按鈕
  buttonSubmit = createButton('確認填答');
  buttonSubmit.style('font-size', '16px');
  buttonSubmit.style('padding', '10px 20px');
  buttonSubmit.position(width - 150, height - 50);
  buttonSubmit.mousePressed(checkAnswer);
  buttonSubmit.hide(); // 預設隱藏填答按鈕
}

function draw() {
  background(210, 230, 230); // 設定背景為淺藍色

  // 繪製海草
  drawSeaweed();

  // 繪製魚
  drawFishes();

  // 繪製蝦子
  drawShrimps();

  // 確保文字顏色固定為黑色
  fill(0);

  if (currentPage === 'main') {
    // 主選單頁面
    buttonIntro.show();
    buttonQuiz.show();
    buttonWebsite.show();
    buttonBack.hide();
    buttonSubmit.hide();

    // 左上角顯示文字，文字大小調大
    textSize(24); // 調整文字大小
    textAlign(LEFT, TOP);
    text('410730542鄭皓誠', 10, 10);
  } else if (currentPage === 'intro') {
    // 自我介紹頁面
    showIntroPage();
  } else if (currentPage === 'quiz') {
    // 測驗題目頁面
    showQuizPage();
  } else if (currentPage === 'website') {
    // 教科系 系網頁面
    showWebsitePage();
  } else if (currentPage === 'result') {
    // 顯示分數頁面
    showResultPage();
  }

  // 更新海草擺動的角度偏移
  angleOffset += 0.05;
}

// 自我介紹頁面
function showIntroPage() {
  buttonIntro.hide();
  buttonQuiz.hide();
  buttonWebsite.hide();
  buttonBack.show();

  textSize(24);
  textAlign(CENTER, CENTER);
  text('大家好，我是鄭皓誠，目前就讀於淡江大學教育科技系。\n我的興趣是打籃球跟唱歌！', width / 2, height / 2);
}

// 開始測驗
function startQuiz() {
  currentPage = 'quiz';
  currentQuestion = 0;
  score = 0;
  userAnswer = '';
  generateQuestions();
  buttonIntro.hide();
  buttonQuiz.hide();
  buttonWebsite.hide();
  buttonBack.show();
  buttonSubmit.show();

  // 重置文字顏色為黑色
  fill(0);
}

// 生成隨機題目
function generateQuestions() {
  questions = [];
  for (let i = 0; i < 5; i++) {
    let num1 = int(random(1, 20));
    let num2 = int(random(1, 20));
    let isAddition = random() > 0.5;
    let question = isAddition
      ? `${num1} + ${num2}`
      : `${num1} - ${num2}`;
    let answer = isAddition ? num1 + num2 : num1 - num2;

    // 隨機生成選項
    let options = [answer, answer + int(random(1, 10)), answer - int(random(1, 10)), answer + int(random(11, 20))];
    shuffle(options, true);

    questions.push({
      question,
      options,
      answer,
    });
  }
}

// 測驗題目頁面
function showQuizPage() {
  let q = questions[currentQuestion];
  correctAnswer = q.answer;

  // 顯示題號與題目
  textSize(24);
  textAlign(LEFT, CENTER);
  let xOffset = width / 2 - 200; // 題號與選項對齊的 x 座標
  text(`${currentQuestion + 1}.`, xOffset, height / 2 - 120); // 顯示題號
  text(`${q.question} =`, xOffset + 50, height / 2 - 120); // 顯示題目，與題號保持距離

  // 顯示選項
  textSize(20);
  for (let i = 0; i < q.options.length; i++) {
    let x = width / 2 - 200; // 選項靠左對齊
    let y = height / 2 + i * 40;
    let option = q.options[i];
    let isSelected = userAnswer === option ? '>' : ''; // 標記選中的選項
    text(`${isSelected} ${String.fromCharCode(65 + i)} ${option}`, x, y);
  }

  // 更新「確認填答」按鈕位置
  buttonSubmit.position(width / 2 + 150, height / 2 + 150); // 靠近題目右下角
  buttonSubmit.show();
}

// 檢查答案
function checkAnswer() {
  if (userAnswer == correctAnswer) {
    alert('答對了！');
    score += 20;
  } else {
    alert('答錯了！');
  }

  // 無論答對或答錯，都進入下一題
  currentQuestion++;
  if (currentQuestion >= 5) {
    currentPage = 'result'; // 如果已完成所有題目，進入結果頁面
  }
}

// 顯示分數頁面
function showResultPage() {
  buttonSubmit.hide();

  textSize(32);
  textAlign(CENTER, CENTER);
  text(`你的分數是：${score}`, width / 2, height / 2 - 50);

  if (score >= 60) {
    fill(0, 0, 255); // 藍色文字
    text('你好棒！！！', width / 2, height / 2 + 50);
  } else {
    fill(255, 0, 0); // 紅色文字
    text('你爛透了！', width / 2, height / 2 + 50);
  }
}

// 教科系 系網頁面
function showWebsitePage() {
  buttonIntro.hide();
  buttonQuiz.hide();
  buttonWebsite.hide();
  buttonBack.show();

  // 顯示內嵌的教科系系網標題
  textSize(24);
  textAlign(CENTER, CENTER);
  text('教科系 系網', width / 2, height / 2 - 250); // 顯示標題

  // 使用 iframe 內嵌網址
  let iframeX = width / 2 - 400; // iframe 的 X 座標
  let iframeY = height / 2 - 200; // iframe 的 Y 座標
  let iframeWidth = 800; // iframe 的寬度
  let iframeHeight = 600; // iframe 的高度

  // 確保每次進入頁面時都創建 iframe
  if (!iframeElement) {
    iframeElement = createElement('iframe')
      .attribute('src', 'https://www.et.tku.edu.tw/') // 目標網站網址
      .attribute('width', iframeWidth)
      .attribute('height', iframeHeight)
      .attribute('frameborder', '0')
      .position(iframeX, iframeY);
  }
}

// 返回主選單時清除 iframe
function clearIframe() {
  if (iframeElement) {
    iframeElement.remove(); // 移除 iframe 元素
    iframeElement = null; // 重置變數，確保可以重新創建
  }
}

// 處理使用者選擇答案的邏輯
function mousePressed() {
  if (currentPage === 'quiz') {
    let q = questions[currentQuestion];
    for (let i = 0; i < q.options.length; i++) {
      let x = width / 2 - 200; // 選項的 x 座標
      let y = height / 2 + i * 40; // 選項的 y 座標
      if (mouseX > x && mouseX < x + 200 && mouseY > y - 20 && mouseY < y + 20) {
        userAnswer = q.options[i];
      }
    }
  }
}

// 生成海草
function generateSeaweed() {
  seaweed = [];
  for (let i = 0; i < 50; i++) {
    let x = random(width); // 隨機 x 座標
    let y = height; // 海草從畫布底部開始
    let h = random(100, 300); // 海草的高度
    let c = color(random(50, 150), random(100, 200), random(50, 150)); // 隨機顏色
    seaweed.push({ x, y, h, c });
  }
}

// 繪製海草
function drawSeaweed() {
  for (let i = 0; i < seaweed.length; i++) {
    let s = seaweed[i];
    let sway = sin(angleOffset + i * 0.2) * 10; // 左右擺動的幅度
    stroke(s.c);
    strokeWeight(8); // 將線條加粗，模擬更粗的海草
    line(s.x + sway, s.y, s.x, s.y - s.h); // 繪製海草
  }
}

// 生成魚
function generateFishes() {
  fishes = [];
  for (let i = 0; i < 15; i++) { // 增加魚的數量到 15
    let x = random(width);
    let y = random(height / 2); // 魚在畫布上半部分活動
    let speed = random(1, 3); // 魚的移動速度
    let c = color(random(100, 255), random(100, 255), random(100, 255)); // 隨機顏色
    fishes.push({ x, y, speed, c });
  }
}

// 繪製魚
function drawFishes() {
  for (let i = 0; i < fishes.length; i++) {
    let f = fishes[i];
    fill(f.c);
    noStroke();

    // 根據方向繪製魚的身體和尾巴
    if (f.speed > 0) {
      // 向右游動
      ellipse(f.x, f.y, 20, 10); // 魚的身體
      triangle(f.x - 10, f.y, f.x - 20, f.y - 5, f.x - 20, f.y + 5); // 魚的尾巴
    } else {
      // 向左游動
      ellipse(f.x, f.y, 20, 10); // 魚的身體
      triangle(f.x + 10, f.y, f.x + 20, f.y - 5, f.x + 20, f.y + 5); // 魚的尾巴
    }

    // 更新魚的位置
    f.x += f.speed;

    // 當魚到達畫布邊界時，改變方向並模擬迴游
    if (f.x > width + 20) {
      f.speed = -abs(f.speed); // 改變方向向左
      f.y += random(-20, 20); // 模擬迴游的垂直偏移
    } else if (f.x < -20) {
      f.speed = abs(f.speed); // 改變方向向右
      f.y += random(-20, 20); // 模擬迴游的垂直偏移
    }

    // 確保魚不會游出畫布的垂直範圍
    f.y = constrain(f.y, 10, height - 10);
  }
}

// 生成蝦子
function generateShrimps() {
  shrimps = [];
  for (let i = 0; i < 10; i++) { // 增加蝦子的數量到 10
    let x = random(width);
    let y = random(height / 2, height); // 蝦子在畫布下半部分活動
    let speed = random(0.5, 1.5); // 蝦子的移動速度
    let c = color(255, random(100, 150), random(100, 150)); // 粉紅色調
    shrimps.push({ x, y, speed, c });
  }
}

// 繪製蝦子
function drawShrimps() {
  for (let i = 0; i < shrimps.length; i++) {
    let s = shrimps[i];
    fill(s.c);
    noStroke();

    // 根據方向繪製蝦子的身體和尾巴
    if (s.speed > 0) {
      // 向右游動
      ellipse(s.x, s.y, 15, 10); // 蝦子的身體
      ellipse(s.x - 10, s.y, 10, 5); // 蝦子的尾巴
    } else {
      // 向左游動
      ellipse(s.x, s.y, 15, 10); // 蝦子的身體
      ellipse(s.x + 10, s.y, 10, 5); // 蝦子的尾巴
    }

    // 更新蝦子的位置
    s.x += s.speed;

    // 當蝦子到達畫布邊界時，改變方向並模擬迴游
    if (s.x > width + 20) {
      s.speed = -abs(s.speed); // 改變方向向左
      s.y += random(-10, 10); // 模擬迴游的垂直偏移
    } else if (s.x < -20) {
      s.speed = abs(s.speed); // 改變方向向右
      s.y += random(-10, 10); // 模擬迴游的垂直偏移
    }

    // 確保蝦子不會游出畫布的垂直範圍
    s.y = constrain(s.y, height / 2, height - 10);
  }
}

// 當視窗大小改變時，更新畫布大小
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  // 更新按鈕位置
  if (currentPage === 'main') {
    buttonIntro.position(width / 2 - 100, height / 2 - 150);
    buttonQuiz.position(width / 2 - 100, height / 2 - 50);
    buttonWebsite.position(width / 2 - 100, height / 2 + 50);
  }
  buttonBack.position(10, 10);
  buttonSubmit.position(width - 150, height - 50);
}
