import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import "./Mine.scss";
import coin from "../../assets/images/coin.png";
import question from "../../assets/images/question.png";
import bomb from "../../assets/images/bomb.png";

const Mine = ({ type }) => {
  const [animation, setAnimation] = useState(false);
  const [mineClassName, setMineClassName] = useState(
    type === 2
      ? animation
        ? "mine mine-bomb animation"
        : "mine mine-bomb"
      : animation
      ? "mine animation"
      : "mine"
  );
  useEffect(() => {
    console.log(type);
    let anim = false;
    if (1 * type !== 0) {
      console.log("if");
      anim = true;
      setAnimation(true);
    }

    console.log(animation);
    if (type === 2)
      if (anim) setMineClassName("mine mine-bomb animation");
      else setMineClassName("mine mine-bomb");
    else if (anim) setMineClassName("mine animation");
    else setMineClassName("mine");
    console.log(mineClassName);

    if (type === 3) {
      setMineClassName(mineClassName + " " + "revealed ");
    }
    if (type === 4) {
      setMineClassName(mineClassName + " " + "revealed bgred mine-bomb");
    }
  }, [type]);

  // useEffect(() => {
  //   if (type === 2)
  //     if (animation) mineClassName = "mine mine-bomb animation";
  //     else mineClassName = "mine mine-bomb";
  //   else if (animation) mineClassName = "mine animation";
  //   else mineClassName = "mine";
  // }, []);

  useEffect(() => {
    console.log(animation);
  }, [animation]);

  useEffect(() => {
    getMineClass();
  }, []);

  const getMineClass = () => {
    setMineClassName(
      type === 2
        ? animation
          ? "mine mine-bomb animation"
          : "mine mine-bomb"
        : animation
        ? "mine animation"
        : "mine"
    );
  };

  const switchType = () => {
    switch (type) {
      case 0:
        return <img className="mine-image " src={question} />;
      case 1:
        return <img className="mine-image " src={coin} />;
      case 2:
        return <img className="mine-image " src={bomb} />;
      case 3:
        return <img className="mine-image " src={coin} />;
      case 4:
        return <img className="mine-image " src={bomb} />;
      default:
        return <img className="mine-image " src={question} />;
    }
  };

  return (
    <Box
      className={mineClassName}
      onAnimationEnd={() => {
        setAnimation(false);
      }}
    >
      {switchType()}
    </Box>
  );
};

export default Mine;
