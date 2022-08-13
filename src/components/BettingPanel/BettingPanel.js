import { Box, Grid, Button, Modal, Typography, TextField } from "@mui/material";
import messaging from "../../assets/images/messaging.png";
import solana from "../../assets/images/solana.png";
import options from "../../assets/images/setting.png";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import "./BettingPanel.scss";
import axios from "axios";
import useGameStore from "../../GameStore";
import { useState } from "react";

const BettingPanel = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [playModalOpen, setPlayModalOpen] = useState(false);
  const [stopModalOpen, setStopModalOpen] = useState(false);

  const { walletAddress, setwalletAddress } = useGameStore();
  const { boardState, setBoardState } = useGameStore();
  const { mineAmount, setMineAmount } = useGameStore();
  const { bettingAmount, setBettingAmount } = useGameStore();
  const { gameState, setGameState } = useGameStore();
  const { gameStep, setGameStep } = useGameStore();
  const { nextMultiplier, setNextMultiplier } = useGameStore();
  const { houseEdge } = useGameStore();

  const changeNextMultiplier = () => {
    let tempMultiplier = 1;
    for (let i = 0; i < gameStep; i++) {
      tempMultiplier *= 25 / (25 - mineAmount);
    }
    setNextMultiplier(tempMultiplier);
    console.log(`Betting panel : ${tempMultiplier}`);
  };

  const onPlay = async () => {
    if (gameState == 1) {
      setStopModalOpen(true);
      return;
    }
    setPlayModalOpen(true);
    await postPlay();
  };

  const handlePlayModalClose = () => {
    setPlayModalOpen(false);
  };

  const handleStopModalClose = () => {
    setStopModalOpen(false);
  };

  const onClickStartGame = () => {
    const cboardState = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];
    setGameStep(gameStep + 1);
    changeNextMultiplier();
    setBoardState(cboardState);
    setGameState(1);
    setPlayModalOpen(false);
  };

  const onClickStopGame = () => {
    setGameState(0);
    setGameStep(1);
    const cboardState = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];
    setBoardState(cboardState);
    setStopModalOpen(false);
  };

  const onClickCloseButton = () => {
    if ((mineAmount > 24) | (mineAmount < 1)) return;
    changeNextMultiplier();
    setModalOpen(false);
  };

  const onBettingClick = (val) => {
    if (val == "plus")
      setBettingAmount(parseFloat((bettingAmount + 0.1).toFixed(2)));
    else if (val == "minus")
      setBettingAmount(parseFloat((bettingAmount - 0.1).toFixed(2)));
    else {
      setBettingAmount(parseFloat(val.toFixed(2)));
    }
  };

  const onOpen = () => setModalOpen(true);

  const postPlay = async () => {
    const body = {
      walletAddress,
      mineAmount,
    };

    let res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/play`,
      body
    );
    console.log(res.data);
  };

  return (
    <Grid className="bettingpanel-container" container>
      <Grid xs={4} />
      <Grid xs={4}>
        <Box className="settings-text">
          <span className="setting-amount">Sol Amount</span>
          <span className="minmax-values">
            Min. Mine: <span className="betsetting-value">0.05</span> Max. Mine:{" "}
            <span className="betsetting-value">2</span>
          </span>
          <span>&nbsp;</span>
        </Box>
        <Box className="betting-buttons">
          <Box className="betting-amount">
            <Box className="betting-amount-value">
              <img className="solana-image" src={solana} />
              <span className="betting-value-text">{bettingAmount}</span>
            </Box>
            <Box className="betting-amount-control">
              <Button
                className="betting-amount-addition"
                onClick={() => onBettingClick("plus")}
                disabled={gameState == 0 ? false : true}
              >
                +
              </Button>
              <Button
                className="betting-amount-addition"
                onClick={() => onBettingClick("minus")}
                disabled={gameState == 0 ? false : true}
              >
                -
              </Button>
            </Box>
          </Box>
          <Button className="betting-play" onClick={onPlay}>
            <PlayArrowIcon />
            {gameState == 0 ? "Play Game" : "Stop Game"}
          </Button>
          <Button
            className="betting-options"
            onClick={onOpen}
            disabled={gameState == 0 ? false : true}
          >
            <img className="options-image" src={options} />
          </Button>
        </Box>
        <Box className="betting-values-group">
          <Button
            className="betting-values"
            onClick={() => onBettingClick(0.05)}
            disabled={gameState == 0 ? false : true}
          >
            0.05
          </Button>
          <Button
            className="betting-values"
            onClick={() => onBettingClick(0.1)}
            disabled={gameState == 0 ? false : true}
          >
            0.10
          </Button>
          <Button
            className="betting-values"
            onClick={() => onBettingClick(0.25)}
            disabled={gameState == 0 ? false : true}
          >
            0.25
          </Button>
          <Button
            className="betting-values"
            onClick={() => onBettingClick(0.5)}
            disabled={gameState == 0 ? false : true}
          >
            0.5
          </Button>
          <Button
            className="betting-values"
            onClick={() => onBettingClick(1)}
            disabled={gameState == 0 ? false : true}
          >
            1
          </Button>
          <Button
            className="betting-values"
            onClick={() => onBettingClick(2)}
            disabled={gameState == 0 ? false : true}
          >
            2
          </Button>
        </Box>
      </Grid>
      <Grid className="messaging-container" xs={4}>
        <a>
          <img className="message-link" src={messaging} />
        </a>
      </Grid>
      <Modal
        disableEnforceFocus
        open={modalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid>
            <TextField
              id="outlined-number"
              label="Mine Amount ( Max : 24, Min 1 )"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              style={{}}
              value={mineAmount}
              onChange={(e) => {
                setMineAmount(e.target.value);
              }}
            />
          </Grid>
          <Grid>
            <Button
              variant="contained"
              style={{ marginTop: "10px" }}
              onClick={onClickCloseButton}
            >
              OK
            </Button>
          </Grid>
        </Box>
      </Modal>
      <Modal
        open={playModalOpen}
        onClose={handlePlayModalClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={style}>
          <h2 id="parent-modal-title">Your Betting Info</h2>
          <p id="parent-modal-description">Mine Amount : {mineAmount}</p>
          <p id="parent-modal-description">
            Betting Amount : {bettingAmount} SOL
          </p>
          <Button
            variant="contained"
            style={{ marginTop: "10px" }}
            onClick={onClickStartGame}
          >
            START GAME
          </Button>
        </Box>
      </Modal>
      <Modal
        open={stopModalOpen}
        onClose={handleStopModalClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={style}>
          <h2 id="parent-modal-title">STOP</h2>
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
            onClick={onClickStopGame}
          >
            Stop Now
          </Button>
        </Box>
      </Modal>
    </Grid>
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

export default BettingPanel;
