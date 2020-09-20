import React, { useEffect, useState } from 'react';
import { useAppStateContext } from '../state';
import Book from './Book'

const LibraryList = () => {
  const [state, dispatch] = useAppStateContext()
  const [library, setLibrary] = useState(state.library)

  useEffect(() => {
    setLibrary(state.library)
  }, [state.library])

  return (
    <div className="library-list">
     {library.map((book, index) => {
       return (
         <Book key={`book_${index}`} {...book} />
       )
     })}
    </div>
  );
};

export default LibraryList;
