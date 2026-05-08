# ADR-001: Stack сонголт — Node.js + Express + SQLite

## Статус

Батлагдсан (Accepted)

## Огноо

2025-05-08

## Контекст

Mini Library системийн хөгжүүлэлтийг эхлүүлэхийн өмнө технологийн stack сонгох шаардлагатай болсон. Гурван өөр stack-ийг харьцуулсан:

- **Stack A:** Node.js + Express + SQLite
- **Stack B:** Python + FastAPI + PostgreSQL
- **Stack C:** Ruby on Rails + PostgreSQL

Шийдвэр гаргахдаа дараах хүчин зүйлсийг харгалзсан:
- Жижиг масштаб (нэг номын сан, цөөн хэрэглэгч)
- Хөгжүүлэлтийн хугацаа богино (2 долоо хоног)
- Бие даалт 11-ийн өргөтгөл байх учраас өмнөх туршлагатай нийцэх
- AI-assisted development (Claude Code дэмжлэг)

## Шийдвэр

**Node.js + Express + SQLite** сонгогдлоо.

## Үндэслэл

### Node.js + Express сонгосон шалтгаан

**1. JavaScript нэг хэл** — Frontend (HTML/JS) болон backend хоёулаа нэг хэл ашиглана. Энэ нь cognitive overhead багасгаж, хөгжүүлэлтийн хурдыг нэмэгдүүлнэ.

**2. Хурдан эхлэх боломж** — `express()` дуудаад 10 мөр кодоор server ажиллана. FastAPI-д Pydantic model, Rails-д scaffold тохиргоо шаардлагатай.

**3. npm ecosystem баялаг** — `jest`, `supertest`, `better-sqlite3`, `nodemon` бүгд нэг `npm install`-аар суугдана.

**4. Claude Code дэмжлэг шилдэг** — AI-assisted development workflow-д Node.js/Express-ийн pattern-ийг хамгийн сайн generate, review хийдэг.

### SQLite сонгосон шалтгаан

**1. Zero configuration** — Server суулгах, тохиргоо хийх шаардлагагүй. `.db` файл нэг л зүйл.

**2. Масштаб нийцтэй** — Нэг номын санд зориулсан system. PostgreSQL-ийн хүч шаардлагагүй.

**3. `better-sqlite3` synchronous API** — Express-ийн async middleware-тэй сайн нийцдэг, transaction дэмжинэ.

### Stack B татгалзсан шалтгаан

FastAPI хурдан боловч Python-д async pattern нэмэлт complexity үүсгэнэ. PostgreSQL local суулгах, `asyncpg` connection pool тохиргоо богино хугацаанд ачаалал болно.

### Stack C татгалзсан шалтгаан

Rails-ийн "magic" нь debugging-ийг хүндрүүлдэг. AI tool дэмжлэг Stack A, B-ээс доогуур. Ruby-ийн туршлага бага.

## Үр дагавар

### Эерэг
- Хурдан хөгжүүлэлт
- Нэг хэл (JS) front+back
- SQLite — тест, deploy хялбар
- AI workflow-д оновчтой

### Сөрөг / Эрсдэл
- SQLite concurrent write боломжгүй → Жижиг library-д тул асуудал биш
- Type safety байхгүй → JSDoc annotation нэмнэ
- Scale шаардлагатай болвол PostgreSQL рүү migrate хийх шаардлагатай → Одоогоор scope-оос гадна

## Холбоотой шийдвэр

- ADR-002 (build явцад тулгарсан шийдвэр — partC-д)
- STACK-COMPARISON.md — дэлгэрэнгүй харьцуулалт
