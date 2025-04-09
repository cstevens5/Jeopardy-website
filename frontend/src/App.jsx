import GameBoard from "./pages/GameBoard";
import Home from "./pages/Home";
import Summary from "./pages/Summary";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gameboard/:gameid?" element={<GameBoard />} />
        <Route path="/summary" element={<Summary />} />
      </Routes>
    </Router>
  );
}

export default App;
