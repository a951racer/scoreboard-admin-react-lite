import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

import './PlayerInput.css'

const NewPlayer = ({ socket }) => {
  const [value, setValue] = useState('')

  const submitForm = (e) => {
    e.preventDefault()
    const payload = {
      name: value
    }
    socket.emit('addPlayer', payload)
    setValue('')
  }

  return (
    <>
      <Form onSubmit={submitForm}>
        <InputGroup>
          <InputGroup.Text id="player">Add Player</InputGroup.Text>
          <FormControl
            type="text"
            placeholder='Player Name'
            value={value}
            onChange={(e) => {
              setValue(e.currentTarget.value)
            }}
          />
        </InputGroup>
      </Form>
      <div>&nbsp;</div>
    </>
  )
}

export default NewPlayer