import React, { useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import classes from './Gallery.module.scss'
import { connect } from 'react-redux'
import { setCurrentPath, setCurrentPage } from '../../redux/navigation/navigationAction'
import { getPage, createGrid, setImages } from '../../redux/gallery/galleryAction'
import AddImg from '../../components/AddImg/AddImg'
import GalleryItem from '../../components/GalleryItem/GalleryItem'
import { BarLoader } from 'react-spinners'

const Gallery = ({
  data: { title, description, _id },
  loading, isLogin, getPage, createGrid, 
  images, collsHeight, setPath, setPage,
}) => {

  const loacation = useLocation()
  const containerWitdth = useRef(null)

  useEffect(() => {
    (async function() {
      await setPath(loacation.pathname)
      await getPage()
    })()
    setPage('gallery')
    createGrid(window.innerWidth, containerWitdth.current.offsetWidth, 20)
    window.addEventListener('resize', () => {
      createGrid(window.innerWidth, containerWitdth.current.offsetWidth, 20)
      setImages()
    })
    // eslint-disable-next-line
  }, [])

  const grid = () => {
    if (!images.length) return <p>No data</p>

    return images.map(img => <GalleryItem key={img.id} img={img} isLogin={isLogin}/>)
  }

  if(loading) return (
    <div className={classes.Gallery}>
      <BarLoader css={{ width: '100%' }}/>
      <div className={classes.Grid} ref={containerWitdth}></div>
    </div>
  )

  return (
    <div className={classes.Gallery}>
      <h4 className={classes.Title}>
        { title }
      </h4>
      { description && <p>{ description }</p> }
      <div 
        className={classes.Grid} 
        ref={containerWitdth}
        style={{height: collsHeight}}
      >
        { grid() }
      </div>
      { isLogin && <AddImg id={_id} /> }
    </div>
  )
}

function mapStateToProps(state) {
  return {
    loading: state.gallery.loading,
    isLogin: state.login.isLogin,
    images: state.gallery.grid.images,
    collsHeight: state.gallery.grid.collsHeight,
    data: state.gallery.data,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPage: (category, title) => dispatch(getPage(category, title)),
    createGrid: (windowWitdth, containerWitdth, gap) => dispatch(createGrid(windowWitdth, containerWitdth, gap)),
    setImages: () => dispatch(setImages()),
    setPage: page => dispatch(setCurrentPage(page)),
    setPath: path => dispatch(setCurrentPath(path)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery)