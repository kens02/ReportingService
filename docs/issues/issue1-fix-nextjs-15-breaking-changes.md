### Summary
Next.js 15 へのアップグレードに伴う破壊的変更（searchParams の非同期化および use server ファイルのエクスポート制限）によりアプリケーションが実行不能になるエラーを修正します。

### Prerequisites
- **Framework:** Next.js 15.x
- **Affected Files:** - `app/page.tsx`
  - `app/reports/actions.ts`
- **Reproducible:** Always (Runtime Error)

### Step to Reproduce
1. `npm run dev` で開発サーバーを起動
2. ブラウザでトップページ（/）にアクセス
3. 実行時のコンソールおよびブラウザ上のエラーを確認

### Actual Behavior
以下の２つのエラーが発生し、ページが正常にレンダリングされません。
#### Error1: `searchParams` unwrap error
Error: Route "/" used ``searchParams.page``. `searchParams` is a Promise and must be unwrapped with `await` or `React.use()` before accessing its properties.`
#### Error2: Invalid Server Action export
`Error: A "use server" file can only export async functions, found object.`

### Expected Behavior
1. `app/page.tsx`において、`searchParams`が非同期（Promise）として適切に処理（`await`または`use()`）され、プロパティにアクセスできること。
2. `app/reports/actions.ts`(`use server`)からは非同期関数のみがエクスポートされ、定数等のエクスポートによるビルドエラーが発生しないこと。

### Proposed Solution / Fix Plan
- `app/page.tsx`:
  - Pageコンポーネントの引数`searchParams`を`await`で解決するように修正
  - `const { page } = await searchParams;`の形式を採用
- `app/reports/actions.ts`:
  - `export const initialFormState`の定義を別ファイル（例：`types.ts`または`constants.ts`）に移動、もしくは使用前のコンポーネント内にカプセル化する。