import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material";
import { Oval } from "react-loader-spinner";
import frogGif from "../../assets/images/frog.gif";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./Splash.scss";

const GamePlay = ({ loading }) => {
  return (
    <div className="splash" style={{ display: loading ? "flex" : "none" }}>
      <Oval color="#f7be44" secondaryColor="#f7be44" height={120} width={120} />
      <div className="frog-background">
        <img className="frog" src={frogGif}></img>
      </div>
    </div>
  );
};

export default GamePlay;
