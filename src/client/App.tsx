import React, { useContext } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import "./styles/global.scss";
import { context } from "./context/Context";

import Navbar from "./components/Navbar/Navbar";

// Page imports
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Admin from "./pages/Admin/Admin";

function App() {
  const ctx = useContext(context);

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/profile" component={Profile}></Route>
        <Route path="/admin" component={Admin}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
