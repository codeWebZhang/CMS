import * as React from 'react';
import { withStyles } from '@material-ui/styles';
import classNames from 'classnames';

const styles: any = (theme) => {
  return {
    root: {
      display: 'flex',
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'space-between',
      marginBottom: theme.padding.ls
    },
    left: {
      flexWrap: 'wrap',
      display: 'flex',
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'flex-start'
    },
    right: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end'
    }
  };
};
export interface ToolbarProps {
  classes;
  leftChildren?;
  rightChildren?;
  className?;
}

const Toolbar: React.FunctionComponent<ToolbarProps> = (props) => {
  let { classes, className = '', leftChildren, rightChildren } = props;
  const cls = classNames(classes.root, className);
  return (
    <div className={cls}>
      <div className={classes.left}>{leftChildren}</div>
      <div className={classes.right}>{rightChildren}</div>
    </div>
  );
};

export default withStyles(styles)(Toolbar);
