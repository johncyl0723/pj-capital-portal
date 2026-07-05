// P&J Capital Portal — Content Configuration (Published Snapshot)
// Generated: 2026-06-29T00:00:00.000Z
// Workflow: admin.html -> Save & Apply -> Export portal-config.js -> replace this file -> git push
const _pjCfg = JSON.stringify({
  "monthlyReports": [
    {
      "key": "202605",
      "label": "2026 年 05 月",
      "src": "./2026_05/202605_Monthly Report_index.html"
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
    },
    {
      "key": "202602",
      "label": "2026 年 02 月",
      "src": "./2026_02/202602_Monthly Report_index.html"
    },
    {
      "key": "202601",
      "label": "2026 年 01 月",
      "src": "./2026_01/202601_Monthly Report_index.html"
    }
  ],
  "topics": [
    {
      "key": "topic-1779443004537",
      "title": "SLR改革_財政主導的金融新時代",
      "body": "",
      "src": "./topics/SLR改革_財政主導的金融新時代.pdf",
      "categoryKey": "cat-1779442954583",
      "order": 1
    },
    {
      "key": "topic-1779443032479",
      "title": "新貨幣時代的序幕解碼RMP",
      "body": "",
      "src": "./topics/新貨幣時代的序幕解碼RMP.pdf",
      "categoryKey": "cat-1779442954583",
      "order": 2
    },
    {
      "key": "topic-1779443099999",
      "title": "洞悉美聯儲底層邏輯的範式轉移",
      "body": "",
      "src": "./topics/洞悉美聯儲底層邏輯的範式轉移.pdf",
      "categoryKey": "cat-1779442954583",
      "order": 3
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
});
localStorage.setItem('pj_portal_config_published', _pjCfg);
