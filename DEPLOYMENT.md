# Netlify 部署指南

## 🚀 快速開始

### Step 1: 連接 GitHub 倉庫到 Netlify

1. 登入 [app.netlify.com](https://app.netlify.com)
2. 點擊 **"New site from Git"**
3. 選擇 **GitHub** 作為提供商
4. 搜索並選擇 **`pj-capital-portal`** 倉庫

### Step 2: 配置部署設定

Netlify 會自動偵測 `netlify.toml`，你只需確認：

| 設定 | 值 |
|------|-----|
| **Build command** | （留空 - 自動使用 netlify.toml） |
| **Publish directory** | `.` (根目錄) |
| **Base directory** | `.` (根目錄) |

**不要改這些設定！** netlify.toml 已經配置好了。

### Step 3: 部署環境變數

點擊 **Site settings → Environment** 添加以下變數（如需要）：

```
（暫時不需要，保留為空）
```

### Step 4: 配置自訂域名（可選）

1. 進入 **Domain management**
2. 點擊 **Add custom domain**
3. 輸入你的域名（例如 `portal.yourdomain.com`）
4. 更新 DNS 設定為 Netlify 提供的值

DNS 更新通常需要 24-48 小時生效。

---

## 📋 工作流程

### 本地開發

```bash
# 1. 編輯文件（HTML、配置等）
# 2. 測試本地預覽（用瀏覽器打開 index.html）
# 3. 提交變更
git add .
git commit -m "Update portal content"

# 4. 推送到 GitHub
git push origin main
```

### 自動部署

**每當你 `git push` 時：**

1. ✅ GitHub Actions 自動觸發
2. ✅ 部署信息發送到 Netlify
3. ✅ Netlify 自動部署新版本
4. ✅ PR 會自動得到部署預覽連結

**查看部署狀態：**

- GitHub: 進入 repo → **Actions** 標籤查看工作流運行狀態
- Netlify: 進入 [app.netlify.com](https://app.netlify.com) → 選擇你的 site → **Deploys**

---

## 🔄 版本控制

### 推薦的分支策略

```
main
  ↑
  └─── 所有穩定部署（自動部署到生產環境）

feature/*
  ↑
  └─── 開發分支（Netlify 自動生成預覽）
```

#### 推送到 main（生產部署）

```bash
git checkout main
git merge your-feature-branch
git push origin main
```

生產部署立即開始，預計 1-2 分鐘完成。

#### 推送到功能分支（預覽部署）

```bash
git checkout -b feature/add-new-report
# 編輯文件...
git push origin feature/add-new-report
```

GitHub Actions 會創建預覽，PR 中自動添加預覽連結。

---

## 📊 配置說明

### netlify.toml 包含的內容

| 部分 | 用途 |
|------|------|
| `[build]` | 構建設定（純靜態，無需編譯） |
| `[[redirects]]` | URL 重定向規則（支持 SPA 路由） |
| `[[headers]]` | HTTP 安全標頭和緩存策略 |

### 緩存策略

- **HTML 文件**: 禁用緩存（總是取最新版本）
- **portal-config.js**: 禁用緩存（保證配置最新）
- **靜態資源** (PNG, PDF): 長期緩存（節省頻寬）

---

## ⚠️ 常見問題

### Q: 我編輯了文件，為什麼網站還是舊版本？

**A:** 檢查以下項目：

1. ✅ 確認 `git push` 成功（檢查 GitHub 上的文件）
2. ✅ 檢查 GitHub Actions 是否通過（Actions 標籤）
3. ✅ 硬刷新瀏覽器（Ctrl+Shift+R 或 Cmd+Shift+R）
4. ✅ 檢查 Netlify Deploy 日誌是否成功

### Q: 如何回滾到舊版本？

**A:** 在 Netlify 的 **Deploys** 標籤中：

1. 找到之前的部署
2. 點擊 **Restore** 按鈕
3. 系統自動回滾到該版本

### Q: 預覽部署失敗怎麼辦？

**A:**

1. 檢查 GitHub Actions 日誌（Actions 標籤）
2. 查看具體的錯誤信息
3. 修復問題後重新 push

### Q: 如何查看實時部署日誌？

**A:**

- **Netlify**: app.netlify.com → Deploys → 點擊部署 → View logs
- **GitHub**: repo → Actions → 選擇工作流 → 查看詳細信息

---

## 🔐 安全性

### 環境變數管理

如果未來需要環境變數（API 密鑰等）：

1. **不要** commit `.env` 文件到 Git
2. 在 Netlify 上配置（Site settings → Environment）
3. 在 JavaScript 中通過 `process.env` 訪問

### GitHub Secrets

GitHub Actions 已自動配置 `GITHUB_TOKEN`。如需 Netlify token：

1. 從 Netlify 獲取 auth token
2. 在 GitHub repo 設定中添加 **Secrets**:
   - `NETLIFY_AUTH_TOKEN`
   - `NETLIFY_SITE_ID`

---

## 📞 支持

**如遇問題:**

- Netlify 文檔: [docs.netlify.com](https://docs.netlify.com)
- GitHub Actions 文檔: [docs.github.com/actions](https://docs.github.com/actions)

---

**最後更新**: 2026-07-06
**由 Claude 自動生成**
