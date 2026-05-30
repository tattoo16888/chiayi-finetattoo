const categories = [
  ["愛情日期", "date tattoo roman numerals fine line couple"],
  ["羅馬數字", "roman numerals tattoo tiny fine line"],
  ["情侶刺青", "couple tattoo tiny minimal"],
  ["櫻花", "sakura tattoo fine line tiny"],
  ["蝴蝶", "butterfly tattoo fine line small"],
  ["蝴蝶結", "ribbon bow tattoo fine line"],
  ["月亮", "moon tattoo tiny fine line"],
  ["星座", "zodiac tattoo tiny fine line"],
  ["英文字", "handwriting tattoo fine line quote"],
  ["寵物線條", "pet line tattoo cat dog fine line"],
  ["貓咪", "cat tattoo tiny fine line"],
  ["狗狗", "dog tattoo tiny fine line"],
  ["肉球", "paw tattoo tiny minimal"],
  ["小花", "small flower tattoo fine line"],
  ["紙感素描", "paper sketch tattoo fine line"],
  ["鉛筆感", "pencil tattoo fine line tiny"],
  ["韓系手寫", "korean handwriting tattoo"],
  ["文青刺青", "minimal aesthetic tattoo tiny"]
];

function encode(q) {
  return encodeURIComponent(q);
}

function openSearch(keyword) {
  const url = `https://www.google.com/search?tbm=isch&q=${encode(keyword)}`;
  window.open(url, "_blank");
}

function multiSearch(keyword) {
  const choice = confirm("按「確定」開 Google 圖片；按「取消」開 Pinterest。");
  const url = choice
    ? `https://www.google.com/search?tbm=isch&q=${encode(keyword)}`
    : `https://www.pinterest.com/search/pins/?q=${encode(keyword)}`;
  window.open(url, "_blank");
}

function searchCustom() {
  const keyword = document.getElementById("customKeyword").value.trim();
  if (!keyword) {
    alert("請先輸入想找的刺青關鍵字");
    return;
  }
  openSearch(keyword + " tattoo 刺青 微刺青 細線");
}

function openPromptSearch(type) {
  const keyword = document.getElementById("promptInput").value.trim();
  if (!keyword) {
    alert("請先輸入靈感關鍵字");
    return;
  }

  const q = `${keyword} tattoo 微刺青 細線 紙感`;
  let url = "";

  if (type === "google") url = `https://www.google.com/search?tbm=isch&q=${encode(q)}`;
  if (type === "pinterest") url = `https://www.pinterest.com/search/pins/?q=${encode(q)}`;
  if (type === "instagram") url = `https://www.instagram.com/explore/search/keyword/?q=${encode(q)}`;

  window.open(url, "_blank");
}

function saveFavorite() {
  const keyword = document.getElementById("promptInput").value.trim();
  if (!keyword) {
    alert("請先輸入要收藏的關鍵字");
    return;
  }

  const list = JSON.parse(localStorage.getItem("tattooFavorites") || "[]");
  if (!list.includes(keyword)) list.unshift(keyword);
  localStorage.setItem("tattooFavorites", JSON.stringify(list.slice(0, 30)));
  renderFavorites();
}

function deleteFavorite(keyword) {
  const list = JSON.parse(localStorage.getItem("tattooFavorites") || "[]");
  localStorage.setItem("tattooFavorites", JSON.stringify(list.filter(item => item !== keyword)));
  renderFavorites();
}

function renderFavorites() {
  const box = document.getElementById("favorites");
  const list = JSON.parse(localStorage.getItem("tattooFavorites") || "[]");

  if (!list.length) {
    box.className = "favorites-empty";
    box.innerHTML = "還沒有收藏。看到常用風格可以先存起來。";
    return;
  }

  box.className = "";
  box.innerHTML = list.map(item => `
    <div class="favorite-item">
      <span>${item}</span>
      <div>
        <button onclick="openSearch('${item.replace(/'/g, "\\'")} tattoo 微刺青 細線')">搜圖</button>
        <button onclick="deleteFavorite('${item.replace(/'/g, "\\'")}')">刪除</button>
      </div>
    </div>
  `).join("");
}

function renderCategories() {
  const grid = document.getElementById("categoryGrid");
  grid.innerHTML = categories.map(([name, keyword]) =>
    `<button onclick="multiSearch('${keyword}')">${name}</button>`
  ).join("");
}

function installHint() {
  alert("iPhone：用 Safari 開啟網站 → 分享按鈕 → 加入主畫面，就會像 App 一樣出現在手機桌面。");
}

renderCategories();
renderFavorites();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}
