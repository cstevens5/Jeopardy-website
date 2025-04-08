import styled from "styled-components";
import Column from "../components/Column";
import Modal from "../components/Modal";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 8px;
  padding: 20px;
`;

const ScoreContainer = styled.div`
  text-align: center;
  margin: 20px;
`;

const ScoreText = styled.span`
  font-size: 30px;
`;

const GameBoard = () => {
  const [selectedClue, setSelectedClue] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [clues, setClues] = useState([]);
  const [answeredClues, setAnsweredClues] = useState({}); // clue id -> bool correct answer
  const [score, setScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);

  const handleClueClick = (clue) => {
    // prevent the user from answer the same clue multiple times
    if (answeredClues[clue.id]) {
      return;
    }
    setSelectedClue(clue);
    setShowModal(true);
  };

  // function to update the answeredClues map
  const handleAnswer = (clue, isCorrect) => {
    // add to the answered clues map
    setAnsweredClues((prev) => ({
      ...prev,
      [clue.id]: isCorrect,
    }));

    // update the score
    if (isCorrect) setScore(score + clue.value);
    else setScore(score - clue.value);

    // update the number of clues that have been answered
    setAnsweredClues(answeredClues + 1);
  };

  const playDoubleJeopardy = () => {};

  // get the clues for a selected game - placeholder, gameid 1
  useEffect(() => {
    const getClues = async () => {
      try {
        const response = await fetch("/api/clues/grouped/1/J!");
        const data = await response.json();
        setClues(data);
      } catch (err) {
        setError(err);
      }
    };
    getClues();
  }, []);

  // if an error was encountered - display the error
  if (error) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <>
      <Container>
        {clues.length > 0 &&
          clues.map((element, index) => (
            <Column
              key={index}
              category={element.category}
              clues={element.clues}
              onClueClick={handleClueClick}
              answeredClues={answeredClues}
            />
          ))}
      </Container>
      <ScoreContainer>
        <ScoreText>Score: {score}</ScoreText>
      </ScoreContainer>
      {showModal && selectedClue && (
        <Modal
          clue={selectedClue}
          onClose={() => setShowModal(false)}
          handleAnswer={handleAnswer}
        />
      )}
      {answeredClues === clues.length && (
        <InterimDisplay>
          <DisplayText>Would you like to play Double Jeopardy?</DisplayText>
          <ButtonContainer>
            <Button onClick={playDoubleJeopardy}>Yes</Button>
            <Link to="/summary">
              <Button>No</Button>
            </Link>
          </ButtonContainer>
        </InterimDisplay>
      )}
    </>
  );
};

export default GameBoard;
