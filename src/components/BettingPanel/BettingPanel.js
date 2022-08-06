import { Box, Grid, Typography } from '@mui/material'
import messaging from '../../assets/images/messaging.png'
import toolbar from '../../assets/images/toolbar.png'
import './BettingPanel.scss'

const BettingPanel = () => {
  return (
    <Grid className='bettingpanel-container' container>
      <Grid xs={4} />
      <Grid xs={4}>
        <Box className='settings-text'>
          <span className='setting-amount'>Sol Amount</span>
          <span className='minmax-values'>Min. Mine: <span className='betsetting-value'>0.05</span> Max. Mine: <span className='betsetting-value'>2</span></span>
          <span>&nbsp;</span>
        </Box>
        <Box className='betting-buttons'>
          <img src={toolbar} />
        </Box>
        <Box className='betting-values-group'>
          <span className='betting-values'>0.05</span>
          <span className='betting-values'>0.10</span>
          <span className='betting-values'>0.25</span>
          <span className='betting-values'>0.5</span>
          <span className='betting-values'>1</span>
          <span className='betting-values'>2</span>
        </Box>
      </Grid>
      <Grid className='messaging-container' xs={4}>
        <a><img className='message-link' src={messaging} /></a>
      </Grid>
    </Grid>
  )
}

export default BettingPanel;