import { 
  SET_CURRENT_PAGE, SET_CURRENT_PATH, SHOW_SIDE_NAV, HIDE_SIDE_NAV, CREATE_TITLES 
} from "./actionTypes"

export const setCurrentPage = page => ({ type: SET_CURRENT_PAGE, page })

export const setCurrentPath = path => ({ type: SET_CURRENT_PATH, path })

export const showSideNav = () => ({ type: SHOW_SIDE_NAV })

export const hideSideNav = () => ({ type: HIDE_SIDE_NAV })

export const createTitles = () => {
  return (dispatch, getState) => {
    const navTitles = getState().navigation.sideNavTitles

    if (typeof navTitles !== 'undefined' && navTitles.length > 0) return

    const titles = []
    const [ about, contact ] = getState().navigation.titles
    titles.push(about)
    titles.push(...getState().navigation.dropMenu.subTitles)
    titles.push(contact)

    dispatch({ type: CREATE_TITLES, titles })
  }
}