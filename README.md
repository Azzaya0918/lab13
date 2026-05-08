# Бие даалт 13 — AI-Assisted Software Construction

**Сэдэв:** Mini Library — Номын сан удирдлагын систем  
**Stack:** Node.js + Express + SQLite  
**Хичээл:** F.CSM311 — Программ хангамжийн бүтээлт  

## Бүтэц

| Хэсэг | Агуулга |
|-------|---------|
| `partA/` | Plan — Архитектур, stack, CLAUDE.md |
| `partB/` | Build — Эх код, тест, AI session log |
| `partC/` | Reflect — AI Usage Report, ADR-002, Self-evaluation |
| `CLAUDE.md` | AI assistant-д зориулсан project context |
| `.claude/commands/` | Custom slash commands |

## Хурдан эхлэх

```bash
cd partB
npm install
npm run dev
# → http://localhost:3000
```

## AI ашиглалтын мэдэгдэл

Энэ бие даалт Claude (Anthropic) AI-тай хамтран хийгдсэн.  
Commit-уудад `Co-Authored-By: Claude <noreply@anthropic.com>` зарлагдсан.  
AI session log: `partA/ai-sessions/`, `partB/ai-sessions/`
