import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import Header from "./components/Header";
import CreatePlayer from "./components/CreatePlayer";
import CreateFormation from "./components/CreateFormation";
import ViewFormations from "./components/ViewFormations";

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

function App() {
  return (
      <MuiThemeProvider theme={darkTheme}>
        <div className="App">
          <Router>
            <Header />
            <Switch>
              <Route path="/crear_jugador">
                <CreatePlayer />
              </Route>
              <Route path="/crear_formacion">
                <CreateFormation />
              </Route>
              <Route path="/visualizar_formaciones">
                <ViewFormations />
              </Route>
            </Switch>
          </Router>
        </div>
      </MuiThemeProvider>
  );
}

export default App;
