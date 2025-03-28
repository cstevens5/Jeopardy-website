import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #060ce9;
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

const ClueCard = ({ clue, onClick }) => {
  return (
    <Container onClick={onClick}>
      <Text>${clue.value}</Text>
    </Container>
  );
};

export default ClueCard;
