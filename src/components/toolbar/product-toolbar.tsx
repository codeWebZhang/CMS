import * as React from 'react';
import { withStyles } from '@material-ui/styles';
import classNames from 'classnames';
import Toolbar from './index';
import Input from '../input/index';
import Button from '../button';
const styles = (theme) => {
  return {
    root: {},
    input: {
      width: '160px',
      marginRight: '4px',
      '&.ant-input': {
        borderRadius: '2px'
      }
    },
    button: {
      marginRight: '20px'
    },
    optionButton: {
      marginLeft: '4px'
    }
  };
};

export interface ProductToolbarProps {
  classes;
}

class ProductToolbar extends React.PureComponent<ProductToolbarProps, any> {
  public render() {
    let { classes } = this.props;
    return (
      <Toolbar
        leftChildren={
          <div>
            <Input className={classes.input} size="small" placeholder="请输入产品名称" />
            <Button className={classes.button} type="primary" icon="search" />
          </div>
        }
        rightChildren={
          <div>
            <Button className={classes.optionButton}>刷新</Button>
            <Button className={classes.optionButton} type="primary">
              新增
            </Button>
          </div>
        }
      />
    );
  }
}

export default withStyles(styles)(ProductToolbar);
