# Mini Library 📚

Номын сан удирдлагын жижиг вэб систем. Node.js + Express + SQLite дээр бүтсэн.

## Онцлог

- 📖 Номын нэмэх, засах, устгах, хайх
- 👤 Гишүүний бүртгэл, удирдлага
- 🔄 Зээлэлт олгох, буцаалт бүртгэх
- 🔍 Нэр, зохиогч, жанраар хайх/шүүх
- 📊 Dashboard статистик

## Шаардлага

- Node.js >= 18
- npm >= 9

## Суулгах

```bash
git clone <repo-url>
cd bie-daalt-13/partB
npm install
```

## Ажиллуулах

```bash
# Development (auto-reload)
npm run dev

# Production
npm start
```

Браузерт: `http://localhost:3000`

## Тест ажиллуулах

```bash
# Бүх тест
npm test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage
```

## API

OpenAPI spec: `partB/openapi.yaml`

Үндсэн endpoints:

| Method | Path | Тайлбар |
|--------|------|---------|
| GET | `/api/books` | Бүх ном |
| POST | `/api/books` | Ном нэмэх |
| PUT | `/api/books/:id` | Ном засах |
| DELETE | `/api/books/:id` | Ном устгах |
| GET | `/api/members` | Гишүүд |
| POST | `/api/members` | Гишүүн нэмэх |
| POST | `/api/loans` | Зээлэлт олгох |
| PUT | `/api/loans/:id/return` | Буцаалт |
| GET | `/api/stats` | Статистик |

## Бүтэц

```
partB/
├── src/
│   ├── index.js          # Entry point
│   ├── db.js             # SQLite connection
│   ├── routes/           # Express routers
│   ├── controllers/      # Request handlers
│   ├── services/         # Business logic
│   └── middleware/       # Error, validation
├── public/               # Frontend static files
├── tests/                # Jest test files
└── openapi.yaml
```

## Хөгжүүлэгч

F.CSM311 — Бие даалт 13  
ШУТИС — МХТС
