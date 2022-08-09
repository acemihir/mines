import { Box, Grid, Button } from '@mui/material'
import messaging from '../../assets/images/messaging.png'
import solana from '../../assets/images/solana.png'
import options from '../../assets/images/setting.png'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
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
          <Box className='betting-amount'>
            <Box className='betting-amount-value'>
              <img className='solana-image' src={solana} />
              <span className='betting-value-text'>0.05</span>
            </Box>
            <Box className='betting-amount-control'>
              <span className='betting-amount-addition'>+</span>
              <span className='betting-amount-addition'>-</span>
            </Box>
          </Box>
          <Button className='betting-play'><PlayArrowIcon />Play Game</Button>
          <Box className='betting-options'>
            <img className='options-image' src={options} />
          </Box>
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