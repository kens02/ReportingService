# ReportingService

集計データをレポートとして保存し、チャートで可視化する Next.js アプリです。Vercel へのデプロイを前提に、Server Components と Server Actions を中心に構成しています。

## 主な機能
- レポート一覧（ページネーション）
- レポート作成 / 編集 / 削除
- レポート詳細とグラフ表示
- REST API（CRUD）
- NextAuth によるデモ認証

## プロジェクト構成
```
app/
  api/
  reports/
components/
  report/
  ui/
lib/
prisma/
tests/
```

## セットアップ
推奨: Node.js 20 / 22（LTS）
```bash
./setup.sh
```

手動で行う場合:
```bash
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run seed
npm run dev
```

## テスト
```bash
npm test
```

## 環境変数
- `DATABASE_URL`: SQLite の接続先
- `NEXTAUTH_URL`: NextAuth 用 URL
- `NEXTAUTH_SECRET`: 署名用の秘密鍵
- `DEMO_USER_EMAIL`: デモユーザーのメールアドレス
- `DEMO_USER_PASSWORD`: デモユーザーのパスワード

Vercel での設定例:
Production
- `DATABASE_URL`: `file:./dev.db`（SQLite。Production で使う場合は外部DB推奨）
- `NEXTAUTH_URL`: `https://your-project.vercel.app`
- `NEXTAUTH_SECRET`: 32文字以上のランダム文字列
- `DEMO_USER_EMAIL`: `demo@example.com`
- `DEMO_USER_PASSWORD`: `password123`

Preview
- `DATABASE_URL`: `file:./dev.db`
- `NEXTAUTH_URL`: `https://your-project-git-branch.vercel.app`
- `NEXTAUTH_SECRET`: Production と同一でOK
- `DEMO_USER_EMAIL`: `demo@example.com`
- `DEMO_USER_PASSWORD`: `password123`

## Vercel デプロイ手順（Next 16対応）
1. Vercel にリポジトリを接続
2. 環境変数を `Vercel Project Settings` に登録
3. Project Settings の Build Command を `npm run build` に設定
4. Project Settings の Install Command を `npm install` に設定
5. Project Settings の Output Directory を `.next` に設定
6. Build & Development Settings の Build Command を `npm run build && npx prisma migrate deploy` に変更
7. デプロイを実行

## Preview / Production の運用ヒント
- Preview では `NEXTAUTH_URL` を Preview 用ドメインに合わせる
- Production/Preview で同じ `NEXTAUTH_SECRET` を使っても良いが、必要に応じて分ける
- 本番運用では SQLite ではなく外部DB（PostgreSQL等）への移行を推奨

## 拡張案
1. ユーザー管理を追加し、レポートの所有者を保持する
2. CSV/JSON のインポート機能
3. レポート共有リンクとアクセス権限
4. 複数系列のチャート対応
