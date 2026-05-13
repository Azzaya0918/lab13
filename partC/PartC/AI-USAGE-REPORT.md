# AI Usage Report — Mini Library

## 1. Юуг AI хийсэн, юуг өөрөө хийсэн?

### Part A — Plan
- **AI хийсэн:** ARCHITECTURE.md-н Mermaid diagram template, STACK-COMPARISON.md-н харьцуулалтын бүтэц, ADR-001-н format, CLAUDE.md-н no-go zones жишээ
- **Өөрөө хийсэн:** Stack сонголтын эцсийн шийдвэр, feature жагсаалт тогтоох, scope тодорхойлох

### Part B — Build
- **AI хийсэн:** bookService.js, memberService.js, loanService.js-н үндсэн CRUD код, test файлуудын mock бүтэц, openapi.yaml-н endpoint бүтэц
- **Өөрөө хийсэн:** sql.js руу шилжих шийдвэр (better-sqlite3 Windows дээр ажиллахгүй болсон учраас), файлын нэрийн алдаа засах (bookControllers.js → bookController.js), port conflict шийдвэрлэх

### Part C — Reflect
- **AI хийсэн:** AI-USAGE-REPORT.md-н бүтэц, ADR-002-н format
- **Өөрөө хийсэн:** Hallucination жишээнүүдийг бодитоор тэмдэглэх, self-evaluation хариулт

---

## 2. Hallucination 2+ жишээ

### Жишээ 1 — better-sqlite3 async API
AI `db.query()` async method санал болгосон:
```javascript
// AI санал болгосон (БУРУУ)
const rows = await db.query('SELECT * FROM books');

// Зөв хувилбар
const rows = db.prepare('SELECT * FROM books').all();
```
**Яаж олж засав:** `npm run dev` хийхэд `db.query is not a function` алдаа гарсан. better-sqlite3 баримтжуулалтыг шалгаад synchronous API ашиглах ёстойг мэдсэн.

### Жишээ 2 — moment.js dependency
AI due_date тооцоолоход `moment.js` ашиглахыг санал болгосон:
```javascript
// AI санал болгосон (ШААРДЛАГАГҮЙ)
const moment = require('moment');
const dueDate = moment().add(14, 'days').toISOString();

// Зөв хувилбар — vanilla JS хангалттай
const dueDate = new Date();
dueDate.setDate(dueDate.getDate() + 14);
```
**Яаж олж засав:** Нэмэлт dependency шаардлагагүй гэдгийг мэдэж, native Date ашиглав.

### Жишээ 3 — SQL injection эрсдэл
AI overdue query засахдаа string interpolation ашигласан:
```javascript
// AI санал болгосон (АЮУЛТАЙ)
db.run(`SELECT * FROM loans WHERE due_date < '${new Date()}'`);

// Зөв хувилбар
db.query('SELECT * FROM loans WHERE due_date < ?', [new Date().toISOString()]);
```
**Яаж олж засав:** CLAUDE.md-н no-go zones дүрмийг санаж, parameter binding ашиглав.

---

## 3. Security/license анхааруулга

### SQL Injection эрсдэл
AI үүсгэсэн overdue query-д string interpolation ашигласан нь SQL injection эрсдэл үүсгэж байсан. CLAUDE.md-н no-go zones дүрмийн дагуу parameter binding (`?`) ашиглахаар засав.

### better-sqlite3 license
better-sqlite3 нь MIT license-тэй боловч Windows дээр Visual Studio C++ compiler шаардлагатай. Энэ нь development environment dependency болж, CI/CD-д асуудал үүсгэж болзошгүй. sql.js (MIT) руу шилжсэн нь зөв шийдвэр байлаа.

---

## 4. Юуг AI-аар хурдан хийсэн?

- **Boilerplate код** — Express router, controller, service бүтцийг маш хурдан үүсгэсэн. Гараар бичвэл 2-3 цаг зарцуулах кодыг 10 минутад гаргасан.
- **Test mock бүтэц** — Jest mock-н бүтэц complex байдаг. AI template өгсөн нь цаг хэмнэсэн.
- **OpenAPI spec** — 50+ мөрийн YAML-г гараар бичих нь уйтгартай. AI хурдан үүсгэсэн.
- **Mermaid diagram** — Архитектур diagram-г текстээр дүрслэх нь AI-д хялбар байсан.

---

## 5. Юуг AI-аар удаан хийсэн?

- **better-sqlite3 → sql.js шилжилт** — AI анх better-sqlite3 санал болгосон. Windows дээр compile алдаа гарсан. sql.js руу шилжих шийдвэр гаргаж, бүх db.js код дахин бичих хэрэгтэй болсон. Энэ 1+ цаг зарцуулсан.
- **Test mock debugging** — AI үүсгэсэн mock бүтэц анх зөв ажиллаагүй. `jest.clearAllMocks()` дараа mock дахин тохируулах хэрэгтэй болсон.
- **Файлын нэрийн алдаа** — AI `bookController.js` гэж хэлсэн ч `bookControllers.js` гэж хадгалагдсан. Энэ debug хийхэд цаг зарцуулсан.

---

## 6. Skill atrophy эрсдэлийг яаж зохицуулсан?

- **"AI байхгүй" цаг:** Commit message бичих, file naming, folder structure шийдвэр бүгдийг өөрөө хийсэн. AI зөвхөн кодын агуулгад туслав.
- **Code review:** AI үүсгэсэн бүх кодыг мөр мөрөөр уншиж, яагаад ийм бичсэнийг ойлгосон. Ойлгохгүй хэсгийг дахин асуусан.
- **Алдаа засах:** better-sqlite3 алдаа, port conflict, файлын нэр зэрэг бүх алдааг өөрөө шийдвэрлэсэн. AI-аас шийдлийг copy-paste хийгээгүй.
- **Баримтжуулалт шалгах:** AI санал болгосон API-г npm баримтжуулалтаас шалгасан.