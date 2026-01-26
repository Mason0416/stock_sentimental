# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# --- 關鍵設定：解決跨域問題 (CORS) ---
# 因為 React (Port 5173) 和 FastAPI (Port 8000) 是不同來源
# 如果不加這段，瀏覽器會擋住 React 的請求
origins = [
    "http://localhost:5173",  # Vite 預設 Port
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 測試用的 API
@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI backend!"}

@app.get("/api/news")
def get_news():
    # 模擬從 SQLite 撈出的資料
    return [
        {"id": 1, "title": "台積電營收創新高", "date": "2024-01-26"},
        {"id": 2, "title": "Python 爬蟲教學", "date": "2024-01-25"}
    ]