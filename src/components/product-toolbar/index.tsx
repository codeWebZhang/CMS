import * as React from 'react';
import { withStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import { Input, Button } from 'antd';
const styles = (theme) => {
  return {
    root: {
      marginBottom: '10px'
    },
    searchInput: {
      width: '238px',
      '&.ant-input': {
        border: `1px solid ${theme.border.color.l3}`,
        borderRadius: '2px'
      }
    },
    searchButton: {
      marginLeft: '10px'
    },
    actionButton: {
      float: 'right' as 'right',
      marginLeft: '10px'
    }
  };
};

export interface ProductToolbarProps {
  classes;
  history;
  match;
}

class ProductToolbar extends React.Component<ProductToolbarProps, any> {
  doShowCreate = () => {
    let { history, match } = this.props;
    history.push(`/product/create`);
  };
  public render() {
    let { classes } = this.props;
    return (
      <div className={classes.root}>
        <Input size="small" className={classes.searchInput} placeholder="请输入产品名称" />
        <Button type="primary" size="small" className={classes.searchButton}>
          search
        </Button>
        <Button
          type="primary"
          size="small"
          className={classes.actionButton}
          onClick={this.doShowCreate}
        >
          新增
        </Button>
        <Button size="small" className={classes.actionButton}>
          刷新
        </Button>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(ProductToolbar));
