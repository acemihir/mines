import GamePlay from "./pages/GamePlay";
import { Container, Box } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import background from "./assets/images/hero.png";
import "./App.css";
import useGameStore from "./GameStore";

function App() {
  return (
    <Container
      className="App"
      disableGutters={true}
      maxWidth={false}
      style={{ backgroundImage: `url(${background})` }}
    >
      <Box className="overlay">
        <Router>
          <Routes>
            <Route path={"/"} element={<GamePlay />} />
          </Routes>
        </Router>
      </Box>
    </Container>
  );
}

export default App;
