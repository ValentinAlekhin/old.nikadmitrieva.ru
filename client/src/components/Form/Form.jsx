import React, { Component } from 'react'
import classes from './Form.module.scss'
import Button from '../../UI/Button/Button'
import Input from '../../UI/Input/Input'

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.state = {
      status: ""
    };
  }

  render() {
    const { status } = this.state;
    return (
      <form
        className={classes.Form}
        onSubmit={this.submitForm}
        action="https://formspree.io/xzbajwoa"
        method="POST"
      >

        <Input 
          type="email"
          label="Почта"
          placeholder="Введите вашу почту"
        />

        <Input 
          textaria={true}
          type="text"
          label="Сообщение"
          placeholder="Введите вашу сообщение"
        />

        {/* <div className={classes.Email}>
          <label>Почта</label>
          <input type="email" name="email" />
        </div>
        <div className={classes.Message}>
          <label>Сообщение</label>
          <textarea type="text" name="message" />
        </div> */}
        {status === "SUCCESS" ? <p>Спасибо!</p> : <Button text="Отправить" />}
        {status === "ERROR" && <p>Упс, что-то пошло не так.</p>}
      </form>
    );
  }

  submitForm(ev) {
    ev.preventDefault();
    const form = ev.target;
    const data = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        form.reset();
        this.setState({ status: "SUCCESS" });
      } else {
        this.setState({ status: "ERROR" });
      }
    };
    xhr.send(data);
  }
}