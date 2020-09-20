import React from 'react'
import { useAppStateContext } from '../state'
// import { SearchIcon } from './Icons'

const Filters = () => {
  const [state, dispatch] = useAppStateContext()
  const filterClasses = state.menuOpen ? 'visible' : 'hidden'
  
  return (
    <div className={`filters ${filterClasses}`}>
      <div className="p-3">
        FILTERS
      </div>
    </div>
  );
};

export default Filters
