import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material";
import "./Splash.scss";
import frogGif from "../assets/images/frog.gif";

const GamePlay = () => {
  // const theme = useTheme();

  // const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <div className="splash">
      <div className="frog-background">
        <img className="frog" src={frogGif}></img>
      </div>
    </div>

    // <Typography sx={{ display: { md: 'block', sm: 'none' } }}>This is test</Typography>
  );
};

export default GamePlay;
