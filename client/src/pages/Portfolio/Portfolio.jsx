import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import classes from './Portfolio.module.scss'
import GalleryCard from '../../components/GalleryCard/GalleryCard'
import AddGalleryCard from '../../components/AddGalleryCard/AddGalleryCard'
import { connect } from 'react-redux'
import { setCategory } from '../../redux/card/cardAction'
import { getPortfolioPage } from '../../redux/pages/pagesAction'
import { setCurrentPage, setCurrentPath } from '../../redux/navigation/navigationAction'
import { BarLoader } from 'react-spinners'

const Portfolio = ({
  loading, page, match, getPage, 
  setCategory, setCurrentPage, 
  setCurrentPath, isLogin,
}) => {

  const category = match.params.category
  const location = useLocation()

  const { loaded, cards } = page[category]

  useEffect(() => {
    (async function() {
      await setCurrentPath(location.pathname)
      if (!loaded) await getPage()
    })()
    setCategory(category)
    setCurrentPage('portfolio')
    // eslint-disable-next-line
  }, [category])

  const renderCards = () => {
    if (!cards.length) return <p>Нет данных</p>

    return (
      cards.map(({ title, titleImg, _id }, index) => (
        <GalleryCard
          key={index}
          title={title}
          img={titleImg}
          link={`/${category}/${_id}`}
          id={_id}
        />
      ))
    )
  }

  return (
    <div className={classes.PortfolioContainer}>

      { loading
        ? <BarLoader css={{ width: '100%' }}/>
        : isLogin
          ? <div className={classes.CardsContainer}>
              { renderCards() }
              <AddGalleryCard category={category}/>
            </div>
          : <div className={classes.CardsContainer}>{ renderCards() }</div> 
      }

    </div>
  )
}

function mapStateToProps(state) {
  return {
    loading: state.pages.loading,
    isLogin: state.login.isLogin,
    page: state.pages.portfolio,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPage: () => dispatch(getPortfolioPage()),
    setCategory: category => dispatch(setCategory(category)),
    setCurrentPage: page => dispatch(setCurrentPage(page)),
    setCurrentPath: path => dispatch(setCurrentPath(path)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio)