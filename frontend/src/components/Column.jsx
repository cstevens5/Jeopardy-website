import CategoryCard from "./CategoryCard";
import ClueCard from "./ClueCard";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 14vw;
`;

const Column = ({ category, clues, onClueClick, answeredClues }) => {
  return (
    <Container>
      <CategoryCard category={category} />
      {clues.map((clue, index) => (
        <ClueCard
          key={index}
          clue={clue}
          onClick={() => onClueClick(clue)}
          isCorrect={
            clue.id in answeredClues ? answeredClues[clue.id].isCorrect : null
          }
        />
      ))}
    </Container>
  );
};

export default Column;
