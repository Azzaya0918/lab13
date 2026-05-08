# Architecture — Mini Library

## Layer diagram

```mermaid
graph TD
    Client["🌐 Browser (HTML + JS)"]
    Router["Express Router"]
    Controller["Controllers"]
    Service["Service Layer"]
    DB["SQLite Database"]

    Client -->|HTTP Request| Router
    Router --> Controller
    Controller --> Service
    Service --> DB
    DB -->|Data| Service
    Service -->|Result| Controller
    Controller -->|JSON Response| Client
```

## Module тайлбар

| Module | Файл | Үүрэг |
|--------|------|-------|
| Server | `src/index.js` | Express app, port listen |
| Routes | `src/routes/*.js` | URL → Controller холболт |
| Controllers | `src/controllers/*.js` | Request/Response логик |
| Services | `src/services/*.js` | Бизнес логик |
| Models | `src/models/*.js` | Database query |
| Middleware | `src/middleware/` | Auth, error handler, logger |
| Static | `public/` | HTML, CSS, JS |

## Data flow — Ном зээлэх

```mermaid
sequenceDiagram
    participant B as Browser
    participant R as Router
    participant C as LoanController
    participant S as LoanService
    participant D as SQLite

    B->>R: POST /api/loans
    R->>C: createLoan(req, res)
    C->>S: issueLoan(bookId, memberId)
    S->>D: SELECT book WHERE id=? AND available=1
    D-->>S: book row
    S->>D: INSERT INTO loans ...
    S->>D: UPDATE books SET available=0
    D-->>S: ok
    S-->>C: { loanId, dueDate }
    C-->>B: 201 JSON
```

## Database schema

```mermaid
erDiagram
    BOOKS {
        int id PK
        string title
        string author
        string genre
        string isbn
        int available
        datetime created_at
    }
    MEMBERS {
        int id PK
        string name
        string email
        string phone
        datetime joined_at
    }
    LOANS {
        int id PK
        int book_id FK
        int member_id FK
        datetime issued_at
        datetime due_date
        datetime returned_at
    }

    BOOKS ||--o{ LOANS : "зээлэгдэнэ"
    MEMBERS ||--o{ LOANS : "зээлдэнэ"
```

## Directory бүтэц

```
bie-daalt-13/
├── CLAUDE.md
├── .claude/commands/
├── partA/
│   ├── PROJECT.md
│   ├── ARCHITECTURE.md
│   ├── STACK-COMPARISON.md
│   ├── README.md
│   ├── adr/0001-stack-decision.md
│   └── ai-sessions/plan.md
└── partB/
    ├── src/
    │   ├── index.js
    │   ├── db.js
    │   ├── routes/
    │   │   ├── books.js
    │   │   ├── members.js
    │   │   └── loans.js
    │   ├── controllers/
    │   │   ├── bookController.js
    │   │   ├── memberController.js
    │   │   └── loanController.js
    │   ├── services/
    │   │   ├── bookService.js
    │   │   ├── memberService.js
    │   │   └── loanService.js
    │   └── middleware/
    │       ├── errorHandler.js
    │       └── validate.js
    ├── public/
    │   ├── index.html
    │   ├── css/style.css
    │   └── js/app.js
    ├── tests/
    └── openapi.yaml
```
