import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import Header from "./components/Header";
import CreatePlayer from "./components/CreatePlayer";

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
            </Switch>
          </Router>
        </div>
      </MuiThemeProvider>
  );
}

export default App;
