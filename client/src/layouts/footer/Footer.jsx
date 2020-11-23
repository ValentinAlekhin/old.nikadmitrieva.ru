import React from 'react'
import classes from './Footer.module.scss'
import { connect } from 'react-redux'
import { showLogin, signOut } from '../../redux/login/loginAction'

const Footer = ({ showLogin, logOut, isLogin }) => {

  const date = new Date().getFullYear()

  const doubleClickHandler = () => {
    if (isLogin) {
      logOut()
    } else showLogin()
  }

  return (
    <footer className={classes.Footer}>
      <span onDoubleClick={doubleClickHandler}>
      © { date } Ника Дмитриева
      </span>
    </footer>
  )
}

function mapStateToProps(state) {
  return {
    isLogin: state.login.isLogin,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    showLogin: () => dispatch(showLogin()),
    logOut: () => dispatch(signOut())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer)