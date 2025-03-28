import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  width: 60vw;
  height: 60vh;
  border: 5px solid black;
  background-color: blue;
`;

const Text = styled.span`
  width: 80%;
  font-size: 30px;
  text-align: center;
  color: white;
`;

const Textbox = styled.input`
  width: 60%;
  color: black;
  font-size: 15px;
  border: 2px solid black;
  padding: 20px;
`;

const Button = styled.button`
  width: 20%;
  background-color: gray;
  color: white;
  border-radius: 12px;
`;

const Modal = ({ clue }) => {
  return (
    <Container>
      <Text>{clue}</Text>
      <Textbox type="text" />
      <Button type="submit">Submit</Button>
    </Container>
  );
};

export default Modal;
