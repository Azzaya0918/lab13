jest.mock('../src/db', () => {
  const data = { books: [], members: [], loans: [], nextId: 1 };

  const mock = {
    getDb: jest.fn(),
    query: jest.fn(),
    run: jest.fn(),
    save: jest.fn(),
    __data: data
  };

  return mock;
});

const db = require('../src/db');
const loanService = require('../src/services/loanService');

beforeEach(() => {
  db.__data.books = [{ id: 1, title: 'Test Book', author: 'Author', available: 1 }];
  db.__data.members = [{ id: 1, name: 'Test User', email: 'test@test.com' }];
  db.__data.loans = [];
  db.__data.nextId = 1;
  jest.clearAllMocks();

  db.query.mockImplementation((sql, params = []) => {
    if (sql.includes('FROM books WHERE id = ? AND available = 1')) {
      return db.__data.books.filter(b => b.id === params[0] && b.available === 1);
    }
    if (sql.includes('FROM members WHERE id = ?')) {
      return db.__data.members.filter(m => m.id === params[0]);
    }
    if (sql.includes('FROM loans WHERE id = ?')) {
      return db.__data.loans.filter(l => l.id === params[0]);
    }
    if (sql.includes('FROM loans ORDER BY id DESC LIMIT 1')) {
      return [db.__data.loans[db.__data.loans.length - 1]];
    }
    return [];
  });

  db.run.mockImplementation((sql, params = []) => {
    if (sql.includes('INSERT INTO loans')) {
      db.__data.loans.push({
        id: db.__data.nextId++,
        book_id: params[0],
        member_id: params[1],
        due_date: params[2],
        returned_at: null,
        issued_at: new Date().toISOString()
      });
    }
    if (sql.includes('UPDATE books SET available = 0')) {
      const book = db.__data.books.find(b => b.id === params[0]);
      if (book) book.available = 0;
    }
    if (sql.includes('UPDATE books SET available = 1')) {
      const book = db.__data.books.find(b => b.id === params[0]);
      if (book) book.available = 1;
    }
    if (sql.includes('UPDATE loans SET returned_at')) {
      const loan = db.__data.loans.find(l => l.id === params[1]);
      if (loan) loan.returned_at = params[0];
    }
  });
});

describe('loanService', () => {
  it('should issue a loan for available book', () => {
    const loan = loanService.issueLoan(1, 1);
    expect(loan.book_id).toBe(1);
    expect(loan.member_id).toBe(1);
    expect(loan.returned_at).toBeNull();
  });

  it('should mark book as unavailable after loan', () => {
    loanService.issueLoan(1, 1);
    expect(db.__data.books[0].available).toBe(0);
  });

  it('should throw error if book is not available', () => {
    db.__data.books[0].available = 0;
    expect(() => loanService.issueLoan(1, 1)).toThrow('Book is not available');
  });

  it('should return a loan successfully', () => {
    const loan = loanService.issueLoan(1, 1);
    const returned = loanService.returnLoan(loan.id);
    expect(returned.returned_at).not.toBeNull();
  });

  it('should mark book as available after return', () => {
    const loan = loanService.issueLoan(1, 1);
    loanService.returnLoan(loan.id);
    expect(db.__data.books[0].available).toBe(1);
  });

  it('should throw error if loan not found', () => {
    expect(() => loanService.returnLoan(9999)).toThrow('Loan not found');
  });

  it('should throw error if already returned', () => {
    const loan = loanService.issueLoan(1, 1);
    loanService.returnLoan(loan.id);
    expect(() => loanService.returnLoan(loan.id)).toThrow('Already returned');
  });

  it('should throw error if member not found', () => {
    expect(() => loanService.issueLoan(1, 9999)).toThrow('Member not found');
  });
});