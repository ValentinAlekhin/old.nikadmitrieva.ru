import { 
  LOADING_START_G, LOADING_END_G, FETCH_GALLERY_SUCCESS, FETCH_GALLERY_ERROR, SET_WINDOW_WITDTH, SET_CONTAINER_WITDTH, SET_COLLS, SET_COLL_WITDTH, SET_GAP, SET_IMAGES, SET_COLLS_HEIGHT, 
} from "./actionTypes"

const initialState = {
  data: {},
  loading: true,
  error: null,
  grid: {
    windowWitdth: null,
    containerWitdth: null,
    colls: null,
    collWidth: null,
    collsHeight: null,
    gap: null,
    images: []
  }
}

export const GallaryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GALLERY_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
      }
    case FETCH_GALLERY_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      }
    case LOADING_START_G:
      return {
        ...state,
        loading: true,
      }
    case LOADING_END_G:
      return {
        ...state,
        loading: false,
      }

    //Grid

    case SET_WINDOW_WITDTH:
      return {
        ...state,
        grid: {
          ...state.grid, 
          windowWitdth: action.witdth 
        }
      }
    case SET_CONTAINER_WITDTH:
      return {
        ...state,
        grid: {
          ...state.grid, 
          containerWitdth: action.witdth 
        }
      }
    case SET_COLLS:
      return {
        ...state,
        grid: {
          ...state.grid, 
          colls: action.numderOfColls 
        }
      }
    case SET_COLL_WITDTH:
      return {
        ...state,
        grid: {
          ...state.grid, 
          collWidth: action.width 
        }
      }
    case SET_COLLS_HEIGHT:
      return {
        ...state,
        grid: {
          ...state.grid, 
          collsHeight: action.height 
        }
      }
    case SET_GAP:
      return {
        ...state,
        grid: {
          ...state.grid,
          gap: action.gap
        }
      }
    case SET_IMAGES:
      return {
        ...state,
        grid: { 
          ...state.grid,
          images: action.images 
        }
      }
    default:
      return state
  }
}