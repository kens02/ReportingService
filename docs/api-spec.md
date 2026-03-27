# API仕様

## 認証方式
- NextAuth セッション（Credentials）
- POST/PUT/DELETE はログイン必須

## エンドポイント一覧
- `GET /api/reports`
- `POST /api/reports`
- `GET /api/reports/:id`
- `PUT /api/reports/:id`
- `DELETE /api/reports/:id`

## リクエスト例
### POST /api/reports
```json
{
  "title": "Weekly Sales",
  "description": "Sales by day",
  "chartType": "BAR",
  "labels": "Mon,Tue,Wed",
  "values": "120,98,140"
}
```

### PUT /api/reports/:id
```json
{
  "title": "Updated Report",
  "description": "Updated description",
  "chartType": "LINE",
  "labels": "Jan,Feb,Mar",
  "values": "10,20,30"
}
```

## レスポンス例
### GET /api/reports
```json
{
  "data": [
    {
      "id": "ck...",
      "title": "Weekly Sales",
      "description": "Sales by day",
      "chartType": "BAR",
      "data": { "series": [{ "label": "Mon", "value": 120 }] },
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-01T00:00:00.000Z"
    }
  ],
  "page": 1,
  "total": 1,
  "totalPages": 1
}
```

## ステータスコード
- 200: 正常
- 201: 作成成功
- 400: バリデーションエラー
- 401: 認証エラー
- 404: データなし
- 500: サーバーエラー
