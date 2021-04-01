import React, { useEffect, Fragment } from 'react'
import { Parallax } from 'react-parallax'
import classes from './Index.module.scss'
import GallaryCard from '../../components/GalleryCard/GalleryCard'
import { connect } from 'react-redux'
import { getIndexPage } from '../../redux/pages/pagesAction'
import { setCurrentPage } from '../../redux/navigation/navigationAction'
import { BarLoader } from 'react-spinners'

import img2 from './images/2.jpg'

const Index = ({
  getPage,
  page: { cards },
  loading,
  setCurrentPage,
  loaded,
}) => {
  useEffect(() => {
    async function start() {
      if (!loaded) await getPage()
    }
    start()
    setCurrentPage('index')
    // eslint-disable-next-line
  }, [])

  if (loading)
    return (
      <div className={classes.IndexContainer}>
        <BarLoader css={{ width: '100%' }} />
      </div>
    )

  return (
    <Fragment>
      <Parallax bgImage={img2} bgImageAlt="Parallax" strength={200}>
        <div className={classes.Parallax} />
      </Parallax>
      <div className={classes.IndexContainer}>
        <div className={classes.CardsContainer}>
          {cards.map(({ route, title, titleImg, _id, category }, index) => (
            <GallaryCard
              key={index}
              title={title}
              img={titleImg}
              link={`/${category}/${_id}`}
              id={_id}
            />
          ))}
        </div>
      </div>
    </Fragment>
  )
}

function mapStateToProps(state) {
  return {
    page: state.pages.indexPage,
    loading: state.pages.loading,
    loaded: state.pages.indexPage.loaded,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPage: () => dispatch(getIndexPage()),
    setCurrentPage: page => dispatch(setCurrentPage(page)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)

function getRandomParallaxImg(min, max) {
  let rand = min + Math.random() * (max + 1 - min)
  return [img2][parseInt(rand)]
}
