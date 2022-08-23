import { useState, useEffect } from "react";
import { useMediaQuery } from "@mui/material";
import { useTheme, Box } from "@mui/material";
import Header from "../components/Header";
import Content from "../components/Content";
import Footer from "../components/Footer";
import Splash from "../components/Splash";
import "./GamePlay.scss";
const GamePlay = () => {
  const [loading, setLoading] = useState(true);
  const [depositText, setDepositText] = useState(false);
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <>
      <Box sx={{ height: loading ? "100vh" : "initial", overflow: "hidden" }}>
        <Header />
        <Content
          loading={loading}
          setLoading={setLoading}
          depositText={depositText}
          setDepositText={setDepositText}
        />
        <Footer />
      </Box>
      <Splash loading={loading} depositText={depositText} />
    </>
  );
};

export default GamePlay;
