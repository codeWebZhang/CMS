import * as React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
// import loadable from 'react-loadable';
// import LoadingComponent from '../components/loading';
import Dashboard from "./dashboard";
import System from "./system";
interface AppProps {
  match: any;
  classes;
}
const styles: any = theme => {
  return {
    root: {}
  };
};

// let Dashboard = loadable({
//   loader: () => import(/* webpackChunkName: "dashboard" */ './dashboard'),
//   loading: LoadingComponent
// });
// let DeviceType = loadable({
//   loader: () => import(/* webpackChunkName: "deviceType" */ './deviceType'),
//   loading: LoadingComponent
// });
// let System = loadable({
//   loader: () => import(/* webpackChunkName: "system" */ './system'),
//   loading: LoadingComponent
// });
// let Device = loadable({
//   loader: () => import(/* webpackChunkName: "device" */ './device'),
//   loading: LoadingComponent
// });
// let Alarm = loadable({
//   loader: () => import(/* webpackChunkName: "alarm" */ './alarm'),
//   loading: LoadingComponent
// });
// let User = loadable({
//   loader: () => import(/* webpackChunkName: "user" */ './user'),
//   loading: LoadingComponent
// });

const App: React.FunctionComponent<AppProps> = ({ match, classes }) => {
  return (
    <div className={classes.root}>
      <Switch>
        {/* <Redirect exact from={`${match.url}/`} to={`${match.url}login`} /> */}
        <Route path={`${match.url}dashboard`} component={Dashboard} />
        {/* <Route path={`${match.url}deviceType`} component={DeviceType} />
        <Route path={`${match.url}system`} component={System} />
        <Route path={`${match.url}device`} component={Device} />
        <Route path={`${match.url}alarm`} component={Alarm} />
        <Route path={`${match.url}user`} component={User} /> */}
        <Route path={`${match.url}system`} component={System} />
      </Switch>
    </div>
  );
};

export default withStyles(styles)(App);
