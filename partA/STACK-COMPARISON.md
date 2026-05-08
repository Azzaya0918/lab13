# Stack Харьцуулалт

## Харьцуулсан 3 stack

### Stack A — Node.js + Express + SQLite
| Шалгуур | Үнэлгээ | Тайлбар |
|---------|---------|---------|
| Хурд | ⭐⭐⭐⭐⭐ | Event-loop, non-blocking I/O |
| Суралцах хялбар | ⭐⭐⭐⭐ | JS нэг хэл front+back |
| Ecosystem | ⭐⭐⭐⭐⭐ | npm-д маш олон package |
| SQLite | ⭐⭐⭐⭐ | Zero-config, file-based, жижиг app-д тохиромжтой |
| Production | ⭐⭐⭐ | Scale хийхэд PostgreSQL рүү шилжих хэрэгтэй |
| AI tool support | ⭐⭐⭐⭐⭐ | Claude Code-д маш сайн дэмжигдсэн |

**Хамгийн тохиромжтой:** Full-stack JS, хурдан prototype, жижиг-дунд app

---

### Stack B — Python + FastAPI + PostgreSQL
| Шалгуур | Үнэлгээ | Тайлбар |
|---------|---------|---------|
| Хурд | ⭐⭐⭐⭐⭐ | Async/await, ASGI, маш хурдан |
| Суралцах хялбар | ⭐⭐⭐ | Python сайн, гэхдээ async pattern хэцүү |
| Ecosystem | ⭐⭐⭐⭐ | Pydantic, SQLAlchemy, Alembic |
| Auto OpenAPI | ⭐⭐⭐⭐⭐ | Built-in Swagger UI |
| PostgreSQL | ⭐⭐⭐⭐⭐ | Production-grade, хүчирхэг |
| AI tool support | ⭐⭐⭐⭐ | Claude-д сайн дэмжигдсэн |

**Хамгийн тохиромжтой:** API-first, data-heavy, microservice

---

### Stack C — Ruby on Rails + PostgreSQL
| Шалгуур | Үнэлгээ | Тайлбар |
|---------|---------|---------|
| Хурд | ⭐⭐⭐ | MVC convention-over-configuration |
| Суралцах хялбар | ⭐⭐⭐ | "Magic" нь хоёр талтай |
| Scaffold | ⭐⭐⭐⭐⭐ | CRUD автоматаар |
| Ecosystem | ⭐⭐⭐ | Gem-ууд баялаг ч хуучрах тал бий |
| AI tool support | ⭐⭐⭐ | Дэмжлэг бага |

**Хамгийн тохиромжтой:** Rapid prototyping, startup MVP

---

## Шийдвэр: Stack A — Node.js + Express + SQLite

### Сонгосон шалтгааны дэлгэрэнгүй

1. **Нэг хэл, бүхэл stack** — Frontend болон backend хоёулаа JavaScript. Хувьсагч, функц, обьект нэг форматаар явдаг тул context switching байхгүй.

2. **SQLite — энэ хэмжээний app-д хангалттай** — Mini library гэдэг нэрнээс нь харахад жижиг масштабын систем. PostgreSQL эсвэл MySQL суулгах, configure хийх шаардлагагүй. Файл нэг `.db` файлд хадгалагдана.

3. **npm ecosystem** — `express`, `better-sqlite3`, `jest`, `supertest` гэх мэт бүх хэрэгцээт package бэлэн байна. Суулгах: `npm install`.

4. **Claude Code-тэй маш сайн ажиллана** — AI tool-ууд Node.js/Express-ийн pattern-ийг сайн мэддэг. Code generation, review, refactor бүгд хялбар.

5. **Бие даалт 11-ийн өргөтгөл** — Өмнөх бие даалт дээр суурилж байгаа тул stack нийцтэй байх нь давуу тал.

### Эрсдэл ба шийдэл

| Эрсдэл | Шийдэл |
|--------|--------|
| SQLite concurrent write | Library app нэг хэрэглэгчтэй тул асуудалгүй |
| Type safety | JSDoc эсвэл `@types` нэмэх |
| Scale | Энэ project-д шаардлагагүй |
