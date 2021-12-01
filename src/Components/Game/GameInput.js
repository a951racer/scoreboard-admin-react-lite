import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ButtonToolBar from 'react-bootstrap/ButtonToolbar'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

import './GameInput.css'

const NewGame = ({ socket }) => {
  const [value, setValue] = useState('')

  const submitForm = (e) => {
    e.preventDefault()
    const payload = {
      name: value
    }
    socket.emit('newGame', payload)
    setValue('')
  }

  const reset = () => {
    socket.emit('reset')
  }

  return (
    <>
      <Form onSubmit={submitForm}>
        <ButtonToolBar>
          <InputGroup>
            <InputGroup.Text id="btnGroupAddon">Game Name</InputGroup.Text>
            <FormControl
              type="text"
              placeholder='Game Name'
              value={value}
              onChange={(e) => {
                setValue(e.currentTarget.value)
              }}
            />
          </InputGroup>
          <ButtonGroup size='sm'>
            <Button variant="danger" size='sm' onClick={() => reset()}>Reset</Button>
          </ButtonGroup>
        </ButtonToolBar>
      </Form>
      <div>&nbsp;</div>
    </>
  )
}

export default NewGame