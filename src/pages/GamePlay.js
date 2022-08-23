import { useState, useEffect } from "react";
import { useMediaQuery, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Header from "../components/Header";
import Content from "../components/Content";
import Footer from "../components/Footer";
import Splash from "../components/Splash";
import background from "../assets/images/hero.png";
import "./GamePlay.scss";
const GamePlay = () => {
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <>
      <Box sx={{ height: loading ? "100vh" : "initial", overflow: "hidden", backgroundImage: isDesktop ? `url(${background})` : "none" }}>
        <Box className="overlay">
          <Header />
          <Content loading={loading} setLoading={setLoading} />
          <Footer />
        </Box>
      </Box>
      <Splash loading={loading} />
    </>
  );
};

export default GamePlay;
