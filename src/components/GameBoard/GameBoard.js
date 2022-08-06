import { Box, Grid, Typography } from '@mui/material'
import Mine from '../Mine'
import './GameBoard.scss'

const GameBoard = () => {
  return (
    <>
      <Typography className='multiplier'>Next Multiplier <span className='multiplier-value'>X1.11</span></Typography>
      <Grid className='gameboard-container' container>
        <Grid xs={4} />
        <Grid xs={4}>
          <Grid className='gameboard'container spacing={2}>
            <Grid xs={1}></Grid>
            <Grid xs={2} className='mine-block'><Mine type={2} /></Grid>
            <Grid xs={2} className='mine-block'><Mine type={0} /></Grid>
            <Grid xs={2} className='mine-block'><Mine type={0} /></Grid>
            <Grid xs={2} className='mine-block'><Mine type={1} /></Grid>
            <Grid xs={2} className='mine-block'><Mine type={0} /></Grid>
            <Grid xs={1}></Grid>
            <Grid xs={1}></Grid>
            <Grid xs={2} className='mine-block'><Mine type={0} /></Grid>
            <Grid xs={2} className='mine-block'><Mine type={1} /></Grid>
            <Grid xs={2} className='mine-block'><Mine type={1} /></Grid>
            <Grid xs={2} className='mine-block'><Mine type={0} /></Grid>
            <Grid xs={2} className='mine-block'><Mine type={2} /></Grid>
            <Grid xs={1}></Grid>
            <Grid xs={1}></Grid>
            <Grid xs={2} className='mine-block'><Mine type={0} /></Grid>
            <Grid xs={2} className='mine-block'><Mine type={0} /></Grid>
            <Grid xs={2} className='mine-block'><Mine type={2} /></Grid>
            <Grid xs={2} className='mine-block'><Mine type={0} /></Grid>
            <Grid xs={2} className='mine-block'><Mine type={1} /></Grid>
            <Grid xs={1}></Grid>
            <Grid xs={1}></Grid>
            <Grid xs={2} className='mine-block'><Mine type={0} /></Grid>
            <Grid xs={2} className='mine-block'><Mine type={0} /></Grid>
            <Grid xs={2} className='mine-block'><Mine type={0} /></Grid>
            <Grid xs={2} className='mine-block'><Mine type={0} /></Grid>
            <Grid xs={2} className='mine-block'><Mine type={2} /></Grid>
            <Grid xs={1}></Grid>
            <Grid xs={1}></Grid>
            <Grid xs={2} className='mine-block'><Mine type={0} /></Grid>
            <Grid xs={2} className='mine-block'><Mine type={0} /></Grid>
            <Grid xs={2} className='mine-block'><Mine type={2} /></Grid>
            <Grid xs={2} className='mine-block'><Mine type={0} /></Grid>
            <Grid xs={2} className='mine-block'><Mine type={1} /></Grid>
            <Grid xs={1}></Grid>
          </Grid>
        </Grid>
        <Grid xs={4} />
      </Grid>
    </>
  )
}

export default GameBoard