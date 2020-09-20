import React, {useEffect} from 'react'
import Header from './comp/Header'
import { useAppStateContext, load_library } from './state'
import LibraryList from './comp/LibraryList'

const App = () => {
  const [state, dispatch] = useAppStateContext()
  useEffect(() => {
    (async () => {
      if (state.libURL) {
        console.log(`Loading: ${state.libURL}`);
        let libJSON = await load_library(state.libURL);
        dispatch({
          type: 'update-library',
          library: libJSON
        })
      } else {
        console.log('%cSkip load JSON', 'color: gray;')
      }
    })()
  }, [state.libURL])

  return (
    <div>
      <Header />
      <div>
        <LibraryList />
      </div>
    </div>
  )
}

export default App
