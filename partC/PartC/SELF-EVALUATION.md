# Self-Evaluation

## 1. Хэрэв шалгалт өнөөдөр болбол би энэ кодыг өөрөө бичиж чадах уу?

**Хэсэгчлэн — тайлбартай:**

Дараах зүйлсийг өөрөө бичиж чадна:
- Express router, middleware бүтэц
- REST API endpoint зохион байгуулалт
- SQL query (SELECT, INSERT, UPDATE, DELETE)
- Jest test бичих үндсэн бүтэц

Дараах зүйлсийг AI тусламжгүйгээр бичихэд хэцүү байх:
- sql.js-н save() механизм — энэ library-г өмнө ашиглаж байгаагүй
- Jest mock-н дэлгэрэнгүй бүтэц — `mockImplementation` хэрхэн ажилладгийг бүрэн ойлгоогүй
- OpenAPI 3.0 YAML format — syntax мартагддаг

## 2. Дахин хийнэ гэвэл юуг өөрөөр хийх вэ?

- **Stack сонголт:** Эхнээс л Windows-д тохирох stack сонгох. better-sqlite3 асуудлаас зайлсхийхийн тулд sql.js эсвэл lowdb сонгох байсан.
- **Файл нэрлэлт:** `bookControllers.js` гэж буруу нэрлэсэн — CLAUDE.md-н convention-ийг эхнээс дагах байсан.
- **Commit дараалал:** Илүү жижиг, логик commit хийх. Нэг commit-д олон файл оруулсан нь сүүлд review хийхэд хүндрэл болсон.
- **AI session log:** Chat дуусаагүй байхад нь тэмдэглэх. Сүүлд санах нь хэцүү байсан.

## 3. Энэ туршлагаас юу сурсан бэ?

- **AI "verify, don't trust"** — AI санал болгосон бүх зүйл зөв биш. better-sqlite3 async API, moment.js dependency, SQL injection жишээнүүд үүнийг нотолсон.
- **Environment dependency эрсдэл** — Native module (C++ compile) ашиглах нь cross-platform асуудал үүсгэдэг. Pure JS solution илүү найдвартай.
- **AI хурдасгагч, орлогч биш** — Boilerplate код хурдан гаргах, pattern санал болгоход AI маш хэрэгтэй. Гэхдээ debug хийх, шийдвэр гаргах үед өөрийн ойлголт илүү чухал.
- **CLAUDE.md чухал** — No-go zones тодорхойлсон нь AI-н SQL injection санал болгоход шууд мэдэх боломж өгсөн.