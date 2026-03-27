# データ設計

## ER図（テキスト表現）
```
Report (1)
  - id (PK)
  - title
  - description
  - chartType
  - data (TEXT)
  - createdAt
  - updatedAt
```

## テーブル定義
### Report
| カラム | 型 | 制約 | 説明 |
| --- | --- | --- | --- |
| id | String | PK | レポートID |
| title | String | NOT NULL | タイトル |
| description | String | NOT NULL | 説明 |
| chartType | String | NOT NULL | BAR / LINE |
| data | String | NOT NULL | `{"series":[{"label","value"}]}` のJSON文字列 |
| createdAt | DateTime | NOT NULL | 作成日時 |
| updatedAt | DateTime | NOT NULL | 更新日時 |

## インデックス戦略
- PK による検索が中心
- 一覧は `createdAt` 降順で取得

## 正規化方針
- 1テーブル構成で十分なため、正規化は最小限
- グラフ用データは JSON として保持

## トランザクション方針
- CRUD は単一テーブルのため単一トランザクション
- 更新は Prisma の単一操作で完結
