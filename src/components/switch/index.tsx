import { Switch as AntSwitch } from 'antd';
import { withStyles } from '@material-ui/styles';

import * as React from 'react';

const styles = (theme) => {
  return {
    root: {
      '&.ant-switch-checked': {
        backgroundColor: '#05C400'
      }
    }
  };
};

interface SwitchProps {
  classes;
  defaultChecked?;
  onChange?;
  checked?;
  size?;
}

const Switch: React.FunctionComponent<SwitchProps> = (props) => {
  let { classes, ...other } = props;
  return <AntSwitch className={classes.root} {...other} />;
};

export default withStyles(styles)(Switch);
