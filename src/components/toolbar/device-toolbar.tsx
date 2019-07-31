import * as React from 'react';
import { withStyles } from '@material-ui/styles';
import classNames from 'classnames';
import Toolbar from './index';
import Input from '../input/index';
import Button from '../button';
const styles = (theme) => {
  return {
    root: {},
    lable: {
      color: theme.font.color.dark
    },
    input: {
      width: '160px',
      marginRight: '4px',
      marginLeft: '6px',
      '&.ant-input': {
        borderRadius: '2px'
      }
    },
    button: {
      marginRight: '20px'
    },
    lableIcon: {
      color: theme.font.color.dark,
      marginRight: '10px',
      '& .iconfont': {
        fontSize: '14px',
        marginRight: '6px'
      },
      '& .green': {
        color: theme.palette.green
      },
      '& .red': {
        color: theme.palette.red
      },
      '& .yellow': {
        color: theme.palette.yellow
      },
      '& .gray': {
        color: theme.palette.gray4
      }
    },
    optionButton: {
      marginLeft: '4px'
    }
  };
};

export interface DeviceToolbarProps {
  classes;
}

class DeviceToolbar extends React.PureComponent<DeviceToolbarProps, any> {
  public render() {
    let { classes } = this.props;
    return (
      <Toolbar
        leftChildren={
          <div>
            <span className={classes.lable}>标识符</span>
            <Input className={classes.input} size="small" placeholder="请输入标识符" />
            <Button className={classes.button} type="primary" icon="search" />
            <span className={classes.lableIcon}>
              <span
                className={classNames({
                  iconfont: true,
                  'icon-dot': true,
                  green: true
                })}
              />
              123
            </span>
            <span className={classes.lableIcon}>
              <span
                className={classNames({
                  iconfont: true,
                  'icon-dot': true,
                  red: true
                })}
              />
              7773
            </span>
            <span className={classes.lableIcon}>
              <span
                className={classNames({
                  iconfont: true,
                  'icon-dot': true,
                  yellow: true
                })}
              />
              523
            </span>
            <span className={classes.lableIcon}>
              <span
                className={classNames({
                  iconfont: true,
                  'icon-dot': true,
                  gray: true
                })}
              />
              1234
            </span>
          </div>
        }
        rightChildren={
          <div>
            <Button className={classes.optionButton} type="primary" disabled>
              删除
            </Button>
            <Button className={classes.optionButton} type="primary">
              启用
            </Button>
            <Button className={classes.optionButton} type="primary">
              禁用
            </Button>
          </div>
        }
      />
    );
  }
}

export default withStyles(styles)(DeviceToolbar);
