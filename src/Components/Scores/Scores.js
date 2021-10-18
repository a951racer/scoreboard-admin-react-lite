import React, { useEffect, useState } from 'react'
import './Scores.css'

function Scores({ socket }) {
  const [scores, setScores] = useState({})

  useEffect(() => {
    const scoreListener = (scores) => {
      if (scores) {
        setScores(scores)
      } else {
        setScores({})
      }
    };

    socket.on('scores', scoreListener)
    socket.emit('getScores');

    return () => {
      socket.off('score', scoreListener);
    };
  }, [socket]);

  return (
    <div className="message-list">
          <div>Scores</div>
          {[...Object.values(scores)]
            .sort((a, b) => a.round - b.round)
            .map((round) => (
              <div
                key={round.round}
                className="message-container"
              >
                <span>{round.round} -</span>
                {round.scores.map((score) => (
                  <span>&nbsp;{score.playerName} - {score.score}</span>))}
              </div>
            ))
          }
    </div>
  );
}

export default Scores;

