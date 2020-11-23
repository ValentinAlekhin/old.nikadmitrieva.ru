import React, { useState } from 'react'
import classes from './GalleryItem.module.scss'
import { connect } from 'react-redux'
import ImgControlPanel from '../../UI/ImgControlPanel/ImgControlPanel'
import { removeImg } from '../../redux/gallery/galleryAction'
import { CSSTransition } from 'react-transition-group'

const GalleryItem = ({
  img: { id, path, sizes, position },
  isLogin,
}) => {

  const [show, setShow] = useState(false)
  const [imgLoad, setImgLoad] = useState(false)

  const style = {
    top: position.top,
    left: position.left,
    width: sizes.width,
    height: sizes.height
  }

  const classNames = {
    enter: classes.enter,
    enterActive: classes['enter-active'],
    exit: classes.exit,
    exitActive: classes['exit-active'],
  }

  const renderPicture = () => {
    const webpSrc = []
    const jpegSrc = []

    Object.entries(path.main).forEach(([tag, { webp, jpeg }]) => {
      webpSrc.push(`${webp} ${tag}`)
      jpegSrc.push(`${jpeg} ${tag}`)
    })

    return (
      <picture>
        <source srcSet={webpSrc.join(', ')} type="image/webp"/>
        <source srcSet={jpegSrc.join(', ')} type="image/jpeg"/>
        <img 
          src={path.main['400w'].jpeg} 
          className={classes.ImgItem} 
          alt={id}
          onLoad={() => setImgLoad(true)}
          />
      </picture>
    )
  }

  return (
    <div 
      className={classes.GalleryItem}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      style={style}
    >
      { isLogin && <ImgControlPanel show={show} id={id}/> }
      <CSSTransition
          in={!imgLoad}
          timeout={300}
          classNames={classNames}
          unmountOnExit
          mountOnEnter
        >
          <img 
            srcSet={path.placeholder} 
            className={classes.ImgPlaceholder} 
            alt={id}
          />
        </CSSTransition>
        { renderPicture() }
    </div>
  )
}

function mapStateToProps(state) {
  return {
    isLogin: state.login.isLogin,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    removeImg: id => dispatch(removeImg(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GalleryItem)