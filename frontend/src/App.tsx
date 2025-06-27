import { Route, Routes } from "react-router-dom";

import Portfolio from "@/pages/portfolio";
import Home from "@/pages/home";
import Wallet from "@/pages/wallet";

function App() {
  return (
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<Portfolio />} path="/portfolio" />
      <Route element={<Wallet />} path="/wallet" />
    </Routes>
  );
}

export default App;
