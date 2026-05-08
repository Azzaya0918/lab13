# /security — OWASP Top 10 шалгалт

Доорх кодыг OWASP Top 10 (2021) шалгуураар audit хий:

| # | OWASP Category | Шалгах зүйл |
|---|----------------|-------------|
| A01 | Broken Access Control | Route-д authorization шалгалт байна уу? |
| A02 | Cryptographic Failures | Sensitive data plain text хадгалагдаж байна уу? |
| A03 | Injection | SQL, command injection боломжтой юу? |
| A04 | Insecure Design | Business logic-д gap байна уу? |
| A05 | Security Misconfiguration | Default config, verbose error байна уу? |
| A06 | Vulnerable Components | `npm audit` үр дүн |
| A07 | Auth Failures | Session, token зохицуулалт |
| A08 | Software Integrity | Dependency integrity |
| A09 | Logging Failures | Sensitive data log-д орж байна уу? |
| A10 | SSRF | External request хийж байна уу? |

Тус бүрийг: ✅ OK / ⚠️ Анхааруулга / ❌ Эрсдэл гэж ангилж, засварын санал нэмэ.
