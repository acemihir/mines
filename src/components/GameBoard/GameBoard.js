import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Modal,
  autocompleteClasses,
} from "@mui/material";
import Mine from "../Mine";
import "./GameBoard.scss";
import axios from "axios";
import useGameStore from "../../GameStore";
import rectangleImage from "../../assets/images/rectangle.png";
import yellowrectangle from "../../assets/images/yellowrectangle.png";
import claimEmotion from "../../assets/images/claimEmotion.png";
import yellowRectangle from "../../assets/images/yellowrectangle.png";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

const GameBoard = () => {
  const { gameState, setGameState } = useGameStore();
  const { bettingAmount } = useGameStore();
  const { boardState, setBoardState, walletAddress } = useGameStore();
  const { boardClickedState, setBoardClickedState } = useGameStore();
  const [gameOverModalOpen, setGameOverModalOpen] = useState(false);
  const [winModalOpen, setWinModalOpen] = useState(false);
  const [winFinalModalOpen, setWinFinalModalOpen] = useState(false);

  const { nextMultiplier, setNextMultiplier } = useGameStore();
  const { gameStep, setGameStep } = useGameStore();
  const { mineAmount, setMineAmount } = useGameStore();
  const { houseEdge } = useGameStore();
  const [winModalMultiplier, setWinModalMultiplier] = useState(1);
  const { publicKey, sendTransaction } = useWallet();
  useEffect(() => {
    changeNextMultiplier();
  }, []);

  const changeNextMultiplier = () => {
    console.log(`gamestep in chageNextMutliplier is ${gameStep}`);
    if (gameState == 0) {
      let tempMultiplier = 1;
      for (let i = 0; i < gameStep + 1; i++) {
        tempMultiplier *= (25 - i) / (25 - i - mineAmount);
      }
      setNextMultiplier(tempMultiplier);
      if (gameStep > 0) {
        let tempMultiplier = 1;
        for (let i = 0; i < gameStep; i++) {
          tempMultiplier *= (25 - i) / (25 - i - mineAmount);
        }
        setWinModalMultiplier(tempMultiplier);
        console.log(`winModalMultiplier is ${winModalMultiplier}`);
      }
      return;
    }
    let tempMultiplier = 1;
    for (let i = 0; i < gameStep + 2; i++) {
      tempMultiplier *= (25 - i) / (25 - i - mineAmount);
    }
    setNextMultiplier(tempMultiplier);
  };

  const clickEvent = async (boardNum) => {
    // if user click a button that already clicked, it will rejected
    if (boardClickedState[boardNum] == 1) return;

    // if gameState == 0, game not started
    if (gameState == 0) return;

    const newBoardState = boardState;
    const body = {
      walletAddress: publicKey.toBase58(),
      boardNum,
    };
    let res = await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/checkMine`, body)
      .then(async (res) => {
        const newBoardClickedState = boardClickedState;
        console.log(boardClickedState);
        newBoardClickedState[boardNum] = 1;
        setBoardClickedState(newBoardClickedState);
        if (res.data.result === "bomb") {
          const body = {
            walletAddress: publicKey.toBase58(),
            game: "Minerush",
            player: publicKey.toBase58(),
            wager: bettingAmount,
            payout: 0,
          };
          console.log(body);
          await axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/api/saveHistory`, body)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });

          console.log(res.data);
          setGameState(0);
          // setGameOverModalOpen(true);
          const allBoardState = JSON.parse(res.data.board.boardString);
          allBoardState.forEach((item, key) => {
            console.log("sdf");
            if (item === 0) allBoardState[key] = 1;
            else allBoardState[key] = 2;
          });
          console.log(allBoardState);
          const cboardState = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0,
          ];
          setBoardClickedState(cboardState);
          console.log(boardClickedState);
          setGameStep(0);
          setNextMultiplier(1);
          revealBoardState(allBoardState);
          console.log(boardClickedState);
          return;
        }
        newBoardState[boardNum] = 1;
        console.log(boardClickedState);

        console.log(gameStep, mineAmount);

        if (1 * gameStep + 1 * mineAmount == 24) {
          // await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/getFullBoardState`, body)
          // .then((res) => {

          // })
          // .catch((err) => {
          //   console.log(err)
          // })

          // const allBoardState = JSON.parse(res.data.board.boardString);
          // allBoardState.forEach((item, key) => {
          //   console.log("sdf");
          //   if (item === 0) allBoardState[key] = 1;
          //   else allBoardState[key] = 2;
          // });

          // revealBoardState();

          const body = {
            walletAddress: publicKey.toBase58(),
            game: "Minerush",
            player: publicKey.toBase58(),
            wager: bettingAmount,
            payout: nextMultiplier * bettingAmount,
          };
          console.log(body);
          await axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/api/saveHistory`, body)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });

          const cboardState = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0,
          ];
          setBoardClickedState(cboardState);
          setWinModalMultiplier(nextMultiplier);
          setWinFinalModalOpen(true);
          setGameState(0);
          setGameStep(0);

          setNextMultiplier(1);

          console.log("here");
          return;
        }
        console.log(`--------------Game step is ${gameStep}`);
        setGameStep(gameStep + 1);
        console.log(`--------------Game step After set is ${gameStep}`);

        changeNextMultiplier();
        setBoardState(newBoardState);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const revealBoardState = (allBoardState) => {
    console.log(allBoardState);
    boardState.map((item, key) => {
      if (boardClickedState[key] === 0)
        if (allBoardState[key] === 1) allBoardState[key] = 3;
        else allBoardState[key] = 4;
    });
    setBoardState(allBoardState);
    const cboardState = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];
    setBoardClickedState(cboardState);
  };

  const onClickStopGame = async () => {
    console.log("heredfdfdf");
    const newBoardState = boardState;
    const boardNum = 0;
    const body = {
      walletAddress: publicKey.toBase58(),
      boardNum,
    };
    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/checkMine`, body)
      .then((res) => {
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
  };

  const handleGameOverModalClose = () => {
    setGameOverModalOpen(false);
  };

  const handleWinModalClose = () => {
    setWinModalOpen(false);
  };

  const handleWinFinalModalClose = () => {
    setWinFinalModalOpen(false);
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
      <div style={{ display: "flex", justifyContent: "center", margin: "5px" }}>
        <Typography className="multiplier">
          Next Multiplier
          <span className="multiplier-value">
            &nbsp; X{parseFloat((nextMultiplier * houseEdge).toFixed(2))}
          </span>
        </Typography>
      </div>
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
          <Box sx={styleFair} style={{ backgroundColor: "#101112" }}>
            <Typography
              variant="h3"
              component="h2"
              color="#F7BE44"
              fontSize="40px"
              fontFamily="Mada"
              marginTop="20px"
            >
              Fair
            </Typography>

            <img className="rectangle-image" src={rectangleImage}></img>

            <Grid container style={{ textAlign: "center" }}>
              <Grid item xs={1}></Grid>
              <Grid item xs={10}>
                <Typography color="#fff" fontSize="18px" fontFamily="Mada">
                  Playing on the website is secure. The fairness of all bets is
                  unquestionable since we use cryptography to make sure every
                  bet is transparently fair and can be checked.
                </Typography>
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={12}>
                <img className="yellow-image" src={yellowrectangle}></img>
              </Grid>
              {/* <h2 id="parent-modal-title" style={{ color: "#F7BE44" }}>
              Fair
            </h2> */}
            </Grid>
          </Box>
        </Modal>
        <Modal
          open={winModalOpen}
          onClose={handleWinModalClose}
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

        <Modal
          open={winFinalModalOpen}
          onClose={handleWinFinalModalClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={styleStop}>
            <Typography color="#F7BE44" fontSize="70px" fontFamily="Mada">
              x{parseFloat((winModalMultiplier * houseEdge).toFixed(2))}
            </Typography>

            <Grid container style={{ textAlign: "center" }}>
              <Grid item xs={12}>
                <img className="claimEmotion" src={claimEmotion}></img>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid item xs={12}>
                <span style={{ color: "#FFFFFF" }}>You Won </span>
                <span style={{ color: "#F7BE44" }}>
                  {" "}
                  {parseFloat(
                    (winModalMultiplier * houseEdge * bettingAmount).toFixed(2)
                  )}
                </span>
              </Grid>

              {/* <Button
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
              </Button> */}

              <img className="yellow-image-claim" src={yellowRectangle}></img>
            </Grid>
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
  width: 300,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  padding: "20px",
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

const styleFair = {
  textAlign: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "270px",
  height: "316px",
  bgcolor: "background.paper",
  // border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  padding: "0px",
};

export default GameBoard;
