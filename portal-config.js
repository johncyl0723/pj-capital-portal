// P&J Capital Portal — Content Configuration (Published Snapshot)
// Generated: 2026-05-22T09:43:59.851Z
// Workflow: admin.html → 儲存並套用 → 匯出 portal-config.js → replace this file → git push
// Writes to 'pj_portal_config_published' (fallback for new visitors).
// Does NOT overwrite 'pj_portal_config' (admin key), so admin changes persist.
localStorage.setItem('pj_portal_config_published', JSON.stringify({
  "monthlyReports": [
    {
      "key": "202601",
      "label": "2026 年 01 月",
      "src": "./2026_01/202601_Monthly Report_index.html"
    },
    {
      "key": "202602",
      "label": "2026 年 02 月",
      "src": "./2026_02/202602_Monthly Report_index.html"
    },
    {
      "key": "202604",
      "label": "2026 年 04 月",
      "src": "./2026_04/202604_Monthly Report_index.html"
    },
    {
      "key": "202603",
      "label": "2026 年 03 月",
      "src": "./2026_03/202603_Monthly Report_index.html"
    }
  ],
  "topics": [
    {
      "key": "topic-1779443004537",
      "title": "SLR改革_財政主導的金融新時代",
      "body": "",
      "src": "./SLR改革_財政主導的金融新時代.pdf",
      "categoryKey": "cat-1779442954583",
      "order": 1
    },
    {
      "key": "topic-1779443032479",
      "title": "RMP制度_新貨幣時代的序幕解碼",
      "body": "",
      "src": "./新貨幣時代的序幕解碼RMP.pdf",
      "categoryKey": "cat-1779442954583",
      "order": 2
    }
  ],
  "categories": [
    {
      "key": "cat-1779442954583",
      "name": "財經市場硬核"
    },
    {
      "key": "cat-1779442981868",
      "name": "財經時事解讀"
    }
  ]
}));
