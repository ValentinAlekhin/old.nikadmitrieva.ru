import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './DropMenu.module.scss'
import { useState } from 'react'
import { CSSTransition } from 'react-transition-group'

export default ({ 
  title, subTitles
}) => {

  const [isOpen, setIsOpen] = useState(false)

  const hideDropMenu = () => {
    setIsOpen(false)
  }

  const showDropMenu = () => {
    setIsOpen(true)
  }

  const classNames={
    enter: classes.enter,
    enterActive: classes['enter-active'],
    exit: classes.exit,
    exitActive: classes['exit-active'],
   }

  return (
    <div className={classes.DropMenu} onMouseLeave={hideDropMenu}>
      <span className={classes.DropTitle} onClick={showDropMenu} onMouseEnter={showDropMenu}>{ title }</span>
      <CSSTransition
        in={isOpen}
        timeout={200}
        classNames={classNames}
        unmountOnExit
        mountOnEnter 
      >
        <ul className={classes.DropContainer}>
            { subTitles.map(({route, title}, index) => (
              <li 
                className={classes.DropItem} 
                key={index}
                onClick={hideDropMenu}
              >
                <NavLink className={classes.DropLink} to={route}>
                  { title }
                </NavLink>
              </li>
            )) }
          </ul>
        </CSSTransition>
    </div>
  )
}