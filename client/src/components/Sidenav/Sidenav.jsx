import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import classes from './Sidenav.module.scss'
import Backdrop from '../Backdrop/Backdrop'
import { connect } from 'react-redux'
import { hideSideNav, createTitles } from '../../redux/navigation/navigationAction'

const Sidenav = ({
  isOpen, hide, titles,
  createTitles,
}) => {

  useEffect(() => createTitles(), 
  // eslint-disable-next-line 
  [])

  const cls = [classes.Sidenav]
  if (!isOpen) {
    cls.push(classes.close)
  }

  const hideHandler = () => hide()

  return (
    <React.Fragment>
      <div className={cls.join(' ')}>
        <ul>
          { titles.map(({route, title}, index) => (
            <li key={index}>
              <NavLink to={route} onClick={hideHandler}>
                { title }
              </NavLink>
            </li>
          )) }
        </ul>
      </div>
      <Backdrop 
        onClick={hideHandler}
        show={isOpen}
        timeout={1000}
      />
    </React.Fragment>
  )
}

function mapStateToProps(state) {
  return {
    isOpen: state.navigation.sideNavIsOpen,
    titles: state.navigation.sideNavTitles,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    hide: () => dispatch(hideSideNav()),
    createTitles: () => dispatch(createTitles()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidenav)