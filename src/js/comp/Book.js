import React from 'react';

const Book = ({title, author, updated, className}) => {
  let baseClasses = 'book flex flex-col p-1 py-3'
  if (className) baseClasses += ` ${className}`
  return (
    <div className={baseClasses}>
      <div className='flex flex-col'>
        <h4 className='book-title text-3xl w-3/4 px-2'>{title}</h4>
        <div className='book-author text-xl px-2'>{author}</div>
      </div>
      <div className='details'>
        <small>{updated}</small>
      </div>
    </div>
  );
};

export default Book;
