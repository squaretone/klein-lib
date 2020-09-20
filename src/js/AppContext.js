import React from 'react'
import App from './App'
import { 
  AppStateProvider, 
  stateReducer, 
  defaultAppState 
} from './state';

const AppContext = () => {
  return (
    <React.Fragment>
      <AppStateProvider initialState={defaultAppState} reducer={stateReducer}>
        <App />
      </AppStateProvider>
    </React.Fragment>
  );
}

export default AppContext
