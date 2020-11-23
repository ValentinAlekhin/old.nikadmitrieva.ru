import { 
  SHOW_LOGIN, HIDE_LOGIN, LOADING_START_L,
  LOADING_END_L, LOGOUT, LOGIN, AUTO_LOGIN
} from "./actionTypes"

const initialState = {
  loading: false,
  isLogin: false,
  isOpen: false,
  token: '',
  userId: '',
}

export const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_LOGIN:
      return {
        ...state,
        isOpen: true,
      }
    case HIDE_LOGIN:
      return {
        ...state,
        isOpen: false,
      }
    case LOADING_START_L:
      return {
        ...state,
        loading: true,
      }
    case LOADING_END_L:
      return {
        ...state,
        loading: false
      }
    case LOGOUT:
      return {
        ...state,
        isLogin: false,
        token: '',
        userId: '',
      }
    case LOGIN:
      return {
        ...state,
        isLogin: true,
        token: action.token,
        userId: action.userId,
      }
      case AUTO_LOGIN:
        return {
          ...state,
          isLogin: true,
          token: action.token,
          userId: action.userId,
        }
    default:
      return state
  }
}