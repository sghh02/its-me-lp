# Repository Guidelines

このリポジトリは Netlify で配信する多言語（ja/ko/es）対応の静的ランディングサイトです。変更は最小限・アクセシブル・高速を基本方針とします。

## プロジェクト構成
- ルート: `index.html`（英語）。各言語は `ja/`, `ko/`, `es/` 配下に `index.html`、`privacy-policy.html`、`terms-of-service.html`。
- アセット: CSS `assets/css/`、JS `assets/js/`、画像 `assets/images/`。
- 設定: `netlify.toml`（リダイレクト/ヘッダ/キャッシュ）、`_headers`、`sitemap.xml`、`robots.txt`、`manifest.json`。
- ビルド工程は導入しないでください（リポジトリ直下を公開）。

## 開発・動作確認コマンド
- 簡易サーバ: `python3 -m http.server 8080` → `http://localhost:8080` を確認。
- Netlify エミュレーション: `netlify dev`（導入済みの場合）。リダイレクトやヘッダ検証に有用。
- リンクチェック（任意）: `npx linkinator http://localhost:8080`。

## コーディング規約・命名
- 文字コード UTF-8、改行 LF、インデント 2 スペース。
- HTML: セマンティック要素と `alt`/`aria-*` を徹底。インラインの `<style>`/`<script>` は避け、主 CSS は `assets/css/style.css`。
- CSS: 小文字・ハイフン区切りのクラス名。関連ルールを近接配置。ユーティリティは最小限。
- JS: 依存を増やさず ES6 の素の DOM 操作。範囲を絞ったセレクタ、インラインイベント禁止。配置は `assets/js/`。
- ファイル名: 小文字・ハイフン（例: `privacy-policy.html`）。

## テスト指針
- 各言語での手動確認: ナビゲーション、言語切替、フォーム、メタタグ。
- SEO 重要タグ（`title`、`meta description`、OG/Twitter、canonical）をロケール別に検証。
- 開発者ツールで帯域制限し、ブロッキングやコンソールエラーが無いことを確認。

## コミット & PR
- コミット: 簡潔な命令形サマリ。関連変更をまとめ、必要に応じて Issue 番号を参照。
- PR: 目的/範囲、UI の Before/After スクショ、更新したロケールの明記。`netlify dev` でリンク/ヘッダ/リダイレクトの維持を確認。

## セキュリティと設定
- `_headers` と `netlify.toml` の整合を保つ（キャッシュ/リダイレクトは `netlify.toml` を優先）。
- 機密情報は置かない（静的公開サイト）。新規アセットには適切な Cache-Control を追加。

## エージェント向け指示（重要）
- 本リポジトリに関する説明・提案・レビューの回答は日本語で行ってください（コードやコマンドは英語表記のままで可）。
