# Mini Library System — Part B

Mini номын сангийн удирдлагын REST API. Ном, гишүүн, зээлийн бүртгэл хийх боломжтой.

## Технологи

| Хэрэгсэл | Хувилбар |
|-----------|----------|
| Node.js | v20.x |
| Express | v4.x |
| SQLite (better-sqlite3) | v9.x |
| Jest | v29.x |
| express-async-handler | v1.x |

---

## Суулгах

```bash
# Repository clone хийх
git clone https://github.com/<username>/bie-daalt-13.git
cd bie-daalt-13/partB

# Dependency суулгах
npm install
```

---

## Ажиллуулах

```bash
# Development (nodemon-тай)
npm run dev

# Production
npm start
```

Сервер `http://localhost:3000` дээр ажиллана.

Анхны ажиллуулалтад `library.db` файл автоматаар үүсч, хүснэгтүүд болон seed өгөгдөл нэмэгдэнэ.

---

## Тест ажиллуулах

```bash
# Бүх тест
npm test

# Watch mode
npm run test:watch

# Coverage тайлан
npm run test:coverage
```

---

## Файлын бүтэц

```
partB/
├── src/
│   ├── app.js              # Express app тохиргоо
│   ├── server.js           # Entry point
│   ├── db.js               # SQLite холболт, migration, VIEW
│   ├── controllers/
│   │   ├── bookController.js
│   │   ├── memberController.js
│   │   └── loanController.js
│   ├── services/
│   │   ├── bookService.js
│   │   ├── memberService.js
│   │   └── loanService.js
│   ├── repositories/
│   │   ├── bookRepository.js
│   │   ├── memberRepository.js
│   │   └── loanRepository.js
│   ├── routes/
│   │   ├── bookRoutes.js
│   │   ├── memberRoutes.js
│   │   └── loanRoutes.js
│   └── middleware/
│       ├── errorHandler.js
│       └── validate.js
├── tests/
│   ├── book.test.js
│   ├── member.test.js
│   └── loan.test.js
├── openapi.yaml
├── README.md
└── package.json
```

---

## API Endpoint-ууд

### Ном (Books)

| Method | Endpoint | Тайлбар |
|--------|----------|---------|
| GET | `/api/books` | Бүх ном жагсаах (search, filter дэмжинэ) |
| GET | `/api/books/:id` | Нэг номын дэлгэрэнгүй |
| POST | `/api/books` | Шинэ ном нэмэх |
| PUT | `/api/books/:id` | Номын мэдээлэл засах |
| DELETE | `/api/books/:id` | Ном устгах |

**Query параметр:** `?search=гарчиг`, `?author=зохиолч`, `?available=true`

### Гишүүн (Members)

| Method | Endpoint | Тайлбар |
|--------|----------|---------|
| GET | `/api/members` | Бүх гишүүн |
| GET | `/api/members/:id` | Гишүүний дэлгэрэнгүй + идэвхтэй зээл |
| POST | `/api/members` | Шинэ гишүүн бүртгэх |
| PUT | `/api/members/:id` | Гишүүний мэдээлэл засах |
| DELETE | `/api/members/:id` | Гишүүн устгах |

### Зээл (Loans)

| Method | Endpoint | Тайлбар |
|--------|----------|---------|
| GET | `/api/loans` | Бүх зээл (`?status=active/returned/overdue`) |
| GET | `/api/loans/:id` | Зээлийн дэлгэрэнгүй |
| POST | `/api/loans` | Шинэ зээл үүсгэх |
| PATCH | `/api/loans/:id/return` | Ном буцааж өгсөн тэмдэглэх |

---

## Feature жагсаалт

| # | Feature | Тайлбар |
|---|---------|---------|
| 1 | Book CRUD | Ном нэмэх, засах, устгах, жагсаах |
| 2 | Member Management | Гишүүн бүртгэл, идэвхтэй зээлийн тоо |
| 3 | Loan Tracking | Зээл үүсгэх, буцаах, хугацаа тооцоолох |
| 4 | Search & Filter | ISBN, гарчиг, зохиолчоор хайх |
| 5 | Overdue Detection | Хугацаа хэтэрсэн зээлийг автоматаар илрүүлэх |

---

## Жишээ хүсэлт

```bash
# Шинэ ном нэмэх
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{"title":"Монгол нууц товчоо","author":"Аноним","isbn":"9789992930123","quantity":3}'

# Зээл үүсгэх
curl -X POST http://localhost:3000/api/loans \
  -H "Content-Type: application/json" \
  -d '{"book_id":1,"member_id":1}'

# Ном буцаах
curl -X PATCH http://localhost:3000/api/loans/1/return

# Хугацаа хэтэрсэн зээл харах
curl http://localhost:3000/api/loans?status=overdue
```

---

## AI ашиглалт

Энэ хэсгийн хөгжүүлэлтэд Claude Sonnet 4.6 ашигласан. AI-ийн оролцоог бүх commit-д `Co-Authored-By: Claude <noreply@anthropic.com>` тэмдэглэсэн. Дэлгэрэнгүй: `partB/ai-sessions/`.