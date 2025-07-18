import { Route, Routes } from "react-router-dom";

import Portfolio from "@/pages/portfolio";
import Home from "@/pages/home";
import Wallet from "@/pages/wallet";
import EventDetails from "@/pages/eventDetails";
import TradeDetails from "@/pages/tradeDetails";
import Login from "@/components/login";
import PrivateRoute from "@/components/privateRoute";

function App() {
  return (
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<Login />} path="/login" />
      <Route element={<EventDetails />} path="/event-details/:id" />
      <Route element={<PrivateRoute />}>
        <Route element={<Wallet />} path="/wallet" />
        <Route element={<Portfolio />} path="/portfolio" />
        <Route element={<TradeDetails />} path="/trade-details/:id" />
      </Route>
    </Routes>
  );
}

export default App;
