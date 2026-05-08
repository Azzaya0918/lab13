# CLAUDE.md — Mini Library Project

AI assistant-д зориулсан project context ба дүрмүүд.

## Project тойм

Mini Library: Node.js + Express + SQLite номын сан удирдлагын систем.
Код: `partB/src/` | Тест: `partB/tests/` | Frontend: `partB/public/`

## Build & Run команд

```bash
cd partB

# Dependencies суулгах
npm install

# Development server (nodemon)
npm run dev

# Production
npm start

# Тест
npm test
npm run test:watch
npm run test:coverage
```

## Кодын дүрмүүд (Conventions)

### Нэрлэлт
- Файл: `camelCase.js` (e.g. `bookService.js`)
- Хувьсагч/функц: `camelCase`
- Константа: `UPPER_SNAKE_CASE`
- Route: `kebab-case` (`/api/book-loans`)

### Express pattern
```js
// Controller: зөвхөн req/res — бизнес логик байхгүй
async function getBooks(req, res, next) {
  try {
    const books = await bookService.findAll(req.query);
    res.json({ success: true, data: books });
  } catch (err) {
    next(err);
  }
}

// Service: бизнес логик — database шууд дуудахгүй
// Model: SQL query — зөвхөн CRUD
```

### Response format
```json
{ "success": true, "data": {...} }
{ "success": false, "error": "message" }
```

### Error handling
- Бүх async function-д `try/catch` + `next(err)`
- `src/middleware/errorHandler.js` centralized handler
- HTTP status code зөв ашиглах (200, 201, 400, 404, 500)

### Database
- `better-sqlite3` — synchronous API, transaction дэмжинэ
- Prepared statement ҮРГЭЛЖ ашиглах — SQL injection хориотой
- Raw query string concatenation хориотой ❌

## No-Go Zones 🚫

```
# Хориотой зүйлс — ХЭЗЭЭ Ч битгий хий:

1. SQL string concatenation:
   ❌ db.prepare(`SELECT * FROM books WHERE id = ${id}`)
   ✅ db.prepare('SELECT * FROM books WHERE id = ?').get(id)

2. Нууц мэдээллийг hardcode хийх:
   ❌ const SECRET = 'mysecret123'
   ✅ process.env.SECRET

3. Error message-д stack trace харуулах (production):
   ❌ res.json({ error: err.stack })
   ✅ res.json({ error: 'Internal server error' })

4. node_modules commit хийх — .gitignore-д байх ёстой

5. Test-гүй feature merge хийх
```

## AI session дүрэм

- Hallucination эрсдэлтэй: package нэр, API syntax, SQLite-specific функц
- AI үүсгэсэн SQL query-г ЗААВАЛ manually шалгах
- `npm audit` тест болгон ажиллуулах
- Commit message-д `Co-Authored-By: Claude <noreply@anthropic.com>` нэмэх

## Slash commands

`.claude/commands/` дотор:
- `/review` — security + robustness шалгалт
- `/test` — edge case тест үүсгэх
- `/docs` — JSDoc + README хэсэг
- `/commit` — Conventional Commits message
- `/security` — OWASP Top 10 шалгалт
- `/refactor` — паттернаар refactor

## Git workflow

```
feat: add book search by author
fix: handle null due_date in loan query
test: add unit tests for loanService
docs: update API endpoint table
refactor: extract validation to middleware
chore: add nodemon dev dependency
```

Branch: `main` (stable) | Feature branch-ийг нэгтгэхдээ PR ашиглавал давуу.
