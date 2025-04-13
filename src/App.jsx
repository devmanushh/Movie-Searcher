import Header from "components/commons/Header";
import PageNotFound from "components/commons/PageNotFound";
import Favourites from "components/Pages/Favourites";
import { Route, Switch } from "react-router-dom";

import "./App.css";
import Home from "./components/Pages/Home";
import routes from "./routes";

const App = () => (
  <>
    <Header />
    <Switch>
      <Route exact component={Home} path={routes.root} />
      <Route exact component={Favourites} path={routes.favourites} />
      <Route component={PageNotFound} path="*" />
    </Switch>
  </>
);

export default App;
