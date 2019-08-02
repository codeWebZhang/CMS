import * as React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/styles";

import Organization from "./organization";
// import Role from './role';
// import Tenant from './tenant';
// import User from './user';
// import Log from './log';

interface SystemProps {
  match: any;
  classes;
}
const styles: any = theme => {
  return {
    root: {}
  };
};
const System: React.FunctionComponent<SystemProps> = ({ match, classes }) => {
  console.log(match.url, "====");
  return (
    <div className={classes.root}>
      <Switch>
        {/* <Route path={`${match.url}/user`} component={User} />
        <Route path={`${match.url}/role`} component={Role} /> */}
        <Route path={`${match.url}/organization`} component={Organization} />
        {/* <Route path={`${match.url}/tenant`} component={Tenant} />
        <Route path={`${match.url}/log`} component={Log} /> */}
        <Redirect
          exact
          from={`${match.url}/`}
          to={`${match.url}/organization`}
        />
      </Switch>
    </div>
  );
};

export default withStyles(styles)(System);
