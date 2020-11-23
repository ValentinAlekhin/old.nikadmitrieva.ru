import React from 'react'
import {NavLink} from 'react-router-dom'
import classes from './GalleryCard.module.scss'
import { connect } from 'react-redux'
import { useState } from 'react'
import ImgControlPanel from '../../UI/ImgControlPanel/ImgControlPanel'
import { CSSTransition } from 'react-transition-group'

const GalleryCard = ({
  img: { main, placeholder }, 
  link, title, 
  isLogin, id
}) => {

  const [hover, setHover] = useState(false)
  const [imgLoad, setImgLoad] = useState(false)

  const classNames = {
    enter: classes.enter,
    enterActive: classes['enter-active'],
    exit: classes.exit,
    exitActive: classes['exit-active'],
   }

  const renderPicture = () => {
    const webpSrc = []
    const jpegSrc = []

    Object.entries(main).forEach(([tag, { webp, jpeg }]) => {
      webpSrc.push(`${webp} ${tag}`)
      jpegSrc.push(`${jpeg} ${tag}`)
    })

    return (
      <picture>
        <source srcSet={webpSrc.join(', ')} type="image/webp"/>
        <source srcSet={jpegSrc.join(', ')} type="image/jpeg"/>
        <img 
          src={main['400w'].jpeg} 
          className={classes.ImgItem} 
          alt={title}
          onLoad={() => setImgLoad(true)}
          />
      </picture>
    )
  }

  return (
    <div 
      className={classes.GalleryCard}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      { isLogin && <ImgControlPanel 
        show={hover} 
        id={id}
      /> }
      <NavLink 
        className={classes.ImgContainer} 
        to={link} 
        >
        <CSSTransition
          in={!imgLoad}
          timeout={300}
          classNames={classNames}
          unmountOnExit
          mountOnEnter
        >
          <img 
            srcSet={placeholder} 
            className={classes.ImgPlaceholder} 
            alt={title}
          />
        </CSSTransition>
        { renderPicture() }
      </NavLink>
      <NavLink className={classes.GalerryTitle} to={link}>
        <h4>
          { title }
        </h4>
      </NavLink>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    isLogin: state.login.isLogin,
    page: state.navigation.currentPage,
  }
}

export default connect(mapStateToProps)(GalleryCard)