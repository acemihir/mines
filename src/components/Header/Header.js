import {
  Box,
  Grid
} from '@mui/material'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import coin from '../../assets/images/coin.png'
import speaker from '../../assets/images/speaker.png'
import scale from '../../assets/images/scale.png'
import chart from '../../assets/images/chart.png'
import './Header.scss'

library.add(fas)
const Header = () => {
  return (
    <>
      <Box className='navbar'>
        <Box className='control-options navbar-group' sx={{ display: { ms: 'none', md: 'block' } }}>
          <span className='navbar-item'><img className='control-option-image' src={speaker} /></span>
          <span className='navbar-item'><img className='control-option-image' src={scale} /></span>
          <span className='navbar-item'>LIGHT</span>
        </Box>
        <Box className='navlinks navbar-group'>
          <span className='navbar-item'>RECENT</span>
          <span className='navbar-item'>
            STATS&nbsp;
            <img className='control-option-image' src={chart} />
          </span>
          <span className='navbar-item'>CONNECT</span>
          <img className='balance-image' src={coin} />
        </Box>
      </Box>
      <span className='sol-balance'>SOL 10.045</span>
    </>
  )
}

export default Header