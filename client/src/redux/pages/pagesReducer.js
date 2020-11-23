import { 
  LOADING_START_MP, LOADING_END_MP, FETCH_INDEX_PAGE_SUCCESS, FETCH_GALLERY_PAGE_SUCCESS, SET_PORTFOLIO_STATE, 
} from "./actionTypes"

const initialState = {
  loading: true,
  indexPage: {
    cards: [],
    parallax: {},
    loaded: false,
  },
  portfolio: {}
}

export const PagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PORTFOLIO_STATE:
      return {
        ...state,
        portfolio: action.page,
      }
    case FETCH_GALLERY_PAGE_SUCCESS:
      return {
        ...state,
        portfolio: action.page,
        loading: false,
      }
    case LOADING_START_MP:
      return {
        ...state,
        loading: true
      }
    case LOADING_END_MP:
      return {
        ...state,
        loading: false
      }
    case FETCH_INDEX_PAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        indexPage: {
          ...state.indexPage,
          cards: action.data,
          loaded: true,
        }
      }
    default:
      return state
  }
}