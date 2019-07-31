import * as React from "react";
import { Provider } from "react-redux";
import { Route, HashRouter as Router, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import ScrollToTop from "./components/scroll-to-top";
import App from "./containers/app";
// import Login from "./containers/login";
import { hot } from "react-hot-loader/root";

import { store } from "./store";

import Intl from "./intl";

export interface RootProps {}

class Root extends React.Component<RootProps, any> {
  public render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={require("./theme")}>
          <Router>
            <Intl>
              <ScrollToTop>
                <Switch>
                  <Route path="/" component={App} />
                </Switch>
              </ScrollToTop>
            </Intl>
          </Router>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default hot(Root);
