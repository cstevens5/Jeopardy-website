import styled from "styled-components";
import Column from "../components/Column";
import Modal from "../components/Modal";
import { useState } from "react";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 8px;
  padding: 20px;
`;

const data = [
  {
    category: "History",
    clues: [
      { value: 200, clue: "clue 1" },
      { value: 400, clue: "clue 2" },
      { value: 600, clue: "clue 3" },
      { value: 800, clue: "clue 4" },
      { value: 1000, clue: "clue 5" },
    ],
  },
  {
    category: "Geography",
    clues: [
      { value: 200, clue: "clue 1" },
      { value: 400, clue: "clue 2" },
      { value: 600, clue: "clue 3" },
      { value: 800, clue: "clue 4" },
      { value: 1000, clue: "clue 5" },
    ],
  },
  {
    category: "Literature",
    clues: [
      { value: 200, clue: "clue 1" },
      { value: 400, clue: "clue 2" },
      { value: 600, clue: "clue 3" },
      { value: 800, clue: "clue 4" },
      { value: 1000, clue: "clue 5" },
    ],
  },
  {
    category: "Presidents",
    clues: [
      { value: 200, clue: "clue 1" },
      { value: 400, clue: "clue 2" },
      { value: 600, clue: "clue 3" },
      { value: 800, clue: "clue 4" },
      { value: 1000, clue: "clue 5" },
    ],
  },
  {
    category: "Programming",
    clues: [
      { value: 200, clue: "clue 1" },
      { value: 400, clue: "clue 2" },
      { value: 600, clue: "clue 3" },
      { value: 800, clue: "clue 4" },
      { value: 1000, clue: "clue 5" },
    ],
  },
  {
    category: "Science",
    clues: [
      { value: 200, clue: "clue 1" },
      { value: 400, clue: "clue 2" },
      { value: 600, clue: "clue 3" },
      { value: 800, clue: "clue 4" },
      { value: 1000, clue: "clue 5" },
    ],
  },
];

const GameBoard = () => {
  const [selectedClue, setSelectedClue] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleClueClick = (clue) => {
    setSelectedClue(clue);
    setShowModal(true);
  };

  return (
    <>
      <Container>
        {data.map((element, index) => (
          <Column
            key={index}
            category={element.category}
            clues={element.clues}
            onClueClick={handleClueClick}
          />
        ))}
      </Container>
      {showModal && selectedClue && (
        <Modal clue={selectedClue} onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

export default GameBoard;
