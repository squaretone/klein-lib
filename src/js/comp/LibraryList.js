import React, { useEffect, useState } from 'react';
import { useAppStateContext } from '../state';
import Book from './Book'

const LibraryList = () => {
  const [state, dispatch] = useAppStateContext()
  const [library, setLibrary] = useState(state.library)
  const [results, setResults] = useState(state.results)

  useEffect(() => {
    setLibrary(state.library)
  }, [state.library])

  useEffect(() => {
    setResults(state.results)
  }, [state.results])

  return (
    <div className="library-list">
      {results.map((book, index) => {
        const bookClasses = (index % 2 === 0) ? 'even' : 'odd'
        return (
          <Book key={`book_${index}`} {...book} className={bookClasses} />
        )
      })}
    </div>
  );
};

export default LibraryList;
