import React, { useEffect, useState } from 'react'
import './Game.css'

function Game({ socket }) {
  const [game, setGame] = useState({})

  const gameListener = (game) => {
    if (game) {
      setGame({
        code: game.code.toUpperCase(),
        name: game.name
      })
    } else {
      setGame({})
    }
  }

  useEffect(() => {

    socket.on('game', gameListener)
    socket.emit('getGame')

    return () => {
      socket.off('game', gameListener)
    }
  }, [socket])

  return (
    <div className="section">
      <div className='game-name'>{game.name}</div>
      <div className='game-code'>{game.code}</div>
    </div>
  )
}

export default Game