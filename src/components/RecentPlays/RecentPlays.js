import { Grid, Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { tableCellClasses } from '@mui/material/TableCell'
import point from '../../assets/images/point.png'
import './RecentPlays.scss'

const RecentPlays = () => {
  return (
    <Grid className='recentplays-container' container>
      <Grid xs={3} />
      <Grid xs={6}>
        <p className='recentplays-title'>RECENT PLAYS</p>
        <Box className='recentplays-grid'>
          <TableContainer className='table-container'>
            <Table className='table-grid' aria-label="customized table">
              <TableHead className='table-header'>
                <TableRow className='table-row'>
                  <TableCell align="center">GAME</TableCell>
                  <TableCell align="center">PLAYER</TableCell>
                  <TableCell align="center">WAGER</TableCell>
                  <TableCell align="center">PAYOUT</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className='table-body'>
                <TableRow className='table-row'>
                  <TableCell align="center">MineRush</TableCell>
                  <TableCell align="center">glowzi</TableCell>
                  <TableCell align="center">0.25◎</TableCell>
                  <TableCell align="center">0.75<img src={point} className='recentplays-point' /></TableCell>
                </TableRow>
                <TableRow className='table-row'>
                  <TableCell align="center">MineRush</TableCell>
                  <TableCell align="center">Toof98</TableCell>
                  <TableCell align="center">2◎</TableCell>
                  <TableCell align="center">0.00<img src={point} className='recentplays-point' /></TableCell>
                </TableRow>
                <TableRow className='table-row'>
                  <TableCell align="center">MineRush</TableCell>
                  <TableCell align="center">ThaKid</TableCell>
                  <TableCell align="center">1◎</TableCell>
                  <TableCell align="center">4.00<img src={point} className='recentplays-point' /></TableCell>
                </TableRow>
                <TableRow className='table-row'>
                  <TableCell align="center">MineRush</TableCell>
                  <TableCell align="center">BIGDEGEN</TableCell>
                  <TableCell align="center">0.05◎</TableCell>
                  <TableCell align="center">0.00<img src={point} className='recentplays-point' /></TableCell>
                </TableRow>
                <TableRow className='table-row'>
                  <TableCell align="center">MineRush</TableCell>
                  <TableCell align="center">glowzi</TableCell>
                  <TableCell align="center">0.25◎</TableCell>
                  <TableCell align="center">0.75<img src={point} className='recentplays-point' /></TableCell>
                </TableRow>
                <TableRow className='table-row'>
                  <TableCell align="center">MineRush</TableCell>
                  <TableCell align="center">Toof98</TableCell>
                  <TableCell align="center">2◎</TableCell>
                  <TableCell align="center">0.00<img src={point} className='recentplays-point' /></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <p className='recentplays-text'>The #1 most trusted gaming on Solana</p>
      </Grid>
      <Grid xs={3} />
    </Grid>
  )
}

export default RecentPlays