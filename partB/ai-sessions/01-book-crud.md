# AI Session 01 — Book CRUD Feature

**Огноо:** 2-р өдөр  
**Зорилго:** Books CRUD endpoint хэрэгжүүлэх

## Асуулт
> Express дээр books CRUD-г controller/service pattern-аар хэрхэн зохион байгуулах вэ?

## AI хариу (товчилсон)
- Controller: req/res зохицуулалт, validation
- Service: бизнес логик, db дуудалт
- Route: URL → controller холболт
- prepared statement ЗААВАЛ ашиглах

## Hallucination олдсон
AI эхлээд `db.query()` async method санал болгосон — гэхдээ `sql.js` synchronous байдаг. Баримтжуулалтаас шалгаж засав.

## Шийдвэр
Layer-based бүтэц: routes → controllers → services → db