import { combineReducers } from 'redux'
import { CardReducer } from './card/cardReducer'
import { LoginReducer } from './login/loginReducer'
import { GallaryReducer } from './gallery/galleryReducer'
import { PagesReducer } from './pages/pagesReducer'
import { NavigationReducer } from './navigation/navigationReducer'

export default combineReducers({
  navigation: NavigationReducer,
  pages: PagesReducer,
  card: CardReducer,
  gallery: GallaryReducer,
  login: LoginReducer,
})