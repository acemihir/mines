import {
  Box,
  Button
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
          <Button className='navbar-item'><img className='control-option-image' src={speaker} /></Button>
          <Button className='navbar-item'><img className='control-option-image' src={scale} /></Button>
          <Button className='navbar-item'>LIGHT</Button>
        </Box>
        <Box className='navlinks navbar-group'>
          <Button className='navbar-item'>RECENT</Button>
          <Button className='navbar-item'>
            STATS&nbsp;
            <img className='control-option-image' src={chart} />
          </Button>
          <Button className='navbar-item'>CONNECT</Button>
          <img className='balance-image' src={coin} />
        </Box>
      </Box>
      <span className='sol-balance'>SOL 10.045</span>
    </>
  )
}

export default Header