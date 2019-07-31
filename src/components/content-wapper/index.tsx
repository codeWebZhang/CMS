import * as React from 'react';
import { withStyles } from '@material-ui/styles';

export interface ContentWapperProps {
  classes;
}
const styles = (theme) => {
  return {
    root: {},
    wapper: {
      padding: `${theme.padding.lg}`
    }
  };
};
class ContentWapper extends React.PureComponent<ContentWapperProps, any> {
  public render() {
    let { classes } = this.props;
    return <div className={classes.wapper}>{this.props.children}</div>;
  }
}
export default withStyles(styles)(ContentWapper);
