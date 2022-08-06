import { Grid, Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { tableCellClasses } from '@mui/material/TableCell'
import point from '../../assets/images/point.png'
import table from '../../assets/images/table.png'
import './RecentPlays.scss'

const RecentPlays = () => {
  return (
    <Grid className='recentplays-container' container>
      <Grid xs={3} />
      <Grid xs={6}>
        <p className='recentplays-title'>RECENT PLAYS</p>
        <Box className='table-container'>
          <img className='table-image' src={table} />
        </Box>
        <p className='recentplays-text'>The #1 most trusted gaming on Solana</p>
        {/* <Box className='table-container'>
          <TableContainer className='table-container'>
            <Table className='table-grid' sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead className='table-header'>
                <TableRow className='table-row'>
                  <TableCell>GAME</TableCell>
                  <TableCell align="right">PLAYER</TableCell>
                  <TableCell align="right">WAGER</TableCell>
                  <TableCell align="right">PAYOUT</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow className='table-row'>
                  <TableCell component="th" scope="row">MineRush</TableCell>
                  <TableCell align="right">glowzi</TableCell>
                  <TableCell align="right">0.25◎</TableCell>
                  <TableCell align="right">0.75<img src={point} className='recentplays-point' /></TableCell>
                </TableRow>
                <TableRow className='table-row'>
                  <TableCell component="th" scope="row">MineRush</TableCell>
                  <TableCell align="right">Toof98</TableCell>
                  <TableCell align="right">2◎</TableCell>
                  <TableCell align="right">0.00<img src={point} className='recentplays-point' /></TableCell>
                </TableRow>
                <TableRow className='table-row'>
                  <TableCell component="th" scope="row">MineRush</TableCell>
                  <TableCell align="right">ThaKid</TableCell>
                  <TableCell align="right">1◎</TableCell>
                  <TableCell align="right">4.00<img src={point} className='recentplays-point' /></TableCell>
                </TableRow>
                <TableRow className='table-row'>
                  <TableCell component="th" scope="row">MineRush</TableCell>
                  <TableCell align="right">BIGDEGEN</TableCell>
                  <TableCell align="right">0.05◎</TableCell>
                  <TableCell align="right">0.00<img src={point} className='recentplays-point' /></TableCell>
                </TableRow>
                <TableRow className='table-row'>
                  <TableCell component="th" scope="row">MineRush</TableCell>
                  <TableCell align="right">glowzi</TableCell>
                  <TableCell align="right">0.25◎</TableCell>
                  <TableCell align="right">0.75<img src={point} className='recentplays-point' /></TableCell>
                </TableRow>
                <TableRow className='table-row'>
                  <TableCell component="th" scope="row">MineRush</TableCell>
                  <TableCell align="right">Toof98</TableCell>
                  <TableCell align="right">2◎</TableCell>
                  <TableCell align="right">0.00<img src={point} className='recentplays-point' /></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box> */}
      </Grid>
      <Grid xs={3} />
    </Grid>
  )
}

export default RecentPlays