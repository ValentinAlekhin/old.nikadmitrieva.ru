import Axios from 'axios'
import { 
  SET_CATEGORY,
} from './actionTypes'
import formData from 'form-data'
import { 
  getPortfolioPage,  getIndexPage, 
  loadingStart, loadingEnd,
} from '../pages/pagesAction'

export const setCategory = category => ({ type: SET_CATEGORY, category })

export const addCard = (category, title, img) => {
  return async (dispatch, getState) => {
    dispatch(loadingStart())
    const { userId, token } = getState().login

    const cardData = {
      category, title, userId
    }
    try {
      const cardResponse = await Axios.post('api/category/add-card', cardData, { headers: {
        'Authorization': `Bearer ${token} ${userId}`,
      } })

      if (cardResponse.status === 401) return
      const { id } = cardResponse.data

      let imgData = new formData()
      imgData.append('img', img, id)

      await Axios.post('api/category/add-title-img', imgData, { headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${imgData._boundary}`,
        'Authorization': `Bearer ${token} ${userId}`,
      } })

      await dispatch(getPortfolioPage())
    } catch (err) {
      dispatch(loadingEnd())
    }
  }
}

export const removeCard = id => {
  return async (dispatch, getState) => {
    dispatch(loadingStart())
    const { userId, token } = getState().login
    try {
      await Axios.post('api/category/remove', { id, userId }, { headers: {
        'Authorization': `Bearer ${token} ${userId}`,
      } })
      dispatch(getPortfolioPage())
    } catch (err) {
      dispatch(loadingEnd())
      console.log(err)
    }
  }
}

export const addCardToIndexPage = id => {
  return async (dispatch, getState) => {
    const { userId, token } = getState().login
    try {
      await Axios.post('/api/main-pages/add-card-to-index', { id }, { headers: {
        'Authorization': `Bearer ${token} ${userId}`,
      } })
      dispatch(loadingEnd())
    } catch (err) {
      dispatch(loadingEnd())
      console.log(err)
    }
  }
}

export const removeFromIndexPage = id => {
  return async (dispatch, getState) => {
    dispatch(loadingStart())
    const { userId, token } = getState().login
    try {
      const response = await Axios.post('/api/main-pages/remove-card-from-index', { id }, { headers: {
        'Authorization': `Bearer ${token} ${userId}`,
      } })

      if (response.status === 200) return dispatch(getIndexPage())

      dispatch(loadingEnd())
    } catch (err) {
      dispatch(loadingEnd())
      console.log(err)
    }
  }
}