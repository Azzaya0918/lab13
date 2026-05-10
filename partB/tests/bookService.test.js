jest.mock('../src/db', () => {
  const data = { books: [], nextId: 1 };

  return {
    getDb: jest.fn(),
    query: jest.fn((sql, params = []) => {
      if (sql.includes('SELECT * FROM books WHERE 1=1')) {
        let result = [...data.books];
        return result;
      }
      if (sql.includes('SELECT * FROM books WHERE id = ?')) {
        return data.books.filter(b => b.id === params[0]);
      }
      if (sql.includes('SELECT * FROM books ORDER BY id DESC LIMIT 1')) {
        return [data.books[data.books.length - 1]];
      }
      return [];
    }),
    run: jest.fn((sql, params = []) => {
      if (sql.includes('INSERT INTO books')) {
        data.books.push({
          id: data.nextId++,
          title: params[0],
          author: params[1],
          genre: params[2] || null,
          isbn: params[3] || null,
          available: 1
        });
      }
      if (sql.includes('UPDATE books SET title')) {
        const book = data.books.find(b => b.id === params[4]);
        if (book) {
          book.title = params[0];
          book.author = params[1];
          book.genre = params[2];
          book.isbn = params[3];
        }
      }
      if (sql.includes('DELETE FROM books')) {
        const idx = data.books.findIndex(b => b.id === params[0]);
        if (idx !== -1) data.books.splice(idx, 1);
      }
    }),
    save: jest.fn(),
    __data: data
  };
});

const db = require('../src/db');
const bookService = require('../src/services/bookService');

beforeEach(() => {
  db.__data.books = [];
  db.__data.nextId = 1;
  jest.clearAllMocks();
  db.query.mockImplementation((sql, params = []) => {
    if (sql.includes('SELECT * FROM books WHERE 1=1')) return [...db.__data.books];
    if (sql.includes('SELECT * FROM books WHERE id = ?')) return db.__data.books.filter(b => b.id === params[0]);
    if (sql.includes('ORDER BY id DESC LIMIT 1')) return [db.__data.books[db.__data.books.length - 1]];
    return [];
  });
  db.run.mockImplementation((sql, params = []) => {
    if (sql.includes('INSERT INTO books')) {
      db.__data.books.push({ id: db.__data.nextId++, title: params[0], author: params[1], genre: params[2] || null, isbn: params[3] || null, available: 1 });
    }
    if (sql.includes('UPDATE books SET title')) {
      const book = db.__data.books.find(b => b.id === params[4]);
      if (book) { book.title = params[0]; book.author = params[1]; book.genre = params[2]; book.isbn = params[3]; }
    }
    if (sql.includes('DELETE FROM books')) {
      const idx = db.__data.books.findIndex(b => b.id === params[0]);
      if (idx !== -1) db.__data.books.splice(idx, 1);
    }
  });
});

describe('bookService', () => {
  it('should create a book with title and author', () => {
    const book = bookService.create({ title: 'Test Book', author: 'Author A' });
    expect(book.title).toBe('Test Book');
    expect(book.author).toBe('Author A');
    expect(book.available).toBe(1);
  });

  it('should return all books', () => {
    bookService.create({ title: 'Book 1', author: 'Author 1' });
    bookService.create({ title: 'Book 2', author: 'Author 2' });
    const books = bookService.findAll();
    expect(books.length).toBe(2);
  });

  it('should find book by id', () => {
    const created = bookService.create({ title: 'Find Me', author: 'Author B' });
    const found = bookService.findById(created.id);
    expect(found.title).toBe('Find Me');
  });

  it('should return null for non-existent id', () => {
    const found = bookService.findById(9999);
    expect(found).toBeNull();
  });

  it('should update a book', () => {
    const book = bookService.create({ title: 'Old Title', author: 'Author C' });
    const updated = bookService.update(book.id, { title: 'New Title', author: 'Author C' });
    expect(updated.title).toBe('New Title');
  });

  it('should delete a book', () => {
    const book = bookService.create({ title: 'Delete Me', author: 'Author D' });
    bookService.remove(book.id);
    expect(bookService.findById(book.id)).toBeNull();
  });

  it('should return empty array when no books', () => {
    expect(bookService.findAll()).toEqual([]);
  });

  it('should create book with genre and isbn', () => {
    const book = bookService.create({ title: 'Sci-Fi', author: 'Author E', genre: 'Fiction', isbn: '123' });
    expect(book.genre).toBe('Fiction');
    expect(book.isbn).toBe('123');
  });

  it('should create multiple books', () => {
    bookService.create({ title: 'Book A', author: 'Auth A' });
    bookService.create({ title: 'Book B', author: 'Auth B' });
    bookService.create({ title: 'Book C', author: 'Auth C' });
    expect(bookService.findAll().length).toBe(3);
  });

  it('should set available to 1 by default', () => {
    const book = bookService.create({ title: 'Available', author: 'Auth F' });
    expect(book.available).toBe(1);
  });
});