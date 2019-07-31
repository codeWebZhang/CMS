import * as React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import List from "./list";
export interface OrganizationProps {
  match;
  classes;
}
const styles: any = theme => {
  return {
    root: {}
  };
};
class Organization extends React.Component<OrganizationProps, any> {
  public render() {
    let { match, classes } = this.props;
    return (
      <div className={classes.root}>
        <Switch>
          <Redirect exact from={`${match.url}/`} to={`${match.url}/list`} />
          <Route path={`${match.url}/list`} component={List} />
        </Switch>
      </div>
    );
  }
}
export default withStyles(styles)(Organization);
