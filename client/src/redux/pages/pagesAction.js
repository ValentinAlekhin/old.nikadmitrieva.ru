import { 
  LOADING_START_MP, LOADING_END_MP, FETCH_INDEX_PAGE_SUCCESS, FETCH_GALLERY_PAGE_SUCCESS, SET_PORTFOLIO_STATE, 
} from "./actionTypes"
import Axios from 'axios'

export const loadingStart = () => ({ type: LOADING_START_MP })

export const loadingEnd = () => ({ type: LOADING_END_MP })

export const getIndexPage = () => {
  return async (dispatch, getState) => {
    const curPage = getState().navigation.currentPage

    if (curPage === 'index') dispatch(loadingStart)
    
    try {
      const response = await Axios.get('/api/main-pages/index')

      const cards = response.data.cards.sort((a, b) => a.index.order - b.index.order)

      dispatch({ type: FETCH_INDEX_PAGE_SUCCESS, data: cards })
    } catch (err) {
      console.log(err)
    }
  }
}

export const setPortfolioState = () => {
  return (dispatch, getState) => {
    const categores = getState().navigation.dropMenu.subTitles

    const page = categores.reduce((acc, cat) => {
      const [ , name ] = cat.route.split('/')
      acc[name] = {
        cards: [],
        loaded: false,
      }

      return acc
    }, {})

    dispatch({
      type: SET_PORTFOLIO_STATE,
      page
    })
  }
}

export const getPortfolioPage = () => {
  return async (dispatch, getState) => {
    dispatch(loadingStart())
    const [ , category ] = getState().navigation.currentPath.split('/')
    const prevState = getState().pages.portfolio
    try {
      const response = await Axios.get(`/api/category/?category=${category}`)

      const page = {
        ...prevState,
        [category]: {
          cards: response.data.cards,
          loaded: true
        } 
      }

      dispatch({
        type: FETCH_GALLERY_PAGE_SUCCESS,
        page,
      })
    } catch (err) {
      console.log(err)
    }
  }
}