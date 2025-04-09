const container = document.getElementById("container");
let errorCount = 0; // 記錄錯誤次數

// 當頁面載入完成，初始化亂數字串
window.onload = () => {
  add_new_chars();
};

// 監聽鍵盤輸入事件
window.addEventListener("keyup", function (e) {
  console.log(e.key);

  if (!e.key.match(/^[a-z]$/i)) return; // 忽略非英文字母的按鍵

  const str = container.textContent;

  if (str.charAt(0) === e.key) {
    // 如果第一個字正確，就消除它
    container.textContent = str.substring(1);
    errorCount = 0; // 重置錯誤計數
  } else {
    errorCount++; // 增加錯誤次數
  }

  // 如果錯誤達到三次，增加6個亂數字元
  if (errorCount >= 3) {
    add_new_chars(6); // 產生6個額外的亂數字元
    errorCount = 0; // 重置錯誤計數
  }

  add_new_chars(); // 接上新的亂數英文字
});

// 產生 0~2 個隨機英文字元，接到容器上
// 如果傳入數字，則產生該數量的亂數字元
function add_new_chars(extraCount = 0) {
  const length = Math.floor(Math.random() * 3) + 1 + extraCount; // 隨機產生 1 到 3 個字元，外加額外的亂數字元
  let text = "";
  for (let i = 0; i < length; i++) {
    text += String.fromCharCode(97 + Math.floor(Math.random() * 26)); // a-z
  }
  container.textContent += text;
}