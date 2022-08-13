import { Box } from "@mui/material";
import { TransitionGroup } from "react";
import "./Mine.scss";
import coin from "../../assets/images/coin.png";
import question from "../../assets/images/question.png";
import bomb from "../../assets/images/bomb.png";

const Mine = ({ type }) => {
  const switchType = () => {
    switch (type) {
      case 0:
        return <img className="mine-image " src={question} />;
      case 1:
        return <img className="mine-image " src={coin} />;
      case 2:
        return <img className="mine-image " src={bomb} />;
      default:
        return <img className="mine-image " src={question} />;
    }
  };
  return (
    <Box className={` ${type === 2 ? "mine mine-bomb" : "mine"} `}>
      {switchType()}
    </Box>
  );
};

export default Mine;
