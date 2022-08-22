import {
  Grid,
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect } from "react";
import { tableCellClasses } from "@mui/material/TableCell";
import point from "../../assets/images/point.png";
import "./RecentPlays.scss";
import useGameStore from "../../GameStore";
import axios from "axios";

const RecentPlays = () => {
  const { gameHistory, setGameHistory } = useGameStore();
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

  useEffect(() => {
    getHistory();
  }, []);

  const getShortName = (fullName) => {
    return (
      fullName.slice(0, 3) +
      "..." +
      fullName.slice(fullName.length - 4, fullName.length - 1)
    );
  };

  const historyList = gameHistory.map((item, key) => {
    let payout = item.payout;
    let earn = true;
    if (item.payout == 0) {
      payout = "-" + item.wager;
      earn = false;
    } else {
      payout = parseFloat(payout.toFixed(2));
    }

    return (
      <>
        <TableRow className="table-row">
          <TableCell align="center">{item.game}</TableCell>
          <TableCell align="center">{getShortName(item.player)}</TableCell>
          <TableCell align="center">{item.wager}</TableCell>
          <TableCell
            align="center"
            style={earn ? { color: " #286A08" } : { color: "#CE461B" }}
          >
            {payout}
            <img src={point} className="recentplays-point" />
          </TableCell>
        </TableRow>
      </>
    );
  });

  return (
    <Grid className="recentplays-container" container>
      <Grid xs={3} />
      <Grid xs={6}>
        <p className="recentplays-title">RECENT PLAYS</p>
        <Box className="recentplays-grid">
          <TableContainer className="table-container">
            <Table className="table-grid" aria-label="customized table">
              <TableHead className="table-header">
                <TableRow className="table-row">
                  <TableCell align="center">GAME</TableCell>
                  <TableCell align="center">PLAYER</TableCell>
                  <TableCell align="center">WAGER</TableCell>
                  <TableCell align="center">PAYOUT</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="table-body">{historyList}</TableBody>
            </Table>
          </TableContainer>
        </Box>
        <p className="recentplays-text">The #1 most trusted gaming on Solana</p>
      </Grid>
      <Grid xs={3} />
    </Grid>
  );
};

export default RecentPlays;
