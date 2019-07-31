import { Progress as AntProgress } from 'antd';
import { withStyles } from '@material-ui/styles';

import * as React from 'react';

const styles: any = (theme) => {
  return {
    root: {},
    progressBox: {
      // marginBottom: 10,
      position: 'relative',
      '& .ant-progress-inner': {
        borderRadius: 0,
        backgroundColor: '#EEEEEE'
      },
      '& .ant-progress-bg': {
        borderRadius: '0 !important'
        // height: '22px !important'
      },
      '& .ant-progress-status-active .ant-progress-bg::before': {
        borderRadius: '0 !important'
      }
    },
    progressText: {
      color: theme.palette.dark,
      position: 'absolute',
      left: '8px',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 11
    }
  };
};

interface ProgressProps {
  classes;
  content?;
}

class Progress extends React.Component<ProgressProps, any> {
  public render() {
    let { classes, content, ...other } = this.props;
    return (
      <div className={classes.progressBox}>
        <div className={classes.progressText}>{content}</div>
        <AntProgress showInfo={false} strokeColor="#30CE48" strokeWidth={22} {...other} />
      </div>
    );
  }
}

export default withStyles(styles)(Progress);
