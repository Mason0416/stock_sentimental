# 📈 StockMind AI - 台股 AI 情緒分析助手

StockMind AI 是一個結合即時股價與人工智慧新聞分析的 Web 應用程式。它利用 Google Gemini 2.0 模型分析最新的財經新聞，為使用者提供個股的情緒評分、買賣建議以及風險提示。

![StockMind AI Interface](./frontend/public/vite.svg)

## ✨ 主要功能

* **🔍 智慧搜尋**：支援台股代碼與名稱搜尋（含自動完成建議）。
* **📊 AI 情緒分析**：
    * 整合 Google Gemini 2.0 Flash 模型。
    * 提供 0-100 的信心分數儀表板。
    * 自動標記「正向/負向」關鍵詞。
    * 生成簡潔的投資建議（Buy/Sell/Hold）與風險提示。
* **💰 即時股價**：串接 `twstock` 顯示即時價格與漲跌幅。
* **🚀 極速體驗**：內建 SQLite 快取機制 (Caching)，一小時內的重複查詢可秒開且不消耗 API 額度。
* **📰 新聞聚合**：自動彙整相關財經新聞連結。

## 🛠️ 技術架構

### Backend (後端)
* **Framework**: FastAPI (Python)
* **AI Model**: Google Gemini 2.0 Flash (`google-genai`)
* **Database**: SQLite (用於儲存股票清單與分析快取)
* **Tools**: `twstock` (股價), `GoogleNews` (新聞爬蟲)

### Frontend (前端)
* **Framework**: React 19 + Vite
* **UI Components**: `react-gauge-chart` (儀表板)
* **Styling**: CSS Modules

---

## 🚀 安裝與執行指南

### 1. 取得專案
```bash
git clone [https://github.com/yourusername/stock_sentimental.git](https://github.com/yourusername/stock_sentimental.git)
cd stock_sentimental


2. 後端設定 (Backend)

請開啟一個終端機 (Terminal) 進入 backend 資料夾：
```bash
cd backend
```

建立並啟動虛擬環境 (建議)：
```bash
python -m venv venv
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate
```

安裝套件：
```bash
pip install -r requirements.txt
```

設定環境變數： 在 backend 目錄下建立 .env 檔案，並填入你的 Google API Key：
```python
GEMINI_API_KEY=你的_GOOGLE_API_KEY
```

初始化資料庫： 這會建立股票清單與快取資料表，初次執行務必執行：
```bash
# 1. 建立股票代碼清單
python scripts/init_stock_list.py

# 2. 建立快取資料表
python scripts/init_cache_table.py
```

啟動後端伺服器：
```bash
uvicorn app.main:app --reload
```

## Project Structure

```text
├── README.md
├── backend
│   ├── app
│   │   ├── main.py
│   │   ├── models
│   │   ├── routers
│   │   │   └── stock.py
│   │   ├── schemas
│   │   │   └── stock.py
│   │   └── services
│   │       ├── ai_service.py
│   │       ├── news_service.py
│   │       └── stock_service.py
│   ├── requirements.txt
│   ├── scripts
│   │   └── init_stock_list.py
│   └── stocks.db
└── frontend
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── public
    │   └── vite.svg
    ├── src
    │   ├── App.css
    │   ├── App.jsx
    │   ├── assets
    │   │   └── react.svg
    │   ├── components
    │   │   ├── SearchBar.css
    │   │   └── SearchBar.jsx
    │   ├── index.css
    │   └── main.jsx
    └── vite.config.js


