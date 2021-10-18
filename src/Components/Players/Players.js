import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

import './Players.css'

function Players({ socket }) {
  const [players, setPlayers] = useState(null)

  useEffect(() => {
    const playerListener = (updatedPlayers) => {
      if (updatedPlayers) {
        setPlayers(updatedPlayers)
      } else {
        setPlayers(null)
      }
    };

    socket.on('players', playerListener)
    socket.emit('getPlayers');

    return () => {
      socket.off('player', playerListener);
    };
  }, [socket]);

  return (
    <>
      <Form>
        <InputGroup>
          <span className='label'>Players: &nbsp;</span>
          <span className='player-list'>  { players ?
              (
                players.reduce((prev, curr) => {return prev + curr.name + ', '}, '')
              ) : (
                ''
              )
            }
          </span>
        </InputGroup>
      </Form>
    </>
  )
}

export default Players;