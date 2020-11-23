import React from 'react'
import classes from './AddGalleryCard.module.scss'
import whiteImg from './white.png'
import { useState } from 'react'
import { connect } from 'react-redux'
import { addCard } from '../../redux/card/cardAction'

const AddGalleryCard = ({ category, addCard }) => {

  const initialState = {
    title: '',
    img: null
  }

  const [ state, setState ] = useState(initialState)

  const onTitleChange = e => {
    setState({
      ...state,
      title: e.target.value
    })
  }

  const onImgInputChange = e => {
    setState({
      ...state, 
      img: e.target.files[0]
    })
  }

  const onClickHandler = async () => {
    const { title, img } = state
    await addCard(category, title, img) 
  }

  return (
    <div className={classes.AddGalleryCard}>
      <div className={classes.ImgContainer}>
        <img className={classes.ImgItem} src={whiteImg} alt="back"/>
        <input 
          type="file"
          onChange={onImgInputChange}
          accept=".jpg, .jpeg, .png"
          name="img"
        />
      </div>
      <div className={classes.TileContainer}>
        <input 
          type="text" 
          value={state.title}
          onChange={onTitleChange}
        />
      </div>
      <button onClick={onClickHandler}>Добавить</button>
    </div>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    addCard: (category, title, img) => dispatch(addCard(category, title, img))
  }
}

export default connect(null, mapDispatchToProps)(AddGalleryCard)