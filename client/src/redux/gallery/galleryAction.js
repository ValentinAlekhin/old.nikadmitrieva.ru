import Axios from "axios"
import { 
  LOADING_START_G, LOADING_END_G, FETCH_GALLERY_SUCCESS,
  FETCH_GALLERY_ERROR, SET_GALLERY_ID, SET_COLLS, SET_GAP, 
  SET_COLL_WITDTH, SET_IMAGES, SET_CONTAINER_WITDTH, 
  SET_WINDOW_WITDTH,
  SET_COLLS_HEIGHT,

} from "./actionTypes"
import FormData from 'form-data'

export const setGalleryId = id => ({ type: SET_GALLERY_ID, id })

export const loadingStart = () => ({ type: LOADING_START_G })

export const loadingEnd = () => ({ type: LOADING_END_G })

export const fetchGallerySuccess = data => ({ type: FETCH_GALLERY_SUCCESS, data })

export const fetchGalleryError = error => ({ type: FETCH_GALLERY_ERROR, error })

export const getPage = () => {
  return async (dispatch, getState) => {
    dispatch(loadingStart())
    const [ , category, _id ] = getState().navigation.currentPath.split('/')
    try { 
      const response = await Axios.get(`/api/gallery/?category=${category}&_id=${_id}`)

      dispatch(fetchGallerySuccess(response.data.gallery))
      dispatch(setImages())
    } catch (err) {
      dispatch(fetchGalleryError(err))
    }
  }
}

export const addImg = (id, images) => {
  return async (dispatch, getState) => {
    dispatch(loadingStart())
    const { userId, token } = getState().login
    const route = getState().navigation.currentPath
    try {
      const formData = new FormData()
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i], `${id}_${i}`)
      }
      
      await Axios.post('/api/gallery/add-img', formData, { headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        'Authorization': `Bearer ${token} ${userId}`,
      } })

      dispatch(getPage(route))
    } catch (err) {
      console.log(err)
    }
  }
}

export const removeImg = id => {
  return async (dispatch, getState) => {
    dispatch(loadingStart())
    const { userId, token } = getState().login
    const route = getState().navigation.currentPath
    try {
      const { category, titleUrl, _id } = getState().gallery.data
      await Axios.post('/api/gallery/remove-img', { id, galleryId: _id, category, titleUrl }, { headers: {
        'Authorization': `Bearer ${token} ${userId}`,
      } })
      dispatch(getPage(route))
    } catch (err) {
      console.log(err)
    }
  }
}

//Grid

const setWindowWitdth = witdth => ({ type: SET_WINDOW_WITDTH, witdth })

const setContainerWitdth = witdth => ({ type: SET_CONTAINER_WITDTH, witdth })

const setColls = () => {
  return (dispatch, getState) => {
    const { windowWitdth } = getState().gallery.grid
    let numderOfColls
    switch (true) {
      case windowWitdth <= 600:
        numderOfColls = 1
        break
      case windowWitdth <= 1280:
        numderOfColls = 2
        break
      case windowWitdth <= 1920:
        numderOfColls = 3
        break
      default:
        numderOfColls = 4
    }

    dispatch({
      type: SET_COLLS,
      numderOfColls
    })
  }
}

const setGap = gap => ({ type: SET_GAP, gap })

const setCollWitdth = () => {
  return (dispatch, getState) => {
    const { containerWitdth, gap, colls } = getState().gallery.grid
    let width = containerWitdth / colls
    if (colls > 1) width -= gap

    dispatch({
      type: SET_COLL_WITDTH,
      width
    })
  }
}

const setCollsHeight = height => ({ type: SET_COLLS_HEIGHT, height })

export const setImages = () => {
  return (dispatch, getState) => {
    const { data: { images }, grid } = getState().gallery

    if (!images) return dispatch({ type: SET_IMAGES, images: [] })

    const { colls, collWidth, gap } = grid
    const collsHeight = Array(colls).fill(0)
    let currentColl = 0

    const nextImages = images
      .sort((a, b) => a.order - b.order)
      .map(img => {

        const width = collWidth
        const aspectRatio = img.sizes.width / img.sizes.height
        const height  = width / aspectRatio

        const top = collsHeight[currentColl]
        const left = gap * currentColl + collWidth * currentColl

        collsHeight[currentColl] += height + gap
        if (currentColl === colls - 1) {
          currentColl = 0
        } else currentColl++

        return {
          ...img, 
          sizes: { width, height },
          position: { top, left }
        }
      })

    

    dispatch(setCollsHeight(collsHeight.sort((a, b) => b - a)[0]))
    dispatch({ type: SET_IMAGES, images: nextImages })
  }
}

export const createGrid = (windowWitdth, containerWitdth, gap) => {
  return dispatch => {
    dispatch(setWindowWitdth(windowWitdth))
    dispatch(setContainerWitdth(containerWitdth))
    dispatch(setColls())
    dispatch(setGap(gap))
    dispatch(setCollWitdth())
    dispatch(setImages())
  }
}