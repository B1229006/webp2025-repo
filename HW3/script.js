// 全局變量
var allData = []; // 儲存所有原始數據
var filteredData = []; // 儲存過濾後的數據
var currentPage = 1; // 當前頁碼
var itemsPerPage = 10; // 每頁顯示的項目數

// 初始化
document.addEventListener('DOMContentLoaded', function() {
  fetchData();
});

// 獲取數據
function fetchData() {
  var openUrl = "https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6";
  
  var xhr = new XMLHttpRequest();
  xhr.open('GET', openUrl, true);
  xhr.send();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      allData = JSON.parse(this.responseText);
      filteredData = [...allData]; // 初始時，過濾後的數據等於所有數據
      updateTable();
      updatePagination();
    }
  };
}

// 更新表格顯示
function updateTable() {
  var tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = ""; // 清空表格
  
  // 計算當前頁的數據範圍
  var startIndex = (currentPage - 1) * itemsPerPage;
  var endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
  
  // 只顯示當前頁的數據
  for (var i = startIndex; i < endIndex; i++) {
    var data = filteredData[i];
    var row = tableBody.insertRow(-1);
    
    // 確保showInfo存在且有元素
    var location = data.showInfo && data.showInfo.length > 0 ? data.showInfo[0]['location'] : '無資料';
    var price = data.showInfo && data.showInfo.length > 0 ? data.showInfo[0]['price'] : '無資料';
    
    row.insertCell(0).innerHTML = data['title'] || '無資料';
    row.insertCell(1).innerHTML = location;
    row.insertCell(2).innerHTML = price;
  }
}

// 更新分頁信息
function updatePagination() {
  var totalPages = Math.ceil(filteredData.length / itemsPerPage);
  document.getElementById("pageInfo").textContent = currentPage + " / " + totalPages;
  
  // 禁用/啟用上一頁和下一頁按鈕
  document.getElementById("prevPage").disabled = currentPage <= 1;
  document.getElementById("nextPage").disabled = currentPage >= totalPages;
}

// 過濾數據
function filterData() {
  var searchTerm = document.getElementById("searchInput").value.toLowerCase();
  
  if (searchTerm === "") {
    filteredData = [...allData];
  } else {
    filteredData = allData.filter(function(data) {
      return data.title && data.title.toLowerCase().includes(searchTerm);
    });
  }
  
  // 重置到第一頁
  currentPage = 1;
  updateTable();
  updatePagination();
}

// 上一頁
function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    updateTable();
    updatePagination();
  }
}

// 下一頁
function nextPage() {
  var totalPages = Math.ceil(filteredData.length / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    updateTable();
    updatePagination();
  }
}

// 清除資料
function delOldData() {
  document.getElementById("tableBody").innerHTML = "";
  document.getElementById("pageInfo").textContent = "1 / 1";
  document.getElementById("searchInput").value = "";
  allData = [];
  filteredData = [];
  currentPage = 1;
}