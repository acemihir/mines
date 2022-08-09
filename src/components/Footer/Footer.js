import { Box, Grid, Divider } from '@mui/material';
import twitter from '../../assets/images/twitter.png';
import discord from '../../assets/images/discord.png';
import magiceden from '../../assets/images/magiceden.png';
import bomb from '../../assets/images/bomb.png';
import axe from '../../assets/images/axe.png'
import './Footer.scss'

const Footer = () => {
  return (
    <Grid className='footer-container' container>
      <Grid xs={3} />
      <Grid xs={6} className='footer-grid'>
        <Divider className='footer-divider' />
        <Box>
          <Grid container spacing={4}>
            <Grid className='footer-items' xs={4}>
              <img className='footer-icons' src={bomb} />
              <img className='footer-icons' src={discord} />
              <img className='footer-icons' src={twitter} />
              <img className='footer-icons' src={magiceden} />
            </Grid>
            <Grid className='footer-items' xs={4}>
              <span className='copyright'>Copyright © 2022  MinesRush</span>
            </Grid>
            <Grid className='footer-items' xs={4}>
              <span className='solana-speed'><img src={axe} />Solana Network: 2454 TPS</span>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid xs={3} />
    </Grid>
  )
}

export default Footer