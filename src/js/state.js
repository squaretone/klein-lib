import React, { createContext, useContext, useReducer } from 'react'

export let defaultAppState = {
  siteName: 'Klein Library'
}

export const AppStateContext = createContext(defaultAppState)

export const AppStateProvider = ({ reducer, initialState, children }) => (
  <AppStateContext.Provider value={useReducer(reducer, defaultAppState)}>
    {children}
  </AppStateContext.Provider>
)

export const useAppStateContext = () => useContext(AppStateContext)

export const stateReducer = (state, action) => {
  console.log(
    `%cSTATE.action.type: ${action.type}`, 'color: blue;'
  );
  switch (action.type) {
    case 'set-filters':
      return { ...state, misc: 'none...'}
    default:
      return state
  }
}