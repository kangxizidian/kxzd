# 康熙字典逐字查

## 特色

* 免服務器。單機網路都免安裝。
* htm 檔就是資料庫。
* 從康熙連原書，原書開新視窗，也可查康熙。
* 每個字都可以點，嵌入到閱讀中的段落。
* 簡單的連接原書的機制。
  參見標記範例

## 檔案格式

瀏覽器限制，不能用空標籤。
```html
    <t/>xxx     ← 不能這樣
    <t>xxx</t>  ← 必須這樣
```

一開頭必須引用 kxzd.js，kxzd.css 可以改成別的 css

html 太大會影響載入時間。

```html
<!DOCTYPE html><html><head><meta charset='utf-8'>
<meta name='viewport' content='width=device-width,initial-scale=1'>
<link rel='stylesheet' href='../kxzd/kxzd.css'>
<script defer src='../kxzd/kxzd.js'></script></head><body><xml>資料.....
</xml></body></html>
```

原書的標記方法，可參考 cct/aow.htm ( 孫子兵法 art-of-war ) ，文段以 &lt;t&gt; 包住，
嵌入窗會出現於&lt;/t&gt; 之後。 所以文段不宜太大。因為kxzd.css 的 xml {white-space:pre-wrap} 指定了保留換行的模式，&lt;p&gt;會造成很多空白。

### 發佈檔案
所有 html 檔 (可編輯)

kxzd.css 樣式 (可編輯)

kxzd.js  主程式 (不能手動編輯)

filewordhead.js 字頭所在檔案對照表(不能手動編輯)。

src不需要發佈到服務器的檔案（但重建需要）。


## 字頭搜尋

主程式: ziyin/index.html ， 從 github.com/hanziku/hanziyin-app 而來

## 必須重建的情況

1. 字頭改變
    即 <a name="unicode值"></a> 的值改變


2. 或，檔案切分改變
    
    到 src 目錄，執行
    node build-filewordhead.js
    得到
    filewordhead.js

## 建逆向連結

    從原文連回康熙字典

    在src 目錄下，執行node build-backlink，得
    backlinks.js

    只要康熙字典加了原書連結 (k 標記) 都可以做一次，但非必要。


## 重建 kxzd.js (限開發人員)

node v14 以上，不依賴其他套件，假設 rollup 已裝好

    npm run build