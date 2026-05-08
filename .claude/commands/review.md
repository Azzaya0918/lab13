# /review — Security & Robustness Review

Доорх кодыг security болон robustness талаас шалга:

1. **SQL Injection** — Prepared statement ашиглаагүй газар бий юу?
2. **Input validation** — Хэрэглэгчийн input шалгагдаж байна уу?
3. **Error handling** — Stack trace эсвэл sensitive info leak байна уу?
4. **OWASP Top 10** — Хамааралтай эрсдэл олж тайлбарла
5. **Robustness** — Edge case (null, undefined, empty string, negative number) зохицуулсан уу?

Асуудал тус бүрд: [SEVERITY: HIGH/MED/LOW] тайлбар + засварласан кодын жишээ гарга.
