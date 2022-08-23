import { Box, Button, Modal, Typography, Grid } from "@mui/material";
import { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import coin from "../../assets/images/coin.png";
import speaker from "../../assets/images/speaker.png";
import speaker_mute from "../../assets/images/speaker_mute.png";

import scale from "../../assets/images/scale.png";
import chart from "../../assets/images/chart.png";
import "./Header.scss";
import yellowrectangle from "../../assets/images/yellowrectangle.png";
import rectangleImage from "../../assets/images/rectangle.png";
import useGameStore from "../../GameStore";
import {
  WalletMultiButton,
  useWalletModal,
  WalletDisconnectButton,
} from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useEffect } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import * as solanaWeb3 from "@solana/web3.js";

library.add(fas);
const Header = () => {
  const [solAmountState, setSolAmountState] = useState(0);
  // const { solAmount, setSolAmount } = useGameStore();
  // const [ solAmount, setSolAmount ] = useState();
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const { isMuted, setIsMuted } = useGameStore();

  const {
    ready,
    connected,
    connecting,
    disconnecting,
    select,
    connect,
    disconnect,
  } = useWallet();
  const { setVisible } = useWalletModal();

  const [gameOverModalOpen, setGameOverModalOpen] = useState(false);
  const { bettingAmount, setBettingAmount } = useGameStore();
  const onClickScale = () => {
    setGameOverModalOpen(true);
  };

  const handleGameOverModalClose = () => {
    setGameOverModalOpen(false);
  };

  useEffect(() => {
    // if (connected) {
    //   const solana  = new solanaWeb3.Connection
    //   setSolAmount();

    // }
    const ttt = async () => {
      if (connected) {
        const connection = new solanaWeb3.Connection(
          "https://morning-multi-arm.solana-testnet.quiknode.pro/22b4b8c2eb7cadba89b66fecf29008d0273da20e"
        );
        let balance = await connection.getBalance(publicKey);
        balance = balance / LAMPORTS_PER_SOL;
        balance = parseFloat(balance.toFixed(2));
        setSolAmountState(balance);
      }
    };

    ttt();
  }, [connected]);

  const solWallet = () => {
    // console.log(connected, connecting, disconnecting);

    if (!connected) {
      return <WalletMultiButton />;
    } else if (connected) {
      return <WalletDisconnectButton />;
    }
  };

  const onVolumeClick = () => {
    setIsMuted(!isMuted);
  };

  return (
    <>
      <Box className="navbar">
        <Box
          className="control-options navbar-group"
          sx={{ display: { ms: "none", md: "block" } }}
        >
          <Button className="navbar-item" onClick={onVolumeClick}>
            {isMuted ? (
              <img className="control-option-image" src={speaker} />
            ) : (
              <img className="control-option-image" src={speaker_mute} />
            )}
          </Button>
          <Button className="navbar-item" onClick={onClickScale}>
            <img className="control-option-image" src={scale} />
          </Button>
          <Button className="navbar-item">LIGHT</Button>
        </Box>
        <Box className="navlinks navbar-group">
          <Button className="navbar-item">RECENT</Button>
          <Button className="navbar-item">
            STATS&nbsp;
            <img className="control-option-image" src={chart} />
          </Button>
          {solWallet()}

          <img className="balance-image" src={coin} />
        </Box>
      </Box>
      <span className="sol-balance">SOL {solAmountState}</span>
      {/* <span className="sol-balance">solAmount</span> */}
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
                unquestionable since we use cryptography to make sure every bet
                is transparently fair and can be checked.
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
    </>
  );
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

const walletButtonStyle = {
  backgroundColor: "#fff",
  color: "#fff",
  height: "39px",
  fontSize: "10px",
};

export default Header;
