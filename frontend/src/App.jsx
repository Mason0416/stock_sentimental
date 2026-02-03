import { useState } from 'react';
import SearchBar from './components/SearchBar';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (searchTicker) => {
    setLoading(true);
    setData(null);
    setError(null);
    
    try {
      // 呼叫後端
      const response = await fetch(`http://localhost:8000/api/stocks/analyze?code=${searchTicker}`);
      
      if (!response.ok) {
        throw new Error(`後端回應錯誤: ${response.status}`);
      }

      const result = await response.json();
      console.log("後端回傳資料:", result); // [除錯用] 在瀏覽器 Console 顯示資料

      setData(result);
    } catch (err) {
      console.error("前端發生錯誤:", err);
      setError(err.message || "發生未知錯誤");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>📈 StockMind AI</h1>
      <SearchBar onSearch={handleSearch} />

      {/* 載入狀態 */}
      {loading && <div className="loading">正在分析新聞數據，請稍候...</div>}
      
      {/* 錯誤訊息區塊 */}
      {error && (
        <div style={{color: '#ff6b6b', marginTop: '20px', padding: '15px', border: '1px solid #ff6b6b', borderRadius: '8px', background: '#2a1a1a'}}>
          <h3>⚠️ 發生錯誤</h3>
          <p>{error}</p>
          <small>請按 F12 打開 Console 查看詳細錯誤訊息</small>
        </div>
      )}

      {/* 結果顯示區塊 (加上安全檢查) */}
      {data && !error && (
        <div className="result-container">
          
          {/* AI 分析區塊 */}
          {data.ai_analysis ? (
            <div className="card ai-card">
              <div className="ai-header">
                <h2>AI 投資建議：
                  <span className={`verdict ${data.ai_analysis.verdict || 'Neutral'}`}>
                    {data.ai_analysis.verdict || '未知'}
                  </span>
                </h2>
                <div className="score-badge">信心分數: {data.ai_analysis.score ?? 0}</div>
              </div>
              
              <p className="reason"><strong>分析摘要：</strong>{data.ai_analysis.reason || "無分析內容"}</p>
              <p className="risk"><strong>風險提示：</strong>{data.ai_analysis.risk || "無風險提示"}</p>

              {/* 關鍵詞區塊 (加上 ?. 防止崩潰) */}
              <div className="keywords-box">
                <div className="keywords-group">
                  <h4>🔥 正向關鍵詞</h4>
                  <div className="tags">
                    {/* 這裡加了 ?. 和 || [] 保護 */}
                    {(data.ai_analysis.positive_keywords || []).map((w, i) => (
                      <span key={i} className="tag p-tag">{w}</span>
                    ))}
                  </div>
                </div>
                <div className="keywords-group">
                  <h4>⚠️ 負向關鍵詞</h4>
                  <div className="tags">
                    {(data.ai_analysis.negative_keywords || []).map((w, i) => (
                      <span key={i} className="tag n-tag">{w}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="card" style={{padding: '20px'}}>
              <p>本次查詢未產生 AI 分析結果（可能無相關新聞或 API 額度用盡）。</p>
            </div>
          )}

          {/* 新聞列表區塊 */}
          <div className="news-section">
            <h3>📰 相關新聞 ({data.news?.length || 0})</h3>
            <div className="news-list">
              {/* 這裡加了 ?. 保護 */}
              {data.news?.map((item, index) => (
                <a key={index} href={item.link} target="_blank" rel="noreferrer" className="news-item">
                  <div className="news-title">{item.title}</div>
                  <div className="news-meta">{item.source} • {item.date}</div>
                </a>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

export default App;