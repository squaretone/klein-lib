import React from 'react';
import { useAppStateContext } from '../state'

const Header = () => {
  const [state, dispatch] = useAppStateContext()
  return (
    <header className='bg-teal-600 text-teal-100 font-light tracking-widest'>
      <h1 className='site-name p-2 px-4'>{state.siteName}</h1>
    </header>
  );
};

export default Header
