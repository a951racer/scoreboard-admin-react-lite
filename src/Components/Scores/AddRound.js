import React from 'react'
import Button from 'react-bootstrap/Button'
import './AddRound.css'

function AddRound({ socket, players, rounds }) {

    const onButton = (e) => {
        e.preventDefault()
        socket.emit('addScore', { playerName: players[0].name, round: rounds, score: '0' })
    }

    return (
        <>
            <Button variant="primary" size='sm' onClick={onButton}>Add Round</Button>
        </>
    )
}

export default AddRound