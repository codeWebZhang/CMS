import * as React from 'react';
import { withStyles } from '@material-ui/styles';

export interface CenterContentProps {
  classes;
}
const styles = (theme) => {
  return {
    root: {
      display: 'flex',
      justifyContent: 'center'
    },
    content: {
      flex: 'auto',
      minHeight: '0'
      //   maxWidth: '1200px'
    }
  };
};

class CenterContent extends React.PureComponent<CenterContentProps, any> {
  public render() {
    let { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.content}>{this.props.children}</div>
      </div>
    );
  }
}

export default withStyles(styles)(CenterContent);
