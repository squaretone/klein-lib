import React from 'react'
import { useAppStateContext } from '../state'
import { IconHamburgerOpen, IconHamburgerClose } from './Icons';

const Header = () => {
  const [state, dispatch] = useAppStateContext()
  const toggleMenu = (evt) => {
    evt.preventDefault()
    dispatch({type: 'toggle-menu'})
  }

  let Icon = state.menuOpen ? <IconHamburgerClose /> : <IconHamburgerOpen />
  
  return (
    <header className='flex bg-teal-600 text-teal-100 font-light tracking-widest'>
      <h1 className='site-name p-2 px-4 flex-1'>{state.siteName}</h1>
      <div className="p-3">
        <button onClick={toggleMenu}>
          {Icon}
        </button>
      </div>
    </header>
  );
};

export default Header
