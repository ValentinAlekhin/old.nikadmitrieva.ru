import React, { Component } from 'react';
import './App.scss';
import 'normalize.css'
import { Route, Switch, Redirect } from 'react-router-dom'
import Header from './layouts/header/Header'
import Footer from './layouts/footer/Footer'
import Index from './pages/Index/Index'
import Contact from './pages/Contact/Contact'
import About from './pages/About/About'
import Portfolio from './pages/Portfolio/Portfolio'
import Gallery from './pages/Gallery/Gallery'
import Login from './components/Login/Login'
import { connect } from 'react-redux';
import { autoLogin } from './redux/login/loginAction';
import Sidenav from './components/Sidenav/Sidenav';
import { setPortfolioState } from './redux/pages/pagesAction';

class App extends Component {
  constructor(props) {
    super(props)
    this.autoLogin = props.autoLogin
    this.setPortfolioState = props.setPortfolioState
  }

  turnOfContextMenu = e => {
    e.preventDefault()
  }

  render() {

    this.setPortfolioState()
    this.autoLogin()

    return (
      <div onContextMenu={this.turnOfContextMenu} className="App">
        <Header/>
  
        <Login />
  
        <Sidenav />
  
        <Switch>
          <Route path="/" exact component={Index}/>
          <Route path="/contact" component={Contact}/>
          <Route path="/about" component={About}/>
          <Route path="/:category" exact component={Portfolio}/>
          <Route path="/:category/:gallery" component={Gallery}/>
          <Redirect to={'/'}/>
        </Switch>
        
        <Footer/>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin()),
    setPortfolioState: () => dispatch(setPortfolioState()),
  }
}

export default connect(null, mapDispatchToProps)(App)
