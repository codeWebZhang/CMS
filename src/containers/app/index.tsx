import * as React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import { withRouter } from "react-router-dom";
import MainApp from "./main";
// import loadable from 'react-loadable';
// import LoadingComponent from '../../components/loading';

// import axios from 'axios';
// import store from 'store';
// if (store.get('AUTH')) {
//   axios.defaults.headers.common['Authorization'] = store.get('AUTH');
// }
// axios.defaults.headers.common[
//   'Authorization'
// ] = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvcmdhbml6YXRpb25JZCI6IjAwNjY5YjYyLWEyYTktNGQ5Mi1iNDZlLTk0MzA3N2EwNWI4OSIsInRlbmFudElkIjoiMDA2NjliNjItYTJhOS00ZDkyLWI0NmUtOTQzMDc3YTA1Yjg5IiwiZXhwIjoxNTYyMTY0NzYxLCJ1c2VySWQiOiIyMGJlMTlkMy1jNWIzLTQxYjItODY1Zi05ZjBhNzI5MjdjMjQifQ.AaMVIkl8c-oI-V_56rp5JDoCRogfD4mxQs7y1oHxWyY`;
// }
// axios.interceptors.response.use(
//   function(response) {
//     // 对响应数据做点什么
//     return response;
//   },
//   function(err) {
//     if (err && err.response && err.response.status == 401) {
//       window.location.href = '/#/login';
//     }
//     return Promise.reject(err);
//   }
// );

// let Login = loadable({
//   loader: () => import(/* webpackChunkName: "login" */ '../login'),
//   loading: LoadingComponent
// });

// let ResetPassword = loadable({
//   loader: () => import(/* webpackChunkName: "resetPassword" */ '../resetPassword'),
//   loading: LoadingComponent
// });

export interface AppProps {
  classes;
  match;
  history;
  location;
}

const RestrictedRoute = ({ component: Component, authUser, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authUser ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

class App extends React.Component<AppProps, any> {
  public render() {
    const { match } = this.props;
    return (
      <Switch>
        {/* <Route exact path="/login" component={Login} />
          <Route exact path="/resetPassword" component={ResetPassword} /> */}
        <RestrictedRoute
          path={`${match.url}`}
          authUser={{ id: "demo" }}
          component={MainApp}
        />
      </Switch>
      //   <MainApp />
    );
  }
}

export default withRouter(App);
