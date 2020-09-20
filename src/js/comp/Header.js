import React from 'react';
import { useAppStateContext } from '../state'

const Header = () => {
  const [state, dispatch] = useAppStateContext()
  return (
    <header>
      <h1 className="site-name">{state.siteName}</h1>
      <small>{state.libURL}</small>
    </header>
  );
};

export default Header
