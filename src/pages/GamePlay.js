import { useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material';
import Header from '../components/Header'
import Content from '../components/Content'
import Footer from '../components/Footer'
import './GamePlay.scss';
const GamePlay = () => {
  const theme = useTheme();

  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <>
      <Header />
      <Content />
      <Footer />
    </>
    // <Typography sx={{ display: { md: 'block', sm: 'none' } }}>This is test</Typography>
  )
}

export default GamePlay;