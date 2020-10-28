import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {
  UserList,
  SingleUser
} from "./User";
import RegistrationForm from "./components/authentication/Registration";
import LoginForm from "./components/authentication/Login";
import Currencies from "./currencies";
import {Watchlist} from "./Watchlist"
import {Inventory} from "./Inventory";
import Offer from "./Offer";
import Trade from "./Trades";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/registration">Registration</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/users" component={UserList}/>
          <Route path="/users/:id" component={SingleUser}/>
          <Route path="/login" component={LoginForm} />
          <Route path="/registration" component={RegistrationForm}/>
          <Route path="/currencies" component={Currencies}/>
          <Route path="/watchlist" component={Watchlist}/>
          <Route path="/inventory" component={Inventory}/>
          <Route path="/offers" component={Offer}/>
          <Route path="/trades" component={Trade}/>
        </Switch>
      </div>
    </Router>
  );
}

