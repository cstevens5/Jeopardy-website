import { useState } from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const Container = styled.form`
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

const Modal = ({ clue, onClose, handleAnswer, overrideFunc }) => {
  const [inputResponse, setInputResponse] = useState("");
  const stopwords = ["the", "a", "an", "of", "in", "on", "at", "to"];
  const [feedback, setFeedback] = useState("");
  const [answerRecorded, setAnswerRecorded] = useState(false);

  const normalizeText = (text) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .split(" ")
      .filter((word) => !stopwords.includes(word))
      .filter(Boolean);
  };

  const isCorrectResponse = (userInput, correctAnswer) => {
    const userWords = normalizeText(userInput);
    const answerWords = normalizeText(correctAnswer);

    // Check if every important word in the answer appears in the user input
    return answerWords.every((word) => userWords.includes(word));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isCorrect = isCorrectResponse(inputResponse, clue.response);
    handleAnswer(clue, isCorrect);
    setAnswerRecorded(true);

    if (isCorrect) {
      setFeedback("✅ Correct!");
    } else {
      setFeedback(`❌ Incorrect! Correct answer: ${clue.response}`);
    }

    // Hide feedback and modal after 2 seconds
    setTimeout(() => {
      setFeedback("");
      onClose();
    }, 2000);
  };

  const handleOverride = () => {
    if (!answerRecorded) return;
    overrideFunc(clue);
    setFeedback("✅ Correct! (Override)");
    setTimeout(() => {
      setFeedback("");
      onClose();
    }, 1500);
  };

  return (
    <Overlay onClick={onClose}>
      <Container onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <Text>{clue.clue}</Text>
        <Textbox
          type="text"
          onChange={(e) => setInputResponse(e.target.value)}
        />
        <Button type="submit">Submit</Button>
        {feedback && (
          <>
            <div style={{ color: "white", fontSize: "20px" }}>{feedback}</div>
            {feedback.includes("Incorrect") && (
              <Button onClick={handleOverride}>I was Correct</Button>
            )}
          </>
        )}
      </Container>
    </Overlay>
  );
};

export default Modal;
