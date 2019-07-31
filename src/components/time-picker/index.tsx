import { TimePicker as AntTimePicker } from 'antd';
import { withStyles } from '@material-ui/styles';

import * as React from 'react';

const styles: any = (theme) => {
  return {
    root: {
      '& .ant-time-picker-input': {
        height: '30px',
        borderRadius: 0,
        border: `1px solid ${theme.palette.gray2}`,
        '&:hover,&:focus': {
          boxShadow: 'none',
          border: `1px solid ${theme.palette.primary}`
        },
        '&[disabled]:hover': {
          borderColor: `${theme.palette.gray2} !important`
        }
      }
    }
  };
};

interface TimePickerProps {
  classes;
}

const TimePicker: React.FunctionComponent<TimePickerProps> = (props) => {
  let { classes, ...other } = props;
  return <AntTimePicker className={classes.root} {...other} />;
};

export default withStyles(styles)(TimePicker);
