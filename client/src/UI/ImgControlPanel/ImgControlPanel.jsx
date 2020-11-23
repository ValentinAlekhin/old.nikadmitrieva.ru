import React from 'react'
import classes from './ImgControlPanel.module.scss'
import removeIcon from './icons/delete.svg'
import addToIndexPageIcon from './icons/add_to_index_page.svg'
import { connect } from 'react-redux'
import { removeCard } from '../../redux/card/cardAction'
import { removeFromIndexPage, addCardToIndexPage } from '../../redux/card/cardAction'
import { removeImg } from '../../redux/gallery/galleryAction'

const ImgControlPanel = ({ 
  id, show, page, removeGallery,
  rmFromIndex, addToIndex, removeImg

}) => {

  const createControl = (func, ico, alt) => (
      <img 
        className={classes.Ico} 
        src={ico} 
        alt={alt}
        onDoubleClick={() => func(id)}
      />
  ) 

  const controls = []

  if (page === 'index') {
    controls.push(createControl(
      rmFromIndex, removeIcon, 'remove'
    ))
  }

  if (page === 'portfolio') {
    controls.push(createControl(
      addToIndex, addToIndexPageIcon, 'add'
    ))
    controls.push(createControl(
      removeGallery, removeIcon, 'remove'
    ))
  }

  if (page === 'gallery') {
    controls.push(createControl(
      removeImg, removeIcon, 'remove'
    ))
  }

  const cls = [classes.ImgControlPanel]

  if (show) cls.push(classes.show)

  return (
    <div className={cls.join(' ')}>
      { controls.map((ctr, i) => (
        <div className={classes.IcoContainer} key={i}>
          { ctr }
        </div>
      )) }
    </div>
  )
}

function mapStateToProps(state) {
  return {
    page: state.navigation.currentPage,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    removeGallery: id => dispatch(removeCard(id)),
    rmFromIndex: id => dispatch(removeFromIndexPage(id)),
    addToIndex: id => dispatch(addCardToIndexPage(id)),
    removeImg: id => dispatch(removeImg(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImgControlPanel)