import * as React from 'react';
import { withStyles } from '@material-ui/styles';
import { Button } from 'antd';
import classNames from 'classnames';

const styles = (theme) => ({
  root: {
    '& .ant-btn': {
      borderColor: theme.palette.gray2,
      color: theme.palette.dark,
      width: '80px',
      height: '20px',
      '&:hover, &:active, &:focus': {
        backgroundColor: theme.palette.primary,
        color: '#fff'
      }
    }
  },
  bottomradius: {
    '&.ant-btn-group > .ant-btn:first-child:not(:last-child)': {
      borderBottomLeftRadius: '0'
    },
    '&.ant-btn-group > .ant-btn:last-child:not(:first-child)': {
      borderBottomRightRadius: '0'
    }
  }
});
export interface ButtonGroupProps {
  classes;
  children;
  bottomradius?;
  className?;
}
class ButtonGroup extends React.Component<ButtonGroupProps, any> {
  public render() {
    const { classes, children, bottomradius } = this.props;
    let cls = classNames(classes.root, { [classes.bottomradius]: !bottomradius });

    return <Button.Group className={cls}>{children}</Button.Group>;
  }
}
export default withStyles(styles)(ButtonGroup);
