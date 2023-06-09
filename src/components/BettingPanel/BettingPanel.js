import {
  Box,
  Grid,
  Button,
  Modal,
  Typography,
  TextField,
  Stack,
  Slider,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import messaging from "../../assets/images/messaging.png";
import solana from "../../assets/images/solana.png";
import options from "../../assets/images/setting.png";
import yellowRectangle from "../../assets/images/yellowrectangle.png";
import { houseAddress } from "../../constants";

import claimEmotion from "../../assets/images/claimEmotion.png";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import "./BettingPanel.scss";
import axios from "axios";
import useGameStore from "../../GameStore";
import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as solanaWeb3 from "@solana/web3.js";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
// Sound
import Sound from "react-sound";
import cashoutsound from "../../assets/audios/CashoutSound.mp3";
import coin_sound from "../../assets/audios/CoinSound.mp3";
import coinstreak_sound from "../../assets/audios/CoinStreak.mp3";
import hitbomb_sound from "../../assets/audios/HitBomb.mp3";
import mineexplosion_sound from "../../assets/audios/Mines_-_Explosion.mp3";
import playgame_sound from "../../assets/audios/PlayGame.mp3";


const BettingPanel = ({ loading, setLoading, depositText, setDepositText }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  const { gameHistory, setGameHistory } = useGameStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [playModalOpen, setPlayModalOpen] = useState(false);
  const [stopModalOpen, setStopModalOpen] = useState(false);
  const [connectWalletModalOpen, setConnectWalletModalOpen] = useState(false);

  const { boardClickedState, setBoardClickedState } = useGameStore();
  const { isMuted, setIsMuted } = useGameStore();

  const { walletAddress, setWalletAddress } = useGameStore();
  const { boardState, setBoardState } = useGameStore();
  const { mineAmount, setMineAmount } = useGameStore();
  const { previousMultiplier, setPreviousMultiplier } = useGameStore();

  const { bettingAmount, setBettingAmount } = useGameStore();
  const { gameState, setGameState } = useGameStore();
  const { gameStep, setGameStep } = useGameStore();
  const { nextMultiplier, setNextMultiplier } = useGameStore();
  const { houseEdge } = useGameStore();
  const [mineSliderAmount, setMineSliderAmount] = useState(mineAmount);
  const { connected } = useWallet();
  const { publicKey, sendTransaction } = useWallet();

  const { connection } = useConnection();
  const [clicked, setClicked] = useState(false);

  const [is_playgame_sound, setIs_playgame_sound] = useState(false);
  const [is_cashoutsound, setIs_cashoutsound] = useState(false);

  const getHistory = async () => {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/history/get`)
      .then((res) => {
        console.log("history -------------------");
        console.log(res.data);
        const newGameHistory = res.data;
        setGameHistory(newGameHistory);
      });
  };

  const changeNextMultiplier = () => {
    console.log(`Betting panel gameStep : ${gameStep}`);
    console.log(`Betting panel mineAmount : ${mineSliderAmount}`);

    if (gameStep == 0) {
      setPreviousMultiplier(1);
    } else {
      let tempMultiplier = 1;
      for (let i = 0; i < gameStep - 1; i++) {
        tempMultiplier *= 25 / (25 - mineSliderAmount);
      }
      setPreviousMultiplier(tempMultiplier);
    }
    console.log(`nextMultiplier in changeNext is ${nextMultiplier}`);

    let tempMultiplier = 1;
    for (let i = 0; i < gameStep + 1; i++) {
      tempMultiplier *= 25 / (25 - mineSliderAmount);
    }
    setNextMultiplier(tempMultiplier);
    console.log("mutli 1 -------------------------");
    console.log(`Betting panel multiplier : ${tempMultiplier}`);
  };

  const checkAlreadyDeposit = async () => {
    const body = {
      walletAddress: publicKey.toBase58(),
    };
    const result = {};
    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/checkAlreadyDeposit`, body)
      .then((res) => {
        console.log(res.data);
        result.bettingAmount = res.data.bettingAmount;
        result.mineAmount = res.data.mineAmount;
        result.result = res.data.result;
      })
      .catch((err) => {
        console.log(err);
      });

    return result;
  };

  const onPlay = async () => {
    setIs_playgame_sound(true);
    // wallet integration
    if (!connected) {
      console.log("plz connect wallet");
      setConnectWalletModalOpen(true);
      return;
    }
    setWalletAddress(publicKey.toBase58());

    // if user clicked "CASH OUT"
    if (gameState == 1) {
      setStopModalOpen(true);
      return;
    }

    const depoResult = await checkAlreadyDeposit();
    if (depoResult.result == "success") {
      setBettingAmount(depoResult.bettingAmount);
      setMineAmount(depoResult.mineAmount);
      setGameState(1);
    } else {
      // Deposit SOL
      const result = await deposit();
    }

    console.log("play game");
    const cboardState = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];
    setGameStep(0);
    changeNextMultiplier();
    setBoardState(cboardState);
    setBoardClickedState(cboardState);
    // setGameState(1);
    console.log("boardclickedstate is ----------");
    console.log(boardClickedState);

    console.log("boardstate is ---------------------");
    console.log(boardState);

    await postPlay();
  };

  // Depoist User SOL
  const deposit = async () => {
    let amount = bettingAmount;
    console.log(amount * solanaWeb3.LAMPORTS_PER_SOL);
    const transaction = new solanaWeb3.Transaction().add(
      solanaWeb3.SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: new solanaWeb3.PublicKey(houseAddress),
        lamports: solanaWeb3.LAMPORTS_PER_SOL * amount,
      })
    );

    console.log("tx has maded");

    const signature = await sendTransaction(transaction, connection);

    setDepositText(true);
    setLoading(true);

    console.log("tx has confirmed");

    let tx = null;

    while (tx == null) {
      console.log("waiting for confirm tx");
      tx = await connection.getTransaction(signature, {
        commitment: "finalized",
      });
    }

    console.log("tx has sent");

    await connection.confirmTransaction(signature);

    console.log("transaction confirmed");

    const status = await connection.getSignatureStatus(signature, {
      searchTransactionHistory: true,
    });
    console.log(status.value);

    const body = {
      walletAddress: publicKey.toBase58(),
      signature,
      bettingAmount,
      mineAmount,
    };

    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/verifyDeposit`, body)
      .then((res) => {
        if (res.data.result == "success") {
          console.log("success");
          setGameState(1);
          return true;
        } else {
          console.log("fail");
          return false;
        }
      })
      .catch((err) => {
        console.log("err");
      });
    setDepositText(false);
    setLoading(false);
  };

  const handlePlayModalClose = () => {
    setPlayModalOpen(false);
  };

  const handleStopModalClose = () => {
    setStopModalOpen(false);
  };

  const handleConnectWalletModalClose = () => {
    setConnectWalletModalOpen(false);
  };

  const onClickConnectWallet = () => {
    console.log("connectWallet");
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
    setIs_cashoutsound(true);
    // if user double clicked "Claim Reward" button, it is ignored
    if (clicked == true) return;
    setClicked(true);

    console.log(`cureent multi is ${previousMultiplier}`);
    console.log(`boardState is ${boardState}`);
    // const boardNum = 0;

    const body = {
      walletAddress: publicKey.toBase58(),
    };
    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/stop`, body)
      .then(async (res) => {
        const body = {
          walletAddress: publicKey.toBase58(),
          game: "Minerush",
          player: publicKey.toBase58(),
          wager: bettingAmount,
          payout: previousMultiplier * bettingAmount * houseEdge,
        };
        await axios
          .post(`${process.env.REACT_APP_BACKEND_URL}/api/saveHistory`, body)
          .then((res) => {
            console.log(res);
            getHistory();
            setClicked(false);
          })
          .catch((err) => {
            console.log(err);
          });

        console.log(res.data);
        setGameState(0);
        const allBoardState = JSON.parse(res.data.board.boardString);
        console.log(allBoardState);
        allBoardState.forEach((item, key) => {
          console.log("sdf");
          if (item === 0) allBoardState[key] = 1;
          else allBoardState[key] = 2;
        });
        console.log(allBoardState);
        setGameStep(0);
        setPreviousMultiplier(1);
        setNextMultiplier(1);
        console.log("multi 2 -------------------------");
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
    setIs_playgame_sound(true);
    if ((mineAmount > 24) | (mineAmount < 1)) return;
    setMineAmount(mineSliderAmount);
    changeNextMultiplier();
    setModalOpen(false);
  };

  const onBNumberClick = (e, number) => {
    setMineAmount(number);
    const bNumbers = document.getElementsByClassName('bomb-amounts')

    for (const bNumber of bNumbers) {
      bNumber.classList.remove('active')
    }
    e.target.classList.add('active')
  }

  const onBettingClick = (val) => {
    setIs_playgame_sound(true);
    if (val == "plus") {
      if (bettingAmount == 0.05) setBettingAmount(0.1);
      else if (bettingAmount == 0.1) setBettingAmount(0.25);
      else if (bettingAmount == 0.25) setBettingAmount(0.5);
      else if (bettingAmount == 0.5) setBettingAmount(1);
      else if (bettingAmount == 1) setBettingAmount(2);
      else if (bettingAmount == 2) return;
      // setBettingAmount(parseFloat((bettingAmount + 0.1).toFixed(2)));
    } else if (val == "minus") {
      if (bettingAmount == 0.05) return;
      else if (bettingAmount == 0.1) setBettingAmount(0.05);
      else if (bettingAmount == 0.25) setBettingAmount(0.1);
      else if (bettingAmount == 0.5) setBettingAmount(0.25);
      else if (bettingAmount == 1) setBettingAmount(0.5);
      else if (bettingAmount == 2) setBettingAmount(1);
    }
  };

  const onOpen = () => {
    setModalOpen(true);
    setIs_playgame_sound(true);
  };

  const postPlay = async () => {
    console.log("post play");
    const body = {
      walletAddress: publicKey.toBase58(),
      mineAmount,
      bettingAmount,
    };

    console.log(body);

    let res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/play`,
      body
    );
    console.log(res.data);
  };

  const handleSliderChange = (event, newVal) => {
    setMineSliderAmount(newVal);
  };

  const handleSongFinishedPlaying = () => {
    setIs_playgame_sound(false);
    setIs_cashoutsound(false);
  };

  return (
    <Grid className="bettingpanel-container" container>
      <Grid xs={1} sm={2} md={3} lg={4} />
      <Grid className="bettingpanel-box" xs={10} sm={8} md={6} lg={4} style={isDesktop ? {} : { backgroundColor: '#101112', padding: '5px' }}>
        <Box
          className="settings-text"
          style={{ marginTop: "20px", marginBottom: "5px" }}
        >
          <span className="setting-amount">Sol Amount</span>
          {isDesktop && (
            <span className="minmax-values">
              Min. Mine: <span className="betsetting-value">2</span> Max. Mine:{" "}
              <span className="betsetting-value">24</span>
            </span>
          )}
          <span>&nbsp;</span>
        </Box>
        <Box className="betting-buttons" style={isDesktop ? { marginTop: "0px" } : { justifyContent: 'space-between', padding: '0px' }}>
          <Box className="betting-amount">
            <Box className="betting-amount-value">
              <img className="solana-image" src={solana} />
              <span className="betting-value-text">{bettingAmount}</span>
            </Box>
            <Box className="betting-amount-control" style={isDesktop ? {} : { display: 'none' }}>
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
            style={isDesktop ? {} : { display: 'none' }}
          >
            <div className="options-image " image={options}>
              {mineAmount}
            </div>
          </Button>
        </Box>
        <Box
          justifyContent="space-between"
          className="betting-values-group"
          sx={{
            display: isDesktop ? "flex" : "grid !important",
            gridTemplateRows: "repeat(2, auto)",
            gridTemplateColumns: "repeat(3, auto)",
            rowGap: 2,
          }}
          style={isDesktop ? {} : { background: "none" }}
        >
          <Button
            className="betting-values"
            onClick={() => onBettingClick(0.05)}
            disabled={gameState == 0 ? false : true}
            style={isDesktop ? {} : { width: "135px", height: "35px" }}
          >
            0.05
          </Button>
          <Button
            className="betting-values"
            onClick={() => onBettingClick(0.1)}
            disabled={gameState == 0 ? false : true}
            style={isDesktop ? {} : { width: "135px", height: "35px" }}
          >
            0.10
          </Button>
          <Button
            className="betting-values"
            onClick={() => onBettingClick(0.25)}
            disabled={gameState == 0 ? false : true}
            style={isDesktop ? {} : { width: "135px", height: "35px" }}
          >
            0.25
          </Button>
          <Button
            className="betting-values"
            onClick={() => onBettingClick(0.5)}
            disabled={gameState == 0 ? false : true}
            style={isDesktop ? {} : { width: "135px", height: "35px" }}
          >
            0.5
          </Button>
          <Button
            className="betting-values"
            onClick={() => onBettingClick(1)}
            disabled={gameState == 0 ? false : true}
            style={isDesktop ? {} : { width: "135px", height: "35px" }}
          >
            1
          </Button>
          <Button
            className="betting-values"
            onClick={() => onBettingClick(2)}
            disabled={gameState == 0 ? false : true}
            style={isDesktop ? {} : { width: "135px", height: "35px" }}
          >
            2
          </Button>
        </Box>
        {!isDesktop &&
          <>
            <Box
              className="settings-text"
              style={{ marginTop: "20px", marginBottom: "5px" }}
            >
              <span className="setting-amount">Number of bombs</span>
              <span>&nbsp;</span>
            </Box>
            <Box
              justifyContent="space-between"
              className="betting-values-group-mobile"
              sx={{
                display: isDesktop ? "flex" : "grid !important",
                gridTemplateRows: "repeat(1, auto)",
                gridTemplateColumns: "repeat(4, auto)",
                rowGap: 1,
              }}
            >
              <Button
                className="bomb-amounts"
                onClick={(e) => onBNumberClick(e, 3)}
                disabled={gameState == 0 ? false : true}
                style={
                  isDesktop
                    ? {}
                    : { width: "100px", height: "25px" }
                }
              >
                3
              </Button>
              <Button
                className="bomb-amounts"
                onClick={(e) => onBNumberClick(e, 5)}
                disabled={gameState == 0 ? false : true}
                style={
                  isDesktop
                    ? {}
                    : { width: "100px", height: "25px" }
                }
              >
                5
              </Button>
              <Button
                className="bomb-amounts"
                onClick={(e) => onBNumberClick(e, 10)}
                disabled={gameState == 0 ? false : true}
                style={
                  isDesktop
                    ? {}
                    : { width: "100px", height: "25px" }
                }
              >
                10
              </Button>
              <Button
                className="bomb-amounts"
                onClick={(e) => onBNumberClick(e, 24)}
                disabled={gameState == 0 ? false : true}
                style={
                  isDesktop
                    ? {}
                    : {
                      width: "100px",
                      height: "25px",
                      textTransform: "capitalize",
                    }
                }
              >
                Max
              </Button>
            </Box>
          </>
        }

      </Grid>
      <Grid
        className="messaging-container"
        xs={1}
        sm={2}
        md={3}
        lg={4}
        sx={{ display: isDesktop ? "block" : "none!important" }}
      >
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
              Number of Mines : {mineSliderAmount}
            </Typography>
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
        open={connectWalletModalOpen}
        onClose={handleConnectWalletModalClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={style}>
          <h2 id="parent-modal-title" style={{ color: "#fff" }}>
            Please connect your Wallet
          </h2>
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
            x{parseFloat((previousMultiplier * houseEdge).toFixed(2))}
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
                {parseFloat(
                  (previousMultiplier * houseEdge * bettingAmount).toFixed(2)
                )}
              </span>
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
      <Sound
        url={playgame_sound}
        playStatus={
          isMuted && is_playgame_sound
            ? Sound.status.PLAYING
            : Sound.status.STOPPED
        }
        playFromPosition={0}
        onFinishedPlaying={handleSongFinishedPlaying}
      />
      <Sound
        url={cashoutsound}
        playStatus={
          isMuted && is_cashoutsound
            ? Sound.status.PLAYING
            : Sound.status.STOPPED
        }
        playFromPosition={0}
        onFinishedPlaying={handleSongFinishedPlaying}
      />
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
