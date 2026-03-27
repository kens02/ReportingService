# アーキテクチャ設計

## アーキテクチャ概要
- Next.js App Router を中心にしたサーバー/クライアント混在構成
- Server Components でデータ取得と描画を担当
- 変更操作は Server Actions と Route Handlers を併用
- Prisma + SQLite をデータ永続化層に採用

## レイヤー構成
1. Presentation
- `app/` と `components/` が UI を担当
- Recharts は Client Component として分離

2. Application
- `app/reports/actions.ts` にユースケース処理を集約
- 認証チェックとバリデーションを統合

3. Infrastructure
- `lib/prisma.ts` が DB との接続管理
- `app/api/*` で外部 API として CRUD 提供

## 主要フロー
- レポート一覧/詳細: Server Component -> Prisma -> DB
- レポート作成/更新: Form -> Server Action -> Prisma -> DB
- API CRUD: Route Handler -> Prisma -> DB

## 設計上のポイント
- 依存の向きは UI -> アクション -> Prisma に限定
- バリデーションは `lib/validators` に集中し再利用
- データ構造は `data.series` で統一し、グラフ描画で共有
