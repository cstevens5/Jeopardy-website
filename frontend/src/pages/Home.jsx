import { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

const Text = styled.h1`
  font-size: 60px;
`;

const SubText = styled.h3`
  font-size: 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  font-size: 20px;
  padding: 5px;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Label = styled.label`
  font-size: 20px;
`;

const Input = styled.input`
  padding: 5px;
  font-size: 20px;
`;

const Home = () => {
  const [enterMethod, setEnterMethod] = useState("");
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // check which method we are using to determine the game
    if (enterMethod === "gameid") {
      navigate(`/gameboard/${input}`);
    } else {
      navigate(`/gameboard?airdate=${input}`);
    }
  };

  return (
    <Container>
      <Text>Welcome to Jeopardy!</Text>
      <SubText>Choose how to select your game:</SubText>
      {enterMethod.length === 0 && (
        <ButtonContainer>
          <Button onClick={() => setEnterMethod("gameid")}>
            Enter Game ID
          </Button>
          <Button onClick={() => setEnterMethod("airdate")}>
            Enter Air Date
          </Button>
        </ButtonContainer>
      )}
      {enterMethod === "gameid" && (
        <Form onSubmit={handleSubmit}>
          <InputContainer>
            <Label htmlFor="gameid">Enter Game Id: </Label>
            <Input
              type="text"
              id="gameid"
              name="gameid"
              onChange={(e) => setInput(e.target.value)}
            />
          </InputContainer>
          <Button type="submit">Submit</Button>
        </Form>
      )}
      {enterMethod === "airdate" && (
        <Form onSubmit={handleSubmit}>
          <InputContainer>
            <Label htmlFor="airdate">
              Enter Air Date <br />
              (YYYY-MM-DD):{" "}
            </Label>
            <Input
              type="text"
              id="airdate"
              name="airdate"
              onChange={(e) => setInput(e.target.value)}
            />
          </InputContainer>
          <Button type="submit">Submit</Button>
        </Form>
      )}
    </Container>
  );
};

export default Home;
