# ADR-002: better-sqlite3-г sql.js-аар солих шийдвэр

## Статус
Батлагдсан (Accepted)

## Огноо
2025-05-12

## Контекст
Part B хөгжүүлэлтийн явцад `better-sqlite3` package суулгахад Windows дээр Visual Studio C++ compiler шаардлагатай болсон. Node.js v25.8.2 дээр prebuilt binary байхгүй тул `node-gyp rebuild` хийхэд алдаа гарсан:
Шийдвэрийн сонголтууд:
1. Visual Studio суулгах — 5GB+ disk space, цаг их зарцуулна
2. Node.js хуучин хувилбар суулгах — v18 LTS
3. `sql.js` руу шилжих — pure JavaScript, compile шаардахгүй
4. `sqlite3` package ашиглах — мөн compile шаардана

## Шийдвэр
**sql.js** ашиглахаар шийдлээ.

## Үндэслэл
- Pure JavaScript — Visual Studio, node-gyp шаардахгүй
- MIT license — better-sqlite3-тэй ижил
- API өөрчлөлт бага — query, run функц дахин бичсэн
- Development хурд алдагдахгүй

## Үр дагавар
### Эерэг
- Windows, Mac, Linux бүгд дээр compile хийлгүй ажиллана
- CI/CD-д нэмэлт тохиргоо шаардахгүй

### Сөрөг
- sql.js in-memory database — файлд save() дуудах шаардлагатай
- better-sqlite3-с арай удаан

## Холбоотой
- STACK-COMPARISON.md
- ADR-001