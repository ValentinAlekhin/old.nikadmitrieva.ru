import React from 'react'
import classes from './Input.module.scss'

export default ({
  label, placeholder, type, 
  name, disabled, textaria, 
  value, onChange 
}) => {

  const id = Math.random()

  const cls = [classes.Input]

  if(disabled) cls.push(classes.disabled)

  return (
    <div className={classes.Input}>
      <label htmlFor={id}>{ label }</label>

      { textaria
        ? <textarea 
          type={type || 'text'} 
          id={id}
          name={name || id}
          placeholder={placeholder || ''}
          value={value}
          disabled={disabled}
          onChange={onChange}
          style={{height: 150}}
        />
        : <input 
            type={type || 'text'} 
            id={id}
            name={name || id}
            placeholder={placeholder || ''}
            value={value}
            disabled={disabled}
            onChange={onChange}
          /> }

      
    </div>
  )
}