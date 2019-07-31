import { DatePicker as AntDatePicker } from 'antd';
import { TimePicker as AntTimePicker } from 'antd';
import { withStyles } from '@material-ui/styles';

import * as React from 'react';

const styles: any = (theme) => {
  let commonStyle = {
    '& input ': {
      height: '30px',
      borderRadius: 0,
      border: `1px solid ${theme.palette.gray2}`
    },
    '& .ant-input:focus': {
      boxShadow: 'none'
    },

    '& .ant-input[disabled]:hover': {
      borderColor: theme.palette.gray2
    }
  };
  return {
    date: { ...commonStyle },
    month: { ...commonStyle },
    range: {
      '&.ant-calendar-picker:focus .ant-calendar-picker-input:not(.ant-input-disabled)': {
        boxShadow: 'none'
      },
      '& .ant-input': {
        // height: '30px',
        borderRadius: 0,
        border: `1px solid ${theme.palette.gray2}`
      },
      '& .ant-input[disabled]:hover': {
        borderColor: theme.palette.gray2
      }
    },
    week: { ...commonStyle }
  };
};

interface DatePickerProps {
  classes;
  className?;
  size?;
  locale?;
  defaultValue?;
  onChange?;
}

interface TimePickerProps {
  className?;
  defaultValue?;
  format?;
  size?;
  onChange?;
}

interface MonthPickerProps {
  classes;
}
interface RangePickerProps {
  classes;
  size?;
  className?;
  format?;
  locale?;
  onChange?;
  disabled?;
}
interface WeekPickerProps {
  classes;
}

const DatePicker: React.FunctionComponent<DatePickerProps> = (props) => {
  let { classes, ...other } = props;
  return <AntDatePicker className={classes.date} {...other} />;
};

const TimePicker: React.FunctionComponent<TimePickerProps> = (props) => {
  let { ...other } = props;
  return <AntTimePicker {...other} />;
};

const MonthPickerComponent: React.FunctionComponent<MonthPickerProps> = (props) => {
  let { classes, ...other } = props;
  return <AntDatePicker.MonthPicker className={classes.month} {...other} />;
};

const MonthPicker = withStyles(styles)(MonthPickerComponent);

const RangePickerComponent: React.FunctionComponent<RangePickerProps> = (props) => {
  let { classes, ...other } = props;
  return <AntDatePicker.RangePicker className={classes.range} {...other} />;
};

const RangePicker = withStyles(styles)(RangePickerComponent);

const WeekPickerComponent: React.FunctionComponent<WeekPickerProps> = (props) => {
  let { classes, ...other } = props;
  return <AntDatePicker.WeekPicker className={classes.week} {...other} />;
};

const WeekPicker = withStyles(styles)(WeekPickerComponent);

export default withStyles(styles)(DatePicker);
export { MonthPicker, RangePicker, WeekPicker, TimePicker };
