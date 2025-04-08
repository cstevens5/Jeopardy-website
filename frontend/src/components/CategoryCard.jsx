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
  text-align: center;
`;

const Text = styled.span`
  font-size: 20px;
  color: #ffd700;
`;

const CategoryCard = ({ category }) => {
  return (
    <Container>
      <Text>{category}</Text>
    </Container>
  );
};

export default CategoryCard;
