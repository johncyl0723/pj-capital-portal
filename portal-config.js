// P&J Capital Portal — Content Configuration (Published Snapshot)
// Generated: 2026-10-05T12:00:00.000Z
// 前台 /portal/ 與後台 /admin/ 都以這個檔案為唯一資料來源。
// Workflow: /admin/ -> 儲存並套用 -> 匯出 portal-config.js -> replace this file -> git push
window.PJ_PORTAL_CONFIG = {
  "publishedAt": "2026-10-05T12:00:00.000Z",
  "monthlyReports": [
    {
      "key": "202608",
      "label": "2026 年 08 月",
      "src": "/2026_08/202608_Monthly Report_index.html"
    },
    {
      "key": "202607",
      "label": "2026 年 07 月",
      "src": "/2026_07/202607_Monthly Report_index.html"
    },
    {
      "key": "202606",
      "label": "2026 年 06 月",
      "src": "/2026_06/202606_Monthly Report_index.html"
    },
    {
      "key": "202605",
      "label": "2026 年 05 月",
      "src": "/2026_05/202605_Monthly Report_index.html"
    },
    {
      "key": "202604",
      "label": "2026 年 04 月",
      "src": "/2026_04/202604_Monthly Report_index.html"
    },
    {
      "key": "202603",
      "label": "2026 年 03 月",
      "src": "/2026_03/202603_Monthly Report_index.html"
    },
    {
      "key": "202602",
      "label": "2026 年 02 月",
      "src": "/2026_02/202602_Monthly Report_index.html"
    },
    {
      "key": "202601",
      "label": "2026 年 01 月",
      "src": "/2026_01/202601_Monthly Report_index.html"
    }
  ],
  "topics": [
    {
      "key": "topic-1779443004537",
      "title": "SLR改革_財政主導的金融新時代",
      "body": "",
      "src": "/topics/SLR改革_財政主導的金融新時代.pdf",
      "categoryKey": "cat-1779442954583",
      "order": 1
    },
    {
      "key": "topic-1779443032479",
      "title": "新貨幣時代的序幕解碼RMP",
      "body": "",
      "src": "/topics/新貨幣時代的序幕解碼RMP.pdf",
      "categoryKey": "cat-1779442954583",
      "order": 2
    },
    {
      "key": "topic-1779443099999",
      "title": "洞悉美聯儲底層邏輯的範式轉移",
      "body": "",
      "src": "/topics/洞悉美聯儲底層邏輯的範式轉移.pdf",
      "categoryKey": "cat-1779442954583",
      "order": 3
    },
    {
      "key": "topic-1791201600000",
      "title": "AI 算力金融化革命｜輝達 5,000 億美元融資平台深度解析",
      "body": "",
      "src": "/topics/輝達算力金融化簡報/輝達算力金融化革命.html",
      "categoryKey": "cat-1779442954583",
      "order": 4
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
};
try { localStorage.setItem('pj_portal_config_published', JSON.stringify(window.PJ_PORTAL_CONFIG)); } catch (e) {}
