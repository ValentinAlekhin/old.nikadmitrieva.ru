import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import classes from './Header.module.scss'
import MenuIMG from './menu.svg'
import DropMenu from '../../components/DropMenu/DropMenu'
import { showSideNav } from '../../redux/navigation/navigationAction'

const Header = ({
  navigation: { logoTitle, titles, dropMenu},
  showSideNav
}) => {

  return (
    <header className={classes.Header}>
      <div className={classes.MenuIcon}>
        <img 
          src={MenuIMG} 
          alt="menu"
          onClick={() => showSideNav()}
        />
      </div>
      <h1>
        <Link to="/">{logoTitle}</Link>
      </h1>
      <nav className={classes.Nav}>
        <ul className={classes.NavContainer}>

          <li className={classes.NavItem}>
            <NavLink 
              className={classes.NavLink} 
              to={titles[0].route}
            >
              { titles[0].title }
            </NavLink>
          </li>

          <DropMenu title={dropMenu.title} subTitles={dropMenu.subTitles}/>

          <li className={classes.NavItem}>
            <NavLink 
              className={classes.NavLink} 
              to={titles[1].route}
            >
              { titles[1].title }
            </NavLink>
            </li>
         
          </ul>
      </nav>
    </header>
  )
}

function mapStateToProps(state) {
  return {
    navigation: state.navigation,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    showSideNav: () => dispatch(showSideNav())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)