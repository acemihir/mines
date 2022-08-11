import { Box, Grid, Button } from "@mui/material";
import messaging from "../../assets/images/messaging.png";
import solana from "../../assets/images/solana.png";
import options from "../../assets/images/setting.png";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import "./BettingPanel.scss";
import axios from "axios";
import useGameStore from "../../GameStore";

const BettingPanel = () => {
  const { walletAddress, setwalletAddress } = useGameStore();

  const onPlay = () => {
    console.log("play game");
    postPlay();
  };

  const postPlay = async () => {
    const body = {
      walletAddress,
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
              <span className="betting-value-text">0.05</span>
            </Box>
            <Box className="betting-amount-control">
              <Button className="betting-amount-addition">+</Button>
              <Button className="betting-amount-addition">-</Button>
            </Box>
          </Box>
          <Button className="betting-play" onClick={onPlay}>
            <PlayArrowIcon />
            Play Game
          </Button>
          <Button className="betting-options">
            <img className="options-image" src={options} />
          </Button>
        </Box>
        <Box className="betting-values-group">
          <Button className="betting-values">0.05</Button>
          <Button className="betting-values">0.10</Button>
          <Button className="betting-values">0.25</Button>
          <Button className="betting-values">0.5</Button>
          <Button className="betting-values">1</Button>
          <Button className="betting-values">2</Button>
        </Box>
      </Grid>
      <Grid className="messaging-container" xs={4}>
        <a>
          <img className="message-link" src={messaging} />
        </a>
      </Grid>
    </Grid>
  );
};

export default BettingPanel;
