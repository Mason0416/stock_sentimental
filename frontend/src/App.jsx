import { useState, useEffect } from 'react'
// 不需要 import logo 了，因為我們要顯示文字新聞

function App() {
  // 1. 定義一個變數來裝新聞，預設是空陣列 []
  const [news, setNews] = useState([])

  // 2. 這段 useEffect 負責在「網頁開啟時」去後端抓資料
  useEffect(() => {
    // 呼叫你的 FastAPI 後端
    fetch('http://127.0.0.1:8000/api/news')
      .then(response => response.json()) // 把回應轉成 JSON
      .then(data => setNews(data))       // 把資料塞進 news 變數
      .catch(error => console.error('Error:', error)) // 如果報錯就印出來
  }, [])

  // 3. 這裡是畫面 (HTML)
  return (
    <div style={{ padding: '20px' }}>
      <h1>新聞搜尋系統</h1>
      <p>目前資料庫的新聞：</p>
      
      {/* 4. 如果 news 是空的，顯示 Loading... */}
      {news.length === 0 ? (
        <p>載入中...</p>
      ) : (
        // 5. 如果有資料，用 map 迴圈把它們列出來
        <ul>
          {news.map((item) => (
            <li key={item.id}>
              <strong>{item.date}</strong> - {item.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App