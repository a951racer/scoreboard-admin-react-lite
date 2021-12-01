import React, { useEffect, useState, useRef } from 'react'
import './Scores.css'
import ScoreCell from './ScoreCell'
import AddRound from './AddRound'

function Scores({ socket }) {

    const [scoresheet, setScoresheet] = useState([[]])
    const scoresheetRef = useRef(scoresheet)

    const setScoresheetPlayers = (newPlayers) => {
        let newSheet = scoresheetRef.current
        newSheet[0] = newPlayers
        setScoresheet([...newSheet])
    }

    const setScoresheetScores = (newScores) => {
        let newSheet = []
        if (newScores) {
            let index = 1

            newScores.forEach(
                (round) => {
                    while (round.round > index) {
                        newSheet.push(scoresheetRef.current[0].map(player => { return { playerName: player.name, score: '0' } }))
                        index++
                    }
                    newSheet.push([])
                    scoresheetRef.current[0].forEach(
                        (player) => {
                            let score = round.scores.filter(score => score.playerName === player.name)[0]
                            newSheet[index - 1].push(score ? score : { playerName: player.name, score: '0' })
                        }
                    )
                    index++
                }
            )
            let tempSheet = scoresheetRef.current
            newSheet.forEach(
                (round, roundIndex) => {
                    tempSheet[roundIndex + 1] = round
                }
            )
            setScoresheet([...tempSheet])
        } else {
            setScoresheet([scoresheetRef.current[0]])
        }
    }

    const playerListener = (players) => {
        if (players) {
            setScoresheetPlayers(players)
            socket.emit('getScores')
        } else {
            setScoresheet([[]])
        }
    }

    const scoreListener = (scores) => {
        setScoresheetScores(scores)
    }

    useEffect(() => {
        scoresheetRef.current = scoresheet
    }, [scoresheet])

    useEffect(() => {

        socket.on('players', playerListener)
        socket.on('scores', scoreListener)
        socket.on('totals', playerListener)

        socket.emit('getPlayers')

        return () => {
            socket.off('players', playerListener)
            socket.off('scores', scoreListener)
            socket.off('totals', playerListener)
        }

        // eslint-disable-next-line
    }, [socket])

    return (
        <>
            <table className='score-table'>
                <thead>
                    <tr>
                        <th>Round</th>
                        {
                            scoresheet[0].map(
                                (player) => {
                                    return <th>{player.name}</th>
                                }
                            )
                        }
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <th>Total Score</th>
                        {
                            scoresheet[0].map(
                                (player) => {
                                    return <th>{player.total}</th>
                                }
                            )
                        }
                    </tr>
                </tfoot>
                <tbody>
                    {
                        scoresheet.map(
                            (scoreRow, roundIndex) => {
                                return roundIndex !== 0 ?
                                    <tr>
                                        <td>{roundIndex}</td>
                                        {
                                            scoreRow.map(
                                                (score) => {
                                                    return <td>
                                                        <ScoreCell socket={socket} playerName={score.playerName} round={roundIndex} initialScore={score.score} />
                                                    </td>
                                                }
                                            )
                                        }
                                    </tr>
                                    : <></>
                            }
                        )
                    }
                    {scoresheet[0].length > 0 ?
                        <tr>
                            <td>
                                <AddRound socket={socket} players={scoresheet[0]} rounds={scoresheet.length} />
                            </td>
                        </tr>
                        : <></>
                    }
                </tbody>
            </table>
        </>
    )

}

export default Scores