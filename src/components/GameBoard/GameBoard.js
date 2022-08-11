import { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import Mine from "../Mine";
import "./GameBoard.scss";
import axios from "axios";
import useGameStore from "../../GameStore";

const GameBoard = () => {
  const { boardState, setBoardState, walletAddress } = useGameStore();

  const clickEvent = async (boardNum) => {
    console.log(`num is ${boardNum}`);
    const newBoardState = boardState;
    const body = {
      walletAddress,
      boardNum,
    };
    console.log(body);
    let res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/checkMine`,
      body
    );
    console.log(res.data);
    res.data.result === "bomb"
      ? (newBoardState[boardNum] = 2)
      : (newBoardState[boardNum] = 1);
    setBoardState(newBoardState);
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
      <Typography className="multiplier">
        Next Multiplier <span className="multiplier-value">X1.11</span>
      </Typography>
      <Grid className="gameboard-container" container>
        <Grid xs={4} />
        <Grid xs={4}>
          <Grid className="gameboard" container spacing={2}>
            {rectangle}
          </Grid>
        </Grid>
        <Grid xs={4} />
      </Grid>
    </>
  );
};

export default GameBoard;
