# AI Session 03 — Debug: overdue query crash

**Огноо:** 5-р өдөр  
**Зорилго:** getOverdue функцийн null pointer bug засах

## Асуулт
> `getOverdue()` дуудахад null related алдаа гардаг

## AI хариу (товчилсон)
- `due_date` null байх үед харьцуулж алдаа гарна
- WHERE clause-д `due_date IS NOT NULL` нэмэх хэрэгтэй

## Security анхааруулга
AI засварын кодод string interpolation ашигласан — SQL injection эрсдэлтэй. Parameter binding ашиглахаар солив.

## Шийдвэр
`WHERE returned_at IS NULL AND due_date < ?` — parameter binding ашигласан