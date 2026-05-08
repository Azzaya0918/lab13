# AI Planning Session Log — partA

**Огноо:** 2025-05-08  
**Хэрэгсэл:** Claude (claude.ai)  
**Зорилго:** Mini Library системийн архитектур, stack сонголт, directory бүтцийг тогтоох

---

## Session 1: Сэдэв ба Stack харьцуулалт

**Асуулт (хэрэглэгч):**
> Mini Library систем хийхэд ямар stack ашиглах нь дээр вэ? Node.js+Express, Python+FastAPI, Ruby on Rails гурвыг харьцуул.

**AI хариу (товчилсон):**
- Node.js+Express: хурдан, JS нэг хэл, npm ecosystem баялаг, Claude Code-д сайн дэмжигдсэн
- FastAPI: async/await хурдан, auto OpenAPI, гэхдээ PostgreSQL тохиргоо нэмэлт ачаалал
- Rails: scaffold хурдан, гэхдээ "magic" debugging хүндрүүлдэг, AI tool дэмжлэг бага

**Шийдвэр:** Node.js + Express + SQLite сонгогдлоо. Бие даалт 11-ийн өргөтгөл учраас JS stack-тай нийцтэй байх нь давуу тал.

---

## Session 2: Architecture design

**Асуулт:**
> Mini Library-д ямар layer ба module хэрэгтэй вэ? Mermaid diagram-ийн хувьд юуг оруулах хэрэгтэй вэ?

**AI хариу (товчилсон):**
- 4-tier: Client → Router → Controller → Service → Model → DB
- Controller: req/res зохицуулалт, бизнес логик байхгүй
- Service: бизнес дүрэм (e.g. зээлийн хугацаа тооцоо, available шалгалт)
- Model: SQL CRUD query
- 3 core entity: Books, Members, Loans

**Hallucination шалгалт:** AI нэг удаа `sequelize` ORM санал болгосон — гэхдээ энэ project-д raw `better-sqlite3` хангалттай, complexity нэмэхгүй байхаар шийдлээ.

---

## Session 3: CLAUDE.md ба Custom commands

**Асуулт:**
> CLAUDE.md-д юуг оруулах хэрэгтэй вэ? No-go zones-т ямар жишээ оруулах вэ?

**AI хариу (товчилсон):**
- Build commands, conventions, response format стандарт
- No-go: SQL injection (string concat), hardcoded secrets, stack trace exposure
- AI session annotation: `Co-Authored-By: Claude <noreply@anthropic.com>`
- Custom commands: `/review`, `/test`, `/docs`, `/commit`, `/security`, `/refactor`

**Анхааруулга:** AI нэг удаа `eval()` ашиглах санал оруулсан — энэ нь security risk тул татгалзав. No-go zones-д нэмэгдлээ.

---

## Session 4: Directory бүтэц тогтоох

**Асуулт:**
> Express project-ийн хамгийн сайн folder structure ямар байх вэ?

**AI хариу (товчилсон):**
```
src/
  index.js       - entry point
  db.js          - SQLite connection singleton
  routes/        - URL mapping
  controllers/   - req/res handling
  services/      - business logic
  middleware/    - error, validation
public/          - static frontend
tests/           - jest tests
```

Feature-based эсвэл layer-based гэж хоёр хандлага байна. Жижиг project-д **layer-based** илүү ойлгомжтой гэж шийдлээ.

---

## Ерөнхий дүгнэлт

| Зүйл | AI хийсэн | Өөрөө шийдсэн |
|------|-----------|----------------|
| Stack харьцуулалт | ✅ 3 option, pros/cons | Stack сонголтын эцсийн шийдвэр |
| Mermaid diagram | ✅ Template | Module нэрлэлт, layer тоо |
| CLAUDE.md бүтэц | ✅ Жишээ | No-go zones, conventions |
| ADR format | ✅ Template | Үндэслэл, context |
| Directory | ✅ Standard Express layout | Feature-vs-layer шийдвэр |

**Hallucination 1:** Sequelize ORM санал болгосон — better-sqlite3 хангалттай  
**Hallucination 2:** `eval()` ашиглах санал — security risk, татгалзав
