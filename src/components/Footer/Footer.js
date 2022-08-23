import { Box, Grid, Divider } from "@mui/material";
import twitter from "../../assets/images/twitter.png";
import discord from "../../assets/images/discord.png";
import magiceden from "../../assets/images/magiceden.png";
import bomb from "../../assets/images/bomb.png";
import axe from "../../assets/images/axe.png";
import "./Footer.scss";

// responsive design
import useMediaQuery from "@mui/material/useMediaQuery";

const Footer = () => {
  const isDesktop = useMediaQuery("(min-width:1200px)");
  return (
    <Grid className="footer-container" container>
      {isDesktop && <Divider className="footer-divider" />}
      <Grid xs={3} />
      <Grid xs={6} className="footer-grid">
        <Box>
          <Grid container spacing={isDesktop ? 4 : 2}>
            <Grid className="footer-items" xs={isDesktop ? 4 : 12}>
              {isDesktop && <img className="footer-icons" src={bomb} />}
              <img className="footer-icons" src={discord} />
              <img className="footer-icons" src={twitter} />
              <img className="footer-icons" src={magiceden} />
            </Grid>
            {isDesktop && (
              <Grid className="footer-items" xs={4}>
                <span className="copyright">Copyright © 2022 MinesRush</span>
              </Grid>
            )}
            <Grid className="footer-items" xs={isDesktop ? 4 : 12}>
              <span className="solana-speed">
                <img src={axe} />
                Solana Network: 2454 TPS
              </span>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid xs={3} />
    </Grid>
  );
};

export default Footer;
