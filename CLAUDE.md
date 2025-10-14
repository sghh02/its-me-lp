# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) がこのリポジトリでコードを扱う際のガイダンスを提供します。

## プロジェクト概要

"it's me" の多言語対応ランディングページ - 価値観診断アプリとAIアドバイザー機能を持つアプリのための静的ウェブサイトです。バニラHTML、CSS、JavaScriptで構築され、GitHub PagesやNetlifyなどの静的ホスティングサービスでの配信向けに設計されています。

## アーキテクチャ

### 多言語構造
- **ルートレベル**: 英語（デフォルト） - `index.html`, `privacy-policy.html`, `terms-of-service.html`
- **言語ディレクトリ**: `ja/`, `ko/`, `es/` に各ページのローカライズ版を格納
- **共有アセット**: 全言語が `assets/` の共通CSS、JS、画像ファイルを使用

### 主要機能
- **言語検出**: ブラウザ言語自動検出と提案バナー表示
- **言語切り替え**: デスクトップ/モバイル言語セレクターの同期
- **プログレッシブエンハンスメント**: JavaScript無効時の代替表示（no-jsフォールバック）
- **スクリーンショットスライドショー**: ヒーローセクションでのアプリ画面回転表示
- **推薦文カルーセル**: アクセシビリティ対応の自動再生カルーセル
- **フェードインアニメーション**: Intersection Observer使用のスクロールアニメーション

### ファイル構造
```
├── index.html (英語)
├── assets/
│   ├── css/style.css
│   ├── js/
│   │   ├── script.js (メイン機能)
│   │   └── head-common.js (共通head要素の動的挿入)
│   └── images/ (キャラクターアイコン、スクリーンショット、バッジ)
├── ja/index.html (日本語)
├── ko/index.html (韓国語)
├── es/index.html (スペイン語)
├── manifest.json (PWAマニフェスト)
├── _headers (ホスティング用セキュリティヘッダー)
├── sitemap.xml
└── .gitignore
```

## 開発ガイドライン

### 変更作業時の注意点
- **コンテンツ更新**: 内容変更時は全言語版を同時に編集する
- **スタイリング**: `assets/css/style.css` のみ編集（全言語に影響）
- **JavaScript**: `assets/js/script.js` と `assets/js/head-common.js` を編集（全言語で共有）
- **言語固有変更**: 新言語追加時は既存のHTML構造パターンを使用

### 主要JavaScript関数
- `initLanguageSwitcher()`: 言語切り替えとナビゲーション処理
- `initLanguageDetection()`: 言語提案バナーの表示制御
- `initTestimonialCarousel()`: 推薦文スライドショー管理
- `initScreenshotSlideshow()`: アプリスクリーンショット回転表示
- **head-common.js**: セキュリティヘッダー、hreflang、favicon等の共通要素を動的挿入

### セキュリティ考慮事項
- Content Security Policyを`head-common.js`で動的設定
- 静的ホスティング用セキュリティヘッダーを`_headers`ファイルで設定
- 外部スクリプト依存なし（バニラJSのみ）
- クローラー/ボット検出でSEO安全性を確保

### SEO・アクセシビリティ
- 国際SEO向けhreflangタグを`head-common.js`で動的生成
- アプリ情報の構造化データ（JSON-LD）
- 全体にARIAラベルとセマンティックHTML使用
- インタラクティブ要素のキーボードナビゲーション対応

## よくある作業

### 新言語の追加
1. 新ディレクトリ作成（例: `fr/`）
2. `index.html`, `privacy-policy.html`, `terms-of-service.html`をコピー・翻訳
3. 全HTMLファイルの言語セレクターオプションを更新
4. `script.js`の言語検出関数に言語マッピングを追加
5. `head-common.js`のhreflang生成にURLパターンを追加

### アプリストアリンクの更新
- アプリ公開時にストアボタンのhref属性を変更
- ストアボタンから「Coming Soon」バッジを削除

### コンテンツ更新
- 全言語版を同時に更新
- 全言語で一貫した構造を維持
- コンテンツ変更後に言語切り替えをテスト

### 共通head要素の管理
- `assets/js/head-common.js`で一元管理
- セキュリティヘッダー、hreflang、faviconの変更は1箇所で反映
- 新言語追加時は`head-common.js`のURL生成ロジックを更新

## 技術的特徴

### 言語検出・提案システム
- **SEO安全**: ルートパス（`/`）でのみ動作、強制リダイレクトなし
- **クローラー対応**: User-Agent検出でボット・検索エンジンを除外
- **ユーザー体験**: localStorage での設定記憶、セッション管理

### パフォーマンス最適化
- 共通head要素の動的挿入で重複コード削減（約150行削減）
- 静的サイト構成で高速配信
- プログレッシブエンハンスメントでJavaScript無効環境にも対応

## デプロイメント
GitHub Pages、Netlify等の静的ホスティングサービス向けに最適化された静的サイトです。`_headers`ファイルが対応プラットフォームでセキュリティヘッダーを提供します。

## トラブルシューティング

### 言語検出が動作しない場合
- ルートパス（`/`または`/index.html`）でアクセスしているか確認
- ブラウザの開発者ツールでJavaScriptエラーをチェック
- localStorage/sessionStorageの設定を確認

### head要素が正しく挿入されない場合
- `head-common.js`の読み込みパスが正しいか確認
- ブラウザの開発者ツールでスクリプトエラーをチェック
- CSPエラーが発生していないか確認