// P&J Capital Portal — Content Configuration
// Workflow: open admin.html locally → edit → click "匯出 portal-config.js" → replace this file → git push
localStorage.setItem('pj_portal_config', JSON.stringify({
  "monthlyReports": [
    { "key": "202604", "label": "2026 年 04 月", "src": "./2026_04/202604_Monthly Report_index.html" },
    { "key": "202603", "label": "2026 年 03 月", "src": "./2026_03/202603_Monthly Report_index.html" }
  ],
  "topics": [
    {
      "key": "topic-1",
      "title": "2026 Q2 利率展望",
      "body": "本專題將涵蓋 2026 年第二季主要央行政策方向分析、殖利率曲線變化，以及對固定收益投資組合的潛在影響評估。內容準備中，敬請期待。",
      "src": ""
    },
    {
      "key": "topic-2",
      "title": "信用市場觀察",
      "body": "本專題聚焦投資等級及高收益債券信用利差走勢、企業財務健康度監測，以及當前持倉的信用風險評估。內容準備中，敬請期待。",
      "src": ""
    }
  ]
}));
