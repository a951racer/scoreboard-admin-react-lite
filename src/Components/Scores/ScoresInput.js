import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ButtonToolBar from 'react-bootstrap/ButtonToolbar'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
//import FormSelect from 'react-bootstrap/FormSelect'

//import FormLabel from 'react-bootstrap/FormLabel'

//import Dropdown from 'react-bootstrap/Dropdown'
//import DropdownButton from 'react-bootstrap/DropdownButton'
import './ScoresInput.css';

const NewScore = ({socket}) => {
  const [players, setPlayers] = useState([])
  const [playerName, setPlayerName] = useState('')
  const [round, setRound] = useState(1)
  const [score, setScore] = useState('')

  useEffect(() => {
    const playerListener = (updatedPlayers) => {
      if (updatedPlayers) {
        setPlayers(updatedPlayers)
      } else {
        setPlayers([])
      }
    };

    socket.on('players', playerListener)
    socket.emit('getPlayers');

    return () => {
      socket.off('player', playerListener);
    };
  }, [socket]);

  const submitForm = (e) => {
    e.preventDefault();
    const payload = {
        playerName,
        round,
        score
    }
    socket.emit('addScore', payload)
    setScore('')
  }

  const changeRound = (type) => {
    if (type === '+') {
      setRound(parseInt(round) + 1)
    } else {
      setRound(parseInt(round) - 1)
    }
  }

  return (
    <Form onSubmit={submitForm}>
      <div className='label'>Scores:</div>
        <ButtonToolBar>
          <InputGroup>
              <InputGroup.Text id="btnGroupAddon">Round</InputGroup.Text>
              <FormControl
                type="text"
                placeholder='Round'
                value={round}
                onChange={(e) => {
                  setRound(e.currentTarget.value);
                }}
              />
          </InputGroup>
          <ButtonGroup size='sm'>
            <Button variant="outline-secondary" size='sm' onClick={() => changeRound('-')}>-</Button>
            <Button variant="outline-secondary" size='sm' onClick={() => changeRound('+')}>+</Button>
          </ButtonGroup>
        </ButtonToolBar>
        <InputGroup>
          <InputGroup.Text id="btnGroupAddon">Player</InputGroup.Text>
          { players ? (
            <Form.Control as="select"
              onChange={(e) => {
                setPlayerName(e.currentTarget.value)
              }}
            >
              <option>-- Select Player --</option>
              {
                players.map((player) => <option>{player.name}</option>)
              }
            </Form.Control>
            ) : (
              <Form.Control type="text" placeholder="Player" readOnly />
            )
          }
        </InputGroup>

        <InputGroup>
          <InputGroup.Text id="btnGroupAddon">Score</InputGroup.Text>
          <FormControl
            type="text"
            placeholder='69'
            value={score}
            onChange={(e) => {
              setScore(e.currentTarget.value)
            }}
          />
        </InputGroup>
        <input type='submit' />
    </Form>
  )
}

export default NewScore