import React, { useState, useEffect } from 'react';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import './App.css';


function App() {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);

  // Load từ localStorage khi mở trang
  // useEffect(() => {
  //   const storedBooks = localStorage.getItem('books');
  //   if (storedBooks) {
  //     setBooks(JSON.parse(storedBooks));
  //   }
  // }, []);

  // Lưu vào localStorage mỗi khi books thay đổi
  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  // Thêm sách mới
  const handleAddBook = (newBook) => {
    setBooks([...books, newBook]);
  };

  // Chỉnh sửa sách
  const handleUpdateBook = (updatedBook) => {
    const updatedList = books.map((book) =>
      book.id === updatedBook.id ? updatedBook : book
    );
    setBooks(updatedList);
    setEditingBook(null);
  };

  // Xóa sách
  const handleDeleteBook = (id) => {
    const filtered = books.filter((book) => book.id !== id);
    setBooks(filtered);
  };

  // Bấm nút "Sửa"
  const handleEditClick = (book) => {
    setEditingBook(book);
  };

  return (
    <div style={{ margin: '20px' }}>
      <h1>Quản Lý Sách</h1>
      <BookForm
        onAdd={handleAddBook}
        onUpdate={handleUpdateBook}
        editingBook={editingBook}
      />
      <BookList
        books={books}
        onEdit={handleEditClick}
        onDelete={handleDeleteBook}
      />
    </div>
  );
}

export default App;
