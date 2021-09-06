import React from 'react'
import { useAppStateContext } from '../state'
import { SearchIcon, SortUpIcon, SortDownIcon } from './Icons'

const Filters = () => {
  const [state, dispatch] = useAppStateContext()
  
  const onTextFilterChangeHandler = (evt) => {
    evt.preventDefault()
    dispatch({
      type: 'filter-text',
      value: evt.target.value
    })
  }

  const sortByChangeHandler = (evt) => {
    evt.preventDefault()
    dispatch({
      type: 'filter-sort-by',
      value: evt.target.value
    })
  }

  const toggleSortDirection = (evt) => {
    evt.preventDefault()
    dispatch({
      type: 'filter-toggle-direction'
    })
  }
  
  const filterClasses = state.menuOpen ? 'visible' : 'hidden'
  const sortIcon = state.filters.direction === 'desc' ? <SortUpIcon /> : <SortDownIcon />
  
  return (
    <div className={`filters ${filterClasses}`}>
      <div className="p-3 pl-2">

        <div className="filter text-search">
          <label className="flex">
            <div className="pt-1">
              <SearchIcon />
            </div>
            <div className="flex-1 pl-2">
              <input 
                value={state.filters.text} 
                onChange={onTextFilterChangeHandler}
                name="search" 
                placeholder="Search..." 
                className="rounded pl-4 py-2 text-teal-800 text-2xl w-full" 
                />
            </div>
          </label>
        </div>

        <div className="filter sort-by flex pt-4">
          <label>
            <button onClick={toggleSortDirection}>
              {sortIcon}
            </button>
          </label>

          <label className="flex-1 flex pl-2">
            <select value={state.filters.sortBy} onChange={sortByChangeHandler} className="flex-1 text-2xl text-teal-800 px-2 py-1 rounded">
              <option value="author">Sort by author</option>
              <option value="title">Sort by title</option>
              {/* <option value="added">Sort by added</option> */}
            </select>
          </label>
          
        </div>
        
      </div>
    </div>
  );
};

export default Filters
