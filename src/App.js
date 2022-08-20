import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

import {
  GlowWalletAdapter,
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

import GamePlay from "./pages/GamePlay";
import { Container, Box } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import background from "./assets/images/hero.png";
import "./App.css";
import { useMemo, useEffect } from "react";

import useGameStore from "./GameStore";
import "@fontsource/mada";
import { useNavigate } from "react-router-dom";

require("@solana/wallet-adapter-react-ui/styles.css");

function App() {
  // let navigate = useNavigate();

  // const solNetwork = WalletAdapterNetwork.Testnet;
  // const endpoint = useMemo(() => clusterApiUrl(solNetwork), [solNetwork]);
  const solNetwork = "testnet";
  const endpoint =
    "https://morning-multi-arm.solana-testnet.quiknode.pro/22b4b8c2eb7cadba89b66fecf29008d0273da20e";

  // initialise all the wallets you want to use
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new GlowWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter({ solNetwork }),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
      new SolletExtensionWalletAdapter(),
      new SolletWalletAdapter(),
    ],
    [solNetwork]
  );

  // useEffect(() => {
  //   let timerId;
  //   navigate("/splash");
  //   const resetTimer = () => {
  //     clearTimeout(timerId);
  //     timerId = setTimeout(() => {
  //       navigate("/");
  //     }, 10 * 1000);
  //   };
  // });

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets}>
        <WalletModalProvider>
          <Container
            className="App"
            disableGutters={true}
            maxWidth={false}
            style={{ backgroundImage: `url(${background})` }}
          >
            <Box className="overlay">
              <Router>
                <Routes>
                  <Route path={"/"} element={<GamePlay />} />
                </Routes>
              </Router>
            </Box>
          </Container>

          <Router>
            <Routes></Routes>
          </Router>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
