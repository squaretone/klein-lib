import React, { createContext, useContext, useReducer } from 'react'
import _ from 'lodash'

let libURL = process.env.LIBRARY_JSON_URL

export let defaultAppState = {
  siteName: 'Klein Library',
  library: [],
  results: [],
  errors: [],
  libLoaded: false,
  isLoading: false,
  menuOpen: false,
  filters: {
    direction: 'asc',
    text: '',
    sortBy: 'author'
  },
  libURL: libURL,
}

const format_google_json = (googleJSON) => {
  let results =[]
  results = googleJSON.feed.entry.map((book) => {
    let data = {}
    data.updated = book.title.$t
    data.author = book.gsx$author.$t
    data.title = book.gsx$title.$t
    return data
  })
  return results
}

export const load_library = async (libURL) => {
  try {
    const response = await fetch(libURL)
    const responseJSON = await response.json()
    let formatted = format_google_json(responseJSON);
    return formatted

  } catch (err) {
    console.log(`Error fetching ${libURL}`, err)
    return false
  }
}

export const AppStateContext = createContext(defaultAppState)

export const AppStateProvider = ({ reducer, children }) => (
  <AppStateContext.Provider value={useReducer(reducer, defaultAppState)}>
    {children}
  </AppStateContext.Provider>
)

export const useAppStateContext = () => useContext(AppStateContext)

const filter_results = (library, filters) => {
  let sorted = _.sortBy(library, (val) => {
    let key = filters.sortBy

    if (key === 'author') {
      return val[key].trim()
    }

    if (key === 'title') {
      let simplified = val[key].toLowerCase()

      if (simplified.startsWith('the ')) {
        return simplified.replace('the ', '')
      }

      if (simplified.startsWith('an ')) {
        return simplified.replace('an ', '')
      }
      
      if (simplified.startsWith('a ')) {
        return simplified.replace('a ', '')
      }

      return simplified
    }
  })

  if (filters.text && filters.text.length > 0) {
    sorted = sorted.filter(book => {
      let author = book.author.trim().toLowerCase()
      let title = book.title.trim().toLowerCase()
      let search = filters.text.trim().toLowerCase()
      if (_.includes(author, search)) return true
      if (_.includes(title, search)) return true
      return false
    })
  }

  if (filters.direction === 'desc') {
    sorted.reverse()
  }

  return sorted
}

export const stateReducer = (state, action) => {
  // console.log(`%cSTATE.action.type: ${action.type}`, 'color: blue;')

  switch (action.type) {
    case 'filter-text':
      let filtersUpdatedText = {...state.filters, text: action.value}
      return { ...state, filters: filtersUpdatedText, results: filter_results(state.library, filtersUpdatedText)}

    case 'filter-toggle-direction':
      let newDirection = (state.filters.direction === 'asc') ? 'desc' : 'asc'
      let filtersUpdatedDirection = {...state.filters, direction: newDirection}
      return { ...state, filters: filtersUpdatedDirection, results: filter_results(state.library, filtersUpdatedDirection)}

    case 'filter-sort-by':
      let filtersUpdatedSortBy = {...state.filters, sortBy: action.value}
      return { ...state, filters: filtersUpdatedSortBy, results: filter_results(state.library, filtersUpdatedSortBy)}

    case 'error-add':
      return { ...state, errors: [...state.errors, action.error]}

    case 'set-filters':
      return { ...state, misc: 'none...' }

    case 'toggle-menu':
      return { ...state, menuOpen: !state.menuOpen }

    case 'update-library':
      // console.log(`%cUPDATE-LIBRARY`, 'color: orange;', action)
      return { ...state, library: action.library, results: filter_results(action.library, state.filters)}

    default:
      console.log('%c Unhandled reducer action', 'color: orange;', action)
      return state
  }
}
