# プロジェクト概要
このプロジェクトは TODO: このアプリの目的を説明する（例: タスク管理アプリ）です。

- GitHubリポジトリ：TODO: GitHub URL を設定する
- 主要機能：TODO: 主要機能を列挙する

## 技術スタック
- 言語：TODO: TypeScript / JavaScript / HTML / CSS
- フレームワーク：TODO: Next.js / Vite / React などを記載
- スタイリング：TODO: Tailwind CSS / CSS Modules / plain CSS
- データベース・認証：TODO: Supabase を利用する場合のみ記載
- ホスティング：TODO: Vercel / Cloud Run / その他

## 開発コマンド
- 開発サーバー起動：`npm run dev`（TODO: package.json の scripts を確認）
- ビルド：`npm run build`（TODO: package.json の scripts を確認）
- Lint：`npm run lint`（TODO: package.json の scripts を確認）
- テスト：`npm test`（TODO: package.json の scripts を確認）

## コーディング規約

### 全般
- コメントは日本語で書く
- 変数名・関数名は英語のキャメルケース
- 定数は大文字スネークケース
- 真偽値は `is` / `has` / `can` で始める

### フレームワーク・コンポーネントの命名規約
- コンポーネント名・ファイル名はパスカルケース
- 1ファイルにつき1コンポーネントを基本とする
- カスタムフックは `use` で始める
- イベントハンドラは `handle` で始める
- ページ・ルートのディレクトリ名はケバブケース
- 型・インターフェースはパスカルケース

## 環境変数
- `.env` 系の秘密情報はコミットしない
- 例: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- 実値は記載せず、変数名のみを使う

## Git運用ルール
- 変更ごとにコミットして履歴を残す
- 1コミット1変更を基本とする
- `git status` を確認して、秘密情報を含むファイルが混ざっていないかを見る
- `git push --force` は使わない
- `git reset --hard` は用途が明確な場合のみ、事前に確認して実行する

## 禁止事項
- `rm -rf` コマンドは絶対に実行しない
- `.env` ファイルの読み取り・書き換え・削除をしない
- `package.json` の依存パッケージを無断で変更しない
- APIキーやシークレットをコードへ直接書かない
- `supabase/migrations/` の既存ファイルを直接書き換えない
- TODO: 変更してはいけないファイル・処理を必要に応じて追記する

## 返答ルール
- 返答は必ず日本語で行う
- 変更したファイル名を明記する
- 重要な判断は理由と影響範囲を簡潔に説明する
