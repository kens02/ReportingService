# 詳細設計

## クラス設計
- `prisma` (PrismaClient): DB 接続管理
- `ReportForm` (React Component): 入力フォームとバリデーション結果表示
- `ReportChart` (Client Component): Recharts による可視化

## モジュール設計
- `app/reports/actions.ts`: 作成/更新/削除のユースケース
- `lib/validators/report.ts`: 入力バリデーションとデータ変換
- `app/api/reports/*`: REST API

## インターフェース仕様
- `createReport(formData)`: レポート作成
- `updateReport(formData)`: レポート更新
- `deleteReport(formData)`: レポート削除

## 処理フロー
1. フォーム送信
2. Server Action で認証チェック
3. バリデーション
4. Prisma で DB 更新
5. リダイレクト or 再描画

## 状態遷移
- 未認証: 作成/編集画面は `/signin` へ遷移
- 認証済み: CRUD 操作が可能

## エラー設計
- 入力エラー: フィールド単位のメッセージ表示
- 認証エラー: 401 またはメッセージ表示
- 予期しないエラー: `app/error.tsx` で表示

## ログ仕様
- Prisma のエラーログを出力
- 重大エラーは `console.error` に記録

## バリデーション仕様
- タイトル: 3〜80文字
- 説明: 5〜280文字
- ラベル/値: カンマ区切りで1件以上
- チャート種別: `BAR` / `LINE`

## データ保持仕様
- `data` カラムは JSON 文字列として `{"series":[{"label","value"}]}` を保存
