import { useState, useEffect } from "react";
import { Box, Grid, Typography, Button, Modal } from "@mui/material";
import Mine from "../Mine";
import "./GameBoard.scss";
import axios from "axios";
import useGameStore from "../../GameStore";

const GameBoard = () => {
  const { gameState, setGameState } = useGameStore();
  const { bettingAmount } = useGameStore();
  const { boardState, setBoardState, walletAddress } = useGameStore();
  const [gameOverModalOpen, setGameOverModalOpen] = useState(false);
  const [winModalOpen, setWinModalOpen] = useState(false);

  const { nextMultiplier, setNextMultiplier } = useGameStore();
  const { gameStep, setGameStep } = useGameStore();
  const { mineAmount, setMineAmount } = useGameStore();
  const { houseEdge } = useGameStore();
  useEffect(() => {
    changeNextMultiplier();
  }, []);

  const changeNextMultiplier = () => {
    let tempMultiplier = 1;
    for (let i = 0; i < gameStep; i++) {
      tempMultiplier *= (25 - i) / (25 - i - mineAmount);
    }
    setNextMultiplier(tempMultiplier);
    console.log(`Gameboard : ${tempMultiplier}`);
  };

  const clickEvent = async (boardNum) => {
    if (gameState == 0) return;
    const newBoardState = boardState;
    const body = {
      walletAddress,
      boardNum,
    };
    let res = await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/checkMine`, body)
      .then((res) => {
        if (res.data.result === "bomb") {
          console.log(res.data);
          setGameState(0);
          setGameOverModalOpen(true);
          const allBoardState = JSON.parse(res.data.board.boardString);
          allBoardState.forEach((item, key) => {
            console.log("sdf");
            if (item === 0) allBoardState[key] = 1;
            else allBoardState[key] = 2;
          });
          console.log(allBoardState);
          setGameStep(0);
          setNextMultiplier(1);
          setBoardState(allBoardState);
          return;
        }
        newBoardState[boardNum] = 1;
        console.log(`gameStep is : ${gameStep}, mineAmount is : ${mineAmount}`);
        if (1 * gameStep + 1 * mineAmount == 26) {
          console.log(nextMultiplier);
          console.log(bettingAmount);
          console.log();

          setWinModalOpen(true);
          setGameState(0);
          console.log("here");
          return;
        }
        console.log("after");
        setGameStep(gameStep + 1);
        changeNextMultiplier();
        setBoardState(newBoardState);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGameOverModalClose = () => {
    setGameOverModalOpen(false);
  };
  const handleWinModalClose = () => {
    setWinModalOpen(false);
  };

  const onClickCloseBtn = () => {
    setGameOverModalOpen(false);
  };

  const onClickWinCloseBtn = () => {
    setWinModalOpen(false);
  };

  const rectangle = boardState.map((item, key) => {
    return (
      <>
        {key % 5 === 0 ? <Grid xs={1}></Grid> : <></>}
        <Grid
          xs={2}
          className="mine-block"
          onClick={() => {
            clickEvent(key);
          }}
        >
          <Mine type={boardState[key]} />
        </Grid>
        {key % 5 === 4 ? <Grid xs={1}></Grid> : <></>}
      </>
    );
  });

  return (
    <>
      <Typography className="multiplier">
        Next Multiplier{" "}
        <span className="multiplier-value">
          X{parseFloat((nextMultiplier * houseEdge).toFixed(2))}
        </span>
      </Typography>
      <Grid className="gameboard-container" container>
        <Grid xs={4} />
        <Grid xs={4}>
          <Grid className="gameboard" container spacing={2}>
            {rectangle}
          </Grid>
        </Grid>
        <Grid xs={4} />
        <Modal
          open={gameOverModalOpen}
          onClose={handleGameOverModalClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={style}>
            <h2 id="parent-modal-title">Sorry...</h2>
            <p id="parent-modal-description">😢 You Lose 😢</p>
            <Button
              variant="contained"
              style={{ marginTop: "10px" }}
              onClick={onClickCloseBtn}
            >
              CLOSE
            </Button>
          </Box>
        </Modal>
        <Modal
          open={winModalOpen}
          onClose={handleWinModalClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={style}>
            <h2 id="parent-modal-title">🎉 Congratulations, You Win !!! 🎉</h2>
            <p id="parent-modal-description">
              You Earned :{" "}
              {parseFloat(
                (nextMultiplier * houseEdge * bettingAmount).toFixed(2)
              )}{" "}
              SOL
            </p>
            <Button
              variant="contained"
              style={{ marginTop: "10px" }}
              onClick={onClickWinCloseBtn}
            >
              CLOSE
            </Button>
          </Box>
        </Modal>
      </Grid>
    </>
  );
};

const style = {
  textAlign: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 200,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "30px",
  boxShadow: 24,
  p: 4,
};

export default GameBoard;
