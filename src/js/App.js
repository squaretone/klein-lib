import React, {useEffect} from 'react'
import Header from './comp/Header'
import { useAppStateContext, load_library } from './state'
import LibraryList from './comp/LibraryList'
import Filters from './comp/Filters'
import Errors from './comp/Errors'

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
        dispatch({type: 'error-add', error: 'Could not find data URL'})
      }
    })()
  }, [state.libURL])

  return (
    <div>
      <Header />
      <Errors errors={state.errors} />
      <Filters />
      <div>
        <LibraryList />
      </div>
    </div>
  )
}

export default App
