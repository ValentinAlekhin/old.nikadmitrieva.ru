import React, { Component } from 'react'
import classes from './Contact.module.scss'
import Form from '../../components/Form/Form'

export default class Contact extends Component {
  render() {
    return (
      <div className={classes.Contact}>
        <Form/>
      </div>
    )
  }
}