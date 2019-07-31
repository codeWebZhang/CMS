import { Checkbox as AntCheckbox } from 'antd';
import { withStyles } from '@material-ui/styles';
import classNames from 'classnames';

import * as React from 'react';

const styles = (theme) => {
  return {
    root: {
      '& .ant-checkbox-inner': { backgroundColor: theme.palette.gray3 },
      '& .ant-checkbox-checked .ant-checkbox-inner::after': {
        borderColor: theme.palette.dark
      },
      '& .ant-checkbox-disabled .ant-checkbox-inner': {
        borderColor: theme.palette.gray2 + '!important'
      },
      '& .ant-checkbox-disabled .ant-checkbox-inner::after': {
        borderColor: theme.palette.gray1
      },
      '& .ant-checkbox-indeterminate .ant-checkbox-inner::after': {
        height: '3px'
      }
    }
  };
};

interface CheckboxProps {
  classes?;
  title?;
  disabled?;
  defaultChecked?;
  indeterminate?;
  onChange?;
  checked?;
  className?;
}

class Checkbox extends React.Component<CheckboxProps, any> {
  public render() {
    let { classes, className = '', ...other } = this.props;
    const cls = classNames(classes.root, className);
    return (
      <AntCheckbox className={cls} {...other}>
        {other.title}
      </AntCheckbox>
    );
  }
}

export default withStyles(styles)(Checkbox);
