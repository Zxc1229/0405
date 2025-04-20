let buttonIntro, buttonQuiz, buttonWebsite, buttonBack, buttonSubmit, buttonVideo, buttonProjects, dropdownQuiz;
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
let food = []; // 用於存儲飼料的陣列
let lastFoodTime = 0; // 上次生成飼料的時間

let capture, cacheGraphics, bk, ay, mode = 1;
let colors = "064789-427aa1-ebf2fa-679436-a5be00".split("-").map(a => "#" + a);
let balls = [];
let sliderElement, mic;

function setup() {
  createCanvas(windowWidth, windowHeight); // 設定畫布大小為視窗大小
  generateSeaweed(); // 生成海草
  generateFishes(); // 生成魚

  // 主選單按鈕
  buttonIntro = createButton('自我介紹');
  buttonIntro.style('font-size', '16px');
  buttonIntro.style('padding', '10px 20px');
  buttonIntro.position(10, 50);
  buttonIntro.mousePressed(() => {
    currentPage = 'intro';
    clearIframe();
  });

  buttonProjects = createButton('個人作品');
  buttonProjects.style('font-size', '16px');
  buttonProjects.style('padding', '10px 20px');
  buttonProjects.position(10, 100);
  buttonProjects.mouseOver(showSubmenu);
  buttonProjects.mouseOut(hideSubmenu);

  // 子選單按鈕
  buttonProject1 = createButton('測驗問題');
  buttonProject1.style('font-size', '14px');
  buttonProject1.style('padding', '8px 16px');
  buttonProject1.position(150, 100);
  buttonProject1.mousePressed(() => {
    currentPage = 'quiz';
    startQuiz();
    clearIframe();
  });
  buttonProject1.mouseOver(showSubmenu);
  buttonProject1.mouseOut(hideSubmenu);

  buttonProject2 = createButton('作品 2');
  buttonProject2.style('font-size', '14px');
  buttonProject2.style('padding', '8px 16px');
  buttonProject2.position(150, 140);
  buttonProject2.mousePressed(() => {
    currentPage = 'project2';
    clearIframe();
    startProject2();
  });
  buttonProject2.mouseOver(showSubmenu);
  buttonProject2.mouseOut(hideSubmenu);

  // 新增作品三按鈕
  buttonProject3 = createButton('作品 3');
  buttonProject3.style('font-size', '14px');
  buttonProject3.style('padding', '8px 16px');
  buttonProject3.position(150, 180);
  buttonProject3.mousePressed(() => {
    currentPage = 'project3';
    clearIframe();
  });
  buttonProject3.mouseOver(showSubmenu);
  buttonProject3.mouseOut(hideSubmenu);

  buttonProject1.hide();
  buttonProject2.hide();
  buttonProject3.hide(); // 預設隱藏

  buttonWebsite = createButton('教科系 系網');
  buttonWebsite.style('font-size', '16px');
  buttonWebsite.style('padding', '10px 20px');
  buttonWebsite.position(10, 150);
  buttonWebsite.mousePressed(() => {
    currentPage = 'website';
    clearIframe();
  });

  buttonVideo = createButton('教學影片');
  buttonVideo.style('font-size', '16px');
  buttonVideo.style('padding', '10px 20px');
  buttonVideo.position(10, 200);
  buttonVideo.mousePressed(() => {
    currentPage = 'video';
    clearIframe();
  });

  buttonBack = createButton('返回主選單');
  buttonBack.style('font-size', '16px');
  buttonBack.style('padding', '10px 20px');
  buttonBack.position(10, 250);
  buttonBack.mousePressed(() => {
    currentPage = 'main';
    clearIframe();
  });
  buttonBack.hide();
}

function draw() {
  drawBackgroundElements(); // 繪製背景元素

  // 左上角顯示文字
  fill(0);
  textSize(24);
  textAlign(LEFT, TOP);
  text('410730542 鄭皓誠', 10, 10);

  if (currentPage === 'main') {
    // 主選單頁面
    buttonIntro.show();
    buttonProjects.show();
    buttonWebsite.show();
    buttonVideo.show();
    buttonBack.hide();
    if (sliderElement) sliderElement.hide(); // 隱藏橫向選單
    if (buttonSubmit) buttonSubmit.hide(); // 隱藏確認填答按鈕
  } else if (currentPage === 'project2') {
    // 作品 2 頁面
    drawProject2();
    buttonIntro.hide();
    buttonProjects.hide();
    buttonWebsite.hide();
    buttonVideo.hide();
    buttonBack.show();
    buttonBack.position(10, 50);
    if (sliderElement) sliderElement.show(); // 顯示橫向選單
    if (buttonSubmit) buttonSubmit.hide(); // 隱藏確認填答按鈕
  } else if (currentPage === 'project3') {
    // 作品 3 頁面
    drawProject3();
    buttonIntro.hide();
    buttonProjects.hide();
    buttonWebsite.hide();
    buttonVideo.hide();
    buttonBack.show();
    buttonBack.position(10, 50);
    if (sliderElement) sliderElement.hide(); // 隱藏橫向選單
    if (buttonSubmit) buttonSubmit.hide(); // 隱藏確認填答按鈕
  } else if (currentPage === 'quiz') {
    // 測驗問題頁面
    showQuizPage();
    buttonIntro.hide();
    buttonProjects.hide();
    buttonWebsite.hide();
    buttonVideo.hide();
    buttonBack.show();
    buttonBack.position(10, 50);
    if (buttonSubmit) buttonSubmit.show(); // 顯示確認填答按鈕
  } else {
    // 隱藏主選單按鈕
    buttonIntro.hide();
    buttonProjects.hide();
    buttonWebsite.hide();
    buttonVideo.hide();
    buttonBack.show();
    buttonBack.position(10, 50);
    if (sliderElement) sliderElement.hide(); // 隱藏橫向選單
    if (buttonSubmit) buttonSubmit.hide(); // 隱藏確認填答按鈕
  }

  // 根據頁面顯示內容
  if (currentPage === 'intro') {
    showIntroPage();
  } else if (currentPage === 'projects') {
    showProjectsPage();
  } else if (currentPage === 'website') {
    showWebsitePage();
  } else if (currentPage === 'video') {
    showVideoPage();
  } else if (currentPage === 'result') {
    showResultPage();
  }

  // 更新海草擺動的角度偏移
  angleOffset += 0.05;
}

// 自我介紹頁面
function showIntroPage() {
  buttonIntro.hide();
  buttonProjects.hide();
  buttonWebsite.hide();
  buttonVideo.hide();
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
  generateQuestions(); // 確保生成題目
  if (questions.length === 0) {
    console.error("測驗題目生成失敗！");
    return;
  }
  buttonIntro.hide();
  buttonProjects.hide();
  buttonWebsite.hide();
  buttonVideo.hide();
  buttonBack.show();
  if (!buttonSubmit) {
    buttonSubmit = createButton('確認填答');
    buttonSubmit.mousePressed(checkAnswer);
  }
  buttonSubmit.show(); // 確保顯示提交按鈕
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
  if (questions.length === 0) {
    console.error("無法生成測驗題目！");
  }
}

// 測驗題目頁面
function showQuizPage() {
  if (currentQuestion >= questions.length) {
    console.error("當前題目超出範圍！");
    return;
  }

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
  if (currentQuestion >= questions.length) {
    currentPage = 'result'; // 如果已完成所有題目，進入結果頁面
  } else {
    userAnswer = ''; // 重置使用者答案
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
  buttonProjects.hide();
  buttonWebsite.hide();
  buttonVideo.hide();
  buttonBack.show();

  // 顯示內嵌的教科系系網標題
  textSize(24);
  textAlign(CENTER, CENTER);
  fill(0);
  text('教科系 系網', width / 2, 50); // 顯示標題，固定在畫布上方

  // 使用 iframe 內嵌網址
  let iframeX = width / 2 - 400; // iframe 的 X 座標
  let iframeY = height / 2 - 300; // iframe 的 Y 座標，置中顯示
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

// 教學影片頁面
function showVideoPage() {
  buttonIntro.hide();
  buttonProjects.hide();
  buttonWebsite.hide();
  buttonVideo.hide();
  buttonBack.show();

  // 顯示影片標題
  textSize(24);
  textAlign(CENTER, CENTER);
  fill(0);
  text('教學影片', width / 2, 50); // 顯示標題，固定在畫布上方

  // 使用 iframe 內嵌影片
  let iframeX = width / 2 - 400; // iframe 的 X 座標
  let iframeY = height / 2 - 225; // iframe 的 Y 座標，置中顯示
  let iframeWidth = 800; // iframe 的寬度
  let iframeHeight = 450; // iframe 的高度

  if (!iframeElement) {
    iframeElement = createElement('iframe')
      .attribute('src', 'https://cfchen58.synology.me/%E7%A8%8B%E5%BC%8F%E8%A8%AD%E8%A8%882024/B2/week6/20250324_092538.mp4')
      .attribute('width', iframeWidth)
      .attribute('height', iframeHeight)
      .attribute('frameborder', '0')
      .attribute('allowfullscreen', true)
      .position(iframeX, iframeY);
  }
}

// 個人作品頁面
function showProjectsPage() {
  buttonIntro.hide();
  buttonProjects.hide();
  buttonWebsite.hide();
  buttonVideo.hide();
  buttonBack.show();
  dropdownQuiz.hide();

  textSize(24);
  textAlign(CENTER, CENTER);
  fill(0);
  text('這是我的個人作品頁面！', width / 2, height / 2);
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
  for (let i = 0; i < 25; i++) { // 增加魚的數量
    let x = random(width);
    let y = random(height); // 魚在整個畫布活動
    let speed = random(1, 3); // 魚的移動速度
    let c = color(random(100, 255), random(100, 255), random(100, 255)); // 隨機顏色
    fishes.push({ x, y, speed, c, size: 1 }); // 新增 size 屬性，初始值為 1
  }
}

// 繪製魚
function drawFishes() {
  for (let i = 0; i < fishes.length; i++) {
    let f = fishes[i];
    fill(f.c);
    noStroke();

    let fishWidth = 20 * f.size; // 根據 size 調整魚的寬度
    let fishHeight = 10 * f.size; // 根據 size 調整魚的高度

    // 根據方向繪製魚的身體和尾巴
    if (f.speed > 0) {
      // 向右游動
      ellipse(f.x, f.y, fishWidth, fishHeight); // 魚的身體
      triangle(f.x - fishWidth / 2, f.y, f.x - fishWidth, f.y - fishHeight / 2, f.x - fishWidth, f.y + fishHeight / 2); // 魚的尾巴
    } else {
      // 向左游動
      ellipse(f.x, f.y, fishWidth, fishHeight); // 魚的身體
      triangle(f.x + fishWidth / 2, f.y, f.x + fishWidth, f.y - fishHeight / 2, f.x + fishWidth, f.y + fishHeight / 2); // 魚的尾巴
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
    } else {
      s.x = abs(s.speed); // 改變方向向右
      s.y += random(-10, 10); // 模擬迴游的垂直偏移
    }

    // 確保蝦子不會游出畫布的垂直範圍
    s.y = constrain(s.y, height / 2, height - 10);
  }
}

// 繪製飼料
function drawFood() {
  for (let i = food.length - 1; i >= 0; i--) {
    let f = food[i];
    fill(139, 69, 19); // 棕色飼料
    noStroke();
    ellipse(f.x, f.y, 8, 8); // 繪製飼料

    // 更新飼料位置
    f.y += 2; // 飼料下落速度

    // 移除超出畫布的飼料
    if (f.y > height) {
      food.splice(i, 1);
      continue;
    }

    // 檢查所有魚是否吃到飼料
    for (let j = 0; j < fishes.length; j++) {
      let fish = fishes[j];
      if (dist(f.x, f.y, fish.x, fish.y) < 15) { // 距離小於15時，魚吃掉飼料
        food.splice(i, 1); // 移除被吃掉的飼料
        fish.size += 0.5; // 增加魚的大小，幅度更大
        break; // 一旦飼料被吃掉，停止檢查其他魚
      }
    }
  }
}

// 當滑鼠移動時掉落飼料
function mouseMoved() {
  // 限制飼料生成頻率，每 200 毫秒生成一次
  if (millis() - lastFoodTime > 200) {
    food.push({ x: mouseX, y: mouseY }); // 在滑鼠位置生成飼料
    lastFoodTime = millis(); // 更新上次生成飼料的時間
  }
}

// 當視窗大小改變時，更新畫布大小
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  // 更新按鈕位置到左下角
  buttonIntro.position(10, 50);
  buttonProjects.position(10, 100);
  buttonWebsite.position(10, 150);
  buttonVideo.position(10, 200);
  buttonBack.position(10, 250);
  dropdownQuiz.position(10, 300);
}

let submenuTimeout; // 用於延遲隱藏子選單的計時器

function showSubmenu() {
  clearTimeout(submenuTimeout); // 清除隱藏子選單的計時器
  buttonProject1.show();
  buttonProject2.show();
  buttonProject3.show();
}

function hideSubmenu() {
  submenuTimeout = setTimeout(() => {
    buttonProject1.hide();
    buttonProject2.hide();
    buttonProject3.hide();
  }, 200); // 延遲 200 毫秒隱藏子選單
}

function startProject2() {
  if (!capture) {
    // 初始化作品 2 的相關資源
    capture = createCapture(VIDEO);
    capture.size(640, 480);
    cacheGraphics = createGraphics(640, 480);
    cacheGraphics.translate(640, 0);
    cacheGraphics.scale(-1, 1);
    capture.hide();

    mic = new p5.AudioIn();
    mic.start();
  }

  // 初始化並顯示橫向可拉選單
  if (!sliderElement) {
    sliderElement = createSlider(30, 50, 30, 3);
    sliderElement.position(980, 180);
    sliderElement.input(() => {
      ay = sliderElement.value();
    });
  }
  sliderElement.show(); // 確保顯示選單
}

function drawProject2() {
  drawBackgroundElements(); // 繪製背景元素（海草、魚、蝦子、飼料）

  // 繪製作品 2 的內容
  if (capture && cacheGraphics) {
    cacheGraphics.image(capture, 0, 0);
  }

  fill(255);
  textSize(20);
  textStyle(BOLD);
  text("圖像大小", 880, 180);
  text("410730542", 880, 400);
  text("鄭皓誠", 880, 450);
  text("按下1，顯示黑點", 880, 580);
  text("按下2，顯示流星", 880, 600);
  text("按下3，顯示文字", 880, 620);
 
  scale(1);
  let span = 20 + max(mouseX, 0) / 20;

  if (mode !== 4) balls = []; // 非模式 4 時清空 balls

  for (let x = 0; x < cacheGraphics.width; x += span) {
    for (let y = 0; y < cacheGraphics.height; y += span) {
      let pixel = cacheGraphics.get(x, y);
      bk = (pixel[0] + pixel[1] + pixel[2]) / 3;

      switch (mode) {
        case 1: // 黑點模式
          fill(255);
          ellipse(x + 100, y + 100, span * map(bk, 0, 255, 0, 1));
          break;
        case 2: // 流星模式
          push();
          colorMode(HSB);
          fill(pixel[8], 100, 90);
          translate(x + 100, y + 100);
          rotate(pixel[2] / 100);
          rectMode(CENTER);
          triangle(0, 4, 3, 5, 0, span * 0.3 + pixel[2] / 10);
          fill(0);
          ellipse(0, 0, 10);
          pop();
          break;
        case 3: // 文字模式
          let txt = "410730542";
          let bkId = int(map(bk, 0, 255, 9, 0));
          fill(pixel);
          textSize(span);
          textStyle(BOLD);
          text(txt[bkId], x, y);
          break;
        case 4: // 雲朵台灣黑熊模式
          let micLevel = mic.getLevel();
          let ball;
          if (micLevel > 0.009) {
            ball = new Ball_1({ p: { x: x, y: y }, r: ay, color: color(pixel[0], pixel[1], pixel[2]) });
          } else {
            ball = new Ball({ p: { x: x, y: y }, r: ay, color: color(pixel[0], pixel[1], pixel[2]) });
          }
          balls.push(ball);

          // 限制 balls 陣列的大小，避免過多物件導致卡住
          if (balls.length > 100) {
            balls.shift(); // 移除最早加入的物件
          }
          break;
        case 5: // 原視窗模式
          image(cacheGraphics, 0, 0);
          break;
      }
    }
  }

  if (mode === 4) {
    for (let ball of balls) {
      ball.update();
      ball.draw();
    }
  }

  // 滑鼠游標
  noStroke();
  fill(255);
  circle(mouseX, mouseY, 20);
}

function keyPressed() {
  if (currentPage === 'project2') {
    if (key === "1") {
      mode = 1; // 黑點模式
    } else if (key === "2") {
      mode = 2; // 流星模式
    } else if (key === "3") {
      mode = 3; // 文字模式
    } else if (key === "4") {
      mode = 4; // 雲朵台灣黑熊模式
      balls = []; // 切換模式時清空 balls
    } else if (key === "5") {
      mode = 5; // 原視窗模式
      balls = []; // 切換模式時清空 balls
    }
  }
}

function drawProject3() {
  background(0); // 背景為黑色
  for (let x = 0; x < width; x += 50) {
    for (let y = 0; y < height; y += 50) { // 重複畫的迴圈
      let c = int(map(mouseX, 0, width, 15, 100));
      noFill(); // 圖形無填滿

      stroke(255, 0, 0);
      rect(x + 25, y + 25, 50, 50 + c); // 畫正方形
      stroke(0, 255, 0);
      ellipse(x + 50, y + 50, 50, c); // 畫圓
      stroke(0, 0, 255);
      ellipse(x + 70, y + 70, 50, 50 + c); // 畫圓
    }
  }
}

function drawBackgroundElements() {
  background(210, 230, 239); // 設定背景為淺藍色

  // 繪製海草
  drawSeaweed();

  // 繪製魚
  drawFishes();

  // 繪製蝦子
  drawShrimps();

  // 繪製飼料
  drawFood();
}
