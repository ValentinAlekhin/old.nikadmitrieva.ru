import React from 'react'
import classes from './Backdrop.module.scss'
import { CSSTransition } from 'react-transition-group'

const classNames={
  enter: classes.enter,
  enterActive: classes['enter-active'],
  exit: classes.exit,
  exitActive: classes['exit-active'],
 }

const Backdrop = props => (
  <CSSTransition
    in={props.show}
    timeout={props.timeout}
    classNames={classNames}
    unmountOnExit
    mountOnEnter
  >
    <div className={classes.Backdrop} onClick={props.onClick}/>
  </CSSTransition>
)

export default Backdrop