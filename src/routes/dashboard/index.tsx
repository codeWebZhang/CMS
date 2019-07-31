import * as React from "react";
import { withStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";

import { injectIntl } from "react-intl";

import { dashboard } from "../../messages/dashboard";

export interface IDashboardProps {
  classes;
  intl;
}

const styles: any = theme => {
  return {
    root: {},
    font: {
      fontSize: "1rem",
      textAlign: "center"
    }
  };
};

class Dashboard extends React.Component<IDashboardProps> {
  public render() {
    const { classes } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <div className={classes.font}>xs=12</div>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.font}>xs=6</div>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.font}>xs=6</div>
          </Grid>
          <Grid item xs={12}>
            <div>{formatMessage(dashboard.dashboard_test)}</div>
          </Grid>
          <Grid item xs={12}>
            <div>xs=3</div>
          </Grid>
          <Grid item xs={12}>
            <div>xs=3</div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(injectIntl(Dashboard));
