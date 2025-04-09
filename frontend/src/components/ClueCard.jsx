import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.color};
  width: 100%;
  height: 100px;
  border: solid;
  border-width: 2px;
  border-color: black;
`;

const Text = styled.span`
  font-size: 40px;
  color: #ffd700;
`;

const ClueCard = ({ clue, onClick, isCorrect }) => {
  // function to set the card color
  const setColor = () => {
    if (isCorrect) return "#50C878";
    else if (isCorrect === false) return "#FF0000";
    return "#060ce9";
  };

  return (
    <Container onClick={onClick} color={setColor()}>
      {clue.clue && <Text>{isCorrect === null ? `$${clue.value}` : ""}</Text>}
    </Container>
  );
};

export default ClueCard;
