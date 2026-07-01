# TOHO 電動バイク プレミアムWebプロトタイプ

Next.js / TypeScript / Tailwind CSS / Framer Motion / GSAP / Lenis / Lucide Icons で構成したシングルページ型ブランドサイトです。

## 公式サイトから使用した事実情報

- 公式ロゴ: https://toho-corporation.com/wp-content/uploads/2020/09/logo3.png
- 社名: 株式会社TOHO
- 代表者: 舞鶴 浩也
- 本社所在地: 〒110-0016 東京都台東区台東2丁目19番10号 キムラヤビル5F
- 資本金: 2000万円
- 設立: 1992年11月
- 事業内容: 季節家電、調理家電、AV機器、ドライブレコーダーの輸入・卸
- 製品カテゴリ: カー用品、AV機器、調理家電、白物家電、季節家電、防災用品、電動自転車・バイク、その他
- サポートコールセンター: 03-6803-0191
- 営業窓口: 03-3833-4261

## 実行

この環境では外部プロセス起動制限により npm install / build / dev server は実行できませんでした。通常環境では以下で確認できます。

```bash
npm install
npm run dev
```

## 2026-06-30 添付フィードバック反映

最新ソースとして feedback.pptx と添付画像2点を反映しました。

- Hero画像を `3da4a52c-731d-4fa4-84d0-340c97ba14da.png` 由来の `public/media/hero-commute-latest.png` に差し替え
- Specs画像を `fd3c8437-981b-4a16-b568-9b4b2b3dce02.png` 由来の `public/media/spec-product-latest.png` に差し替え
- 明るい背景セクションでロゴとナビゲーションが背景に溶け込まないよう、スクロール位置に応じてナビの背景・文字色・ロゴ表示を自動切替
- 未使用になった旧Hero/Specs画像を削除

この環境では外部プロセス起動制限により npm install / typecheck / build / dev server は実行できませんでした。通常環境では以下で確認できます。

```bash
npm install
npm run typecheck
npm run build
```

## 2026-07-01 TOHO-TypeB.pptx 反映

添付された `TOHO-TypeB.pptx` を最新ソースとして、既存プロジェクトに差分反映しました。

- キービジュアルの男性に自然な黒い自転車用ヘルメットを追加した新Hero画像 `public/media/hero-commute-helmet.png` を作成し、HeroとOG画像に反映
- Hero見出しを `街を、 / スマートに走る` に変更
- Story見出しを `移動は、 / 毎日を変える体験になる。` に変更
- Design見出しを `たためるから、 / 行ける場所が広がる。` に変更
- Specs見出しを `毎日の移動を支える、 / 確かなスペック` に変更
- Safety/Light見出しを `夜の街にも / 光を照らす` に変更
- Campaign見出しを `走り出す日は、 / もうすぐ` に変更
- 旧Hero画像 `hero-commute-latest.png` を未使用アセットとして削除

