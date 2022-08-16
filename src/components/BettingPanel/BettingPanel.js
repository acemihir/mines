import {
  Box,
  Grid,
  Button,
  Modal,
  Typography,
  TextField,
  Slider,
} from "@mui/material";
import messaging from "../../assets/images/messaging.png";
import solana from "../../assets/images/solana.png";
import options from "../../assets/images/setting.png";
import yellowRectangle from "../../assets/images/yellowrectangle.png";

import claimEmotion from "../../assets/images/claimEmotion.png";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import "./BettingPanel.scss";
import axios from "axios";
import useGameStore from "../../GameStore";
import { useState } from "react";

const BettingPanel = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [playModalOpen, setPlayModalOpen] = useState(false);
  const [stopModalOpen, setStopModalOpen] = useState(false);
  const { boardClickedState, setBoardClickedState } = useGameStore();

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

      setGameStep(gameStep + 1);

      setBoardState(cboardState);

      setGameState(0);

      return;
    }
    console.log("play game");
    const cboardState = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];
    setGameStep(0);
    changeNextMultiplier();
    setBoardState(cboardState);
    setBoardClickedState(cboardState);
    setGameState(1);
    console.log(boardClickedState);

    // setPlayModalOpen(false);
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

  const onClickStopGame = async () => {
    console.log("heredfdfdf");
    const newBoardState = boardState;
    // const boardNum = 0;
    const body = {
      walletAddress,
    };
    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/stop`, body)
      .then((res) => {
        console.log(res.data);
        setGameState(0);
        const allBoardState = JSON.parse(res.data.board.boardString);
        allBoardState.forEach((item, key) => {
          console.log("sdf");
          if (item === 0) allBoardState[key] = 1;
          else allBoardState[key] = 2;
        });
        console.log(allBoardState);
        setGameStep(0);
        setNextMultiplier(1);
        revealBoardState(allBoardState);
      });
    setStopModalOpen(false);
  };

  const revealBoardState = (allBoardState) => {
    boardState.map((item, key) => {
      if (boardClickedState[key] === 0)
        if (allBoardState[key] === 1) allBoardState[key] = 3;
        else allBoardState[key] = 4;
    });
    setBoardState(allBoardState);
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

  const handleSliderChange = (event, newVal) => {
    setMineAmount(newVal);
  };

  return (
    <Grid className="bettingpanel-container" container>
      <Grid xs={4} />
      <Grid xs={4}>
        <Box className="settings-text">
          <span className="setting-amount">Sol Amount</span>
          <span className="minmax-values">
            Min. Mine: <span className="betsetting-value">2</span> Max. Mine:{" "}
            <span className="betsetting-value">24</span>
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
          <Button
            className="betting-play"
            onClick={onPlay}
            style={{ textTransform: "none" }}
          >
            <PlayArrowIcon />
            {gameState == 0 ? "Play Game" : "Cash-Out"}
          </Button>
          <Button
            className="betting-options"
            onClick={onOpen}
            disabled={gameState == 0 ? false : true}
          >
            {/* <img className="options-image" src={options}>
              
            </img> */}
            <div className="options-image " image={options}>
              {mineAmount}
            </div>
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
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              style={{ color: "#fff" }}
            >
              Mine Amount is {mineAmount}
            </Typography>
            {/* <TextField
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
            /> */}
          </Grid>
          <Grid>
            <Slider
              defaultValue={mineAmount}
              min={2}
              max={24}
              aria-label="Default"
              valueLabelDisplay="auto"
              style={{ color: "#F7BE44" }}
              onChange={handleSliderChange}
            />
          </Grid>
          <Button
            variant="contained"
            style={{
              marginTop: "10px",
              color: "#000",
              backgroundColor: "#F7BE44",
            }}
            onClick={onClickCloseButton}
          >
            OK
          </Button>
        </Box>
      </Modal>
      <Modal
        open={playModalOpen}
        onClose={handlePlayModalClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={style}>
          <h1 id="parent-modal-title" style={{ color: "#fff" }}>
            Your Betting Info
          </h1>
          <p id="parent-modal-description" style={{ color: "#fff" }}>
            <span>Mine Amount : </span>
            <span style={{ color: "#F7BE44" }}>{mineAmount} </span>
          </p>
          <p id="parent-modal-description" style={{ color: "#fff" }}>
            <span>Betting Amount : </span>
            <span style={{ color: "#F7BE44" }}>{bettingAmount}</span>
            <span> SOL </span>
          </p>

          <Button
            variant="contained"
            style={{
              marginTop: "10px",
              color: "#000",
              backgroundColor: "#F7BE44",
            }}
            onClick={onClickStartGame}
            fontSize="10px"
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
        <Box sx={styleStop}>
          <Typography color="#F7BE44" fontSize="70px" fontFamily="Mada">
            x
            {parseFloat(
              (nextMultiplier * houseEdge * bettingAmount).toFixed(2)
            )}
          </Typography>

          <Grid container style={{ textAlign: "center" }}>
            <Grid item xs={12}>
              <img className="claimEmotion" src={claimEmotion}></img>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid item xs={12}>
              <span style={{ color: "#FFFFFF" }}>You Won </span>
              <span style={{ color: "#F7BE44" }}>0.25</span>
            </Grid>
            <Button
              variant="contained"
              style={{
                marginTop: "10px",
                color: "#000",
                backgroundColor: "#F7BE44",
              }}
              onClick={onClickStopGame}
              fontSize="10px"
            >
              Claim Reward
            </Button>
            <img className="yellow-image-claim" src={yellowRectangle}></img>
          </Grid>
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
  width: 300,
  bgcolor: "#1C1F26",
  // border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const styleStop = {
  textAlign: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "246px",
  height: "auto",
  bgcolor: "#101112",
  // border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  padding: "0px",
};

export default BettingPanel;
