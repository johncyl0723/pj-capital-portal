// P&J Capital Portal — Content Configuration
// Workflow: open admin.html locally → edit → click "匯出 portal-config.js" → replace this file → git push
localStorage.setItem('pj_portal_config', JSON.stringify({
    "monthlyReports":  [
                           {
                               "key":  "202601",
                               "label":  "2026 年 01 月",
                               "src":  "./2026_01/202601_Monthly Report_index.html"
                           },
                           {
                               "key":  "202602",
                               "label":  "2026 年 02 月",
                               "src":  "./2026_02/202602_Monthly Report_index.html"
                           },
                           {
                               "key":  "202604",
                               "label":  "2026 年 04 月",
                               "src":  "./2026_04/202604_Monthly Report_index.html"
                           },
                           {
                               "key":  "202603",
                               "label":  "2026 年 03 月",
                               "src":  "./2026_03/202603_Monthly Report_index.html"
                           }
                       ],
    "topics":  [
                   {
                       "key":  "topic-slr",
                       "title":  "SLR改革_財政主導的金融新時代",
                       "body":  "",
                       "src":  "./SLR改革_財政主導的金融新時代.pdf",
                       "categoryKey":  ""
                   },
                   {
                       "key":  "topic-rmp",
                       "title":  "新貨幣時代的序幕解碼RMP",
                       "body":  "",
                       "src":  "./新貨幣時代的序幕解碼RMP.pdf",
                       "categoryKey":  ""
                   }
               ],
    "categories":  [

                   ]
}));