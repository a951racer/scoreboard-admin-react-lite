import React, { useState, useRef } from 'react'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

function ScoreCell({ socket, playerName, round, initialScore }) {

    const [score, setScore] = useState(initialScore)
    const submitted = useRef(true)

    const submitForm = (e) => {
        e.preventDefault()
        const payload = {
            playerName,
            round,
            score
        }
        submitted.current = true
        socket.emit('addScore', payload)
    }

    return (
        <>
            <Form onSubmit={submitForm}>
                <InputGroup>
                    <FormControl
                        className={submitted.current ? "form-control" : "form-control bg-warning"}
                        type="number"
                        placeholder="-"
                        value={score}
                        onChange={(e) => {
                            submitted.current = false
                            setScore(e.currentTarget.value)
                        }}
                    />
                </InputGroup>
            </Form>
        </>
    )
}

export default ScoreCell