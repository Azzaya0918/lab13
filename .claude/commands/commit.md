# /commit — Conventional Commits message үүсгэх

Staged changes-ийг харж Conventional Commits форматаар commit message үүсгэ:

**Format:**
```
<type>(<scope>): <description>

[optional body]

Co-Authored-By: Claude <noreply@anthropic.com>
```

**Type-ууд:**
- `feat` — Шинэ feature
- `fix` — Bug засах
- `test` — Тест нэмэх/засах
- `docs` — Documentation
- `refactor` — Код өөрчлөлт (feature/bug биш)
- `chore` — Build, dependency, тохиргоо

**Дүрэм:**
- Description: imperative mood, lowercase, цэг байхгүй
- 72 тэмдэгтээс хэтрэхгүй
- AI ашигласан бол `Co-Authored-By` мөр заавал нэмэх

3 өөр хувилбар санал болго, хамгийн тохиромжтойг нь тодорхойл.
