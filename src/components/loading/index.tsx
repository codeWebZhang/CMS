import * as React from 'react';
import { Spin } from 'antd';
import { withStyles } from '@material-ui/styles';
export interface LoadingProps {
  error;
  pastDelay;
  children?;
  classes;
}
const styles: any = (theme) => {
  return {
    loaderContainer: {
      position: 'absolute',
      top: '50%',
      left: '50%'
    }
  };
};
function Loading(props: LoadingProps) {
  let { classes } = props;
  if (props.error) {
    return <div className={classes.loaderContainer}>出错了! 请刷新页面</div>;
  } else if (props.pastDelay) {
    return (
      <div className={classes.loaderContainer}>
        <Spin />
      </div>
    );
  } else {
    return props.children ? props.children : null;
  }
}

export default withStyles(styles)(Loading);
