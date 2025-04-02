// 生成隨機a-z字元的函數
function generateRandomChars(count) {
    let result = '';
    for (let i = 0; i < count; i++) {
        // 生成a-z的隨機字元 (ASCII碼97-122)
        result += String.fromCharCode(97 + Math.floor(Math.random() * 26));
    }
    return result;
}

// 添加新字元函數
function add_new_chars() {
    const container = document.getElementById('container');
    // 產生1-3個隨機字元
    const newChars = generateRandomChars(1 + Math.floor(Math.random() * 3));
    container.textContent += newChars;
}

// 頁面載入時初始化
window.onload = function() {
    const container = document.getElementById('container');
    // 產生0-2個隨機字元
    const initialChars = generateRandomChars(Math.floor(Math.random() * 3));
    container.textContent = initialChars;
    
    // 聚焦到container以便接收鍵盤事件
    container.focus();
};

// 監聽keyup事件
window.addEventListener("keyup", function(e) {
    const container = document.getElementById('container');
    let currentText = container.textContent;
    
    // 檢查是否有字元且按鍵與第一個字元相同
    if (currentText.length > 0 && e.key === currentText[0]) {
        // 移除第一個字元
        container.textContent = currentText.slice(1);
    }
    
    // 添加新字元
    add_new_chars();
});