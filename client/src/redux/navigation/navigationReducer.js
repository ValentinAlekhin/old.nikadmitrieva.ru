import { 
  SHOW_SIDE_NAV, SET_CURRENT_PATH, SET_CURRENT_PAGE, HIDE_SIDE_NAV, CREATE_TITLES 
} from "./actionTypes"

const initialState = {
  logoTitle: 'Ника Дмитриева',
  currentPage: '/',
  currentPath: '/',
  sideNavIsOpen: false,
  titles : [
    { route: '/about', title: 'Обо мне' },
    { route: '/contact', title: 'Контакты' }
  ],
  dropMenu: {
    title: 'Портфолио',
    subTitles: [
      { route: '/graphics', title: 'Графика' },
      { route: '/watercolor', title: 'Акварель' },
      { route: '/photo', title: 'Фото' },
      { route: '/other', title: 'Другое' },
    ]
  },
  sideNavTitles: []
}

export const NavigationReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TITLES:
      return {
        ...state,
        sideNavTitles: action.titles,
      }
    case SHOW_SIDE_NAV:
      return {
        ...state,
        sideNavIsOpen: true,
      }
    case HIDE_SIDE_NAV:
      return {
        ...state,
        sideNavIsOpen: false,
      }
    case SET_CURRENT_PATH:
      return {
        ...state,
        currentPath: action.path
      }
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.page
      }
    default:
      return state
  }
}