import React from 'react';

const Book = ({title, author, updated}) => {
  return (
    <div className='book flex flex-col p-1 border'>
      <div className='flex'>
        <h4 className="book-title w-3/4">{title}</h4>
        <div className='book-author'>{author}</div>
      </div>
      <div>
        <small>{updated}</small>
      </div>
    </div>
  );
};

export default Book;
