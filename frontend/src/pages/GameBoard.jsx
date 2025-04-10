import styled from "styled-components";
import Column from "../components/Column";
import Modal from "../components/Modal";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

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

const InterimDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  gap: 20px;
`;

const DisplayText = styled.span`
  font-size: 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Button = styled.button`
  font-size: 20px;
  padding: 5px;
`;

const GameBoard = () => {
  const [selectedClue, setSelectedClue] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [clues, setClues] = useState([]);
  const [answeredClues, setAnsweredClues] = useState({}); // clue id -> bool correct answer
  const [score, setScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const { gameid } = useParams();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const airdate = query.get("airdate");
  const [round, setRound] = useState("J!");
  const [showDoublePrompt, setShowDoublePrompt] = useState(false);
  const navigate = useNavigate();

  const handleClueClick = (clue) => {
    // prevent the user from answer the same clue multiple times
    if (answeredClues[clue.id]?.scored) {
      return;
    }
    setSelectedClue(clue);
    setShowModal(true);
  };

  // function to update the answeredClues map
  const handleAnswer = (clue, isCorrect) => {
    // prevent double scoring
    if (answeredClues[clue.id]) {
      return;
    }

    // add to the answered clues map
    setAnsweredClues((prev) => ({
      ...prev,
      [clue.id]: { isCorrect, scored: true },
    }));

    // update the score
    setScore((prev) => prev + (isCorrect ? clue.value : -clue.value));

    // update the number of clues that have been answered
    setAnsweredCount((prev) => prev + 1);
  };

  // function to handle overriding a response marked incorrect
  const handleOverride = (clue) => {
    const id = clue.id;
    const existing = answeredClues[id];

    // If already marked correct or doesn't exist, do nothing
    if (!existing || existing.isCorrect) return;

    // Update score by reversing the penalty and adding the value
    setScore((prev) => prev + clue.value * 2);

    // Mark clue as now correct
    setAnsweredClues((prev) => ({
      ...prev,
      [id]: { isCorrect: true, scored: true },
    }));
  };

  const playDoubleJeopardy = (e) => {
    e.preventDefault();
    // don't display the double jeopardy prompt anymore
    setShowDoublePrompt(false);
    // set the round
    setRound("DJ!");
    setAnsweredCount(0);
  };

  const onComplete = () => {
    const newCount = answeredCount + 1;
    setAnsweredCount(newCount);

    const totalClueCount = clues.reduce(
      (acc, col) => acc + col.clues.length,
      0,
    );
    if (newCount === totalClueCount) {
      // Wait until modal fully closes
      setTimeout(() => {
        if (round === "J!") {
          setShowDoublePrompt(true);
        } else {
          navigate("/summary");
        }
      }, 200); // slight delay after modal closes
    }
  };

  // get the clues for a selected game - placeholder, gameid 1
  useEffect(() => {
    const getClues = async () => {
      let response;
      try {
        if (gameid) {
          response = await fetch(`/api/clues/grouped/${gameid}/${round}`);
        } else if (airdate) {
          response = await fetch(`/api/games/grouped/${airdate}/${round}`);
        } else {
          setError("No gameId or airdate provided");
        }

        const data = await response.json();

        // Add check to see if it's really valid data
        if (!data || data.length === 0) {
          setError("No clues returned");
          return;
        }

        setClues(data);
      } catch (err) {
        try {
        } catch (err) {
          setError(err);
        }
      }
    };

    getClues();
  }, [gameid, airdate, round]);

  // if an error was encountered - display the error
  if (error) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <>
      {!showDoublePrompt && (
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
              overrideFunc={handleOverride}
              onComplete={onComplete}
            />
          )}
        </>
      )}
      {showDoublePrompt && (
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
