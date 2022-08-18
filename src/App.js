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
import { useMemo } from "react";

import useGameStore from "./GameStore";
import "@fontsource/mada";

require("@solana/wallet-adapter-react-ui/styles.css");

function App() {
  const solNetwork = WalletAdapterNetwork.Testnet;
  const endpoint = useMemo(() => clusterApiUrl(solNetwork), [solNetwork]);
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
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
