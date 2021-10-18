import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import Game from './Components/Game/Game'
import GameInput from './Components/Game/GameInput'
import Players from './Components/Players/Players'
import PlayerInput from './Components/Players/PlayerInput'
import ScoreInput from './Components/Scores/ScoresInput'

import './App.css';


function App() {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_SERVER_URL);
    setSocket(newSocket);
    console.log('socket opened to: ', process.env.REACT_APP_SERVER_URL)
    return () => newSocket.close();
  }, [setSocket]);

  return (
    <Container className="p-3">
      <Jumbotron>
        <h1 className="display-4 text-center">Scoreboard</h1>
        <p className="lead text-center">Game night just got real!</p>
      </Jumbotron>
      { socket ? (
        <>
          <div className="chat-container">
            <Game socket={socket} />
            <GameInput socket={socket} />
            <Players socket={socket} />
            <PlayerInput socket={socket} />
            <ScoreInput socket={socket} />
          </div>
        </>
    ) : (
        <div>Not Connected</div>
      )}
    </Container>
  )
}

export default App;