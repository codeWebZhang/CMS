import * as React from "react";
import { Breadcrumb, Icon } from "antd";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import { withRouter } from "react-router-dom";

import config from "../../../config";
import deepPick from "../../../utils/deepPick";
const { menu } = config;
// import TopBarButton from '../../../components/topbar-button';
export interface BreadcrumbBarProps {
  classes;
  location;
}
const styles: any = theme => {
  return {
    root: {
      position: "fixed",
      left: 0,
      right: 0,
      top: "31px",
      zIndex: 99,
      display: "flex",
      justifyContent: "space-between",
      height: "30px",
      lineHeight: "30px",
      backgroundColor: theme.palette.dark,
      padding: `0 ${theme.padding.md}`,
      fontSize: `${theme.font.size.sm}`,
      borderBottom: `1px solid ${theme.palette.black}`
    },
    breadcrumb: {
      padding: `${theme.padding.sm} 0`
    },
    item: {
      color: theme.font.color.l7
    },
    item_curr: {
      color: theme.font.color.white,
      display: "inline-block",
      backgroundColor: theme.font.color.l3,
      padding: `0px ${theme.padding.sm}`,
      borderRadius: "10px"
    },
    separator: {
      color: theme.font.color.l7
    }
  };
};

class BreadcrumbBar extends React.Component<BreadcrumbBarProps, any> {
  renderItem(path) {
    const { classes } = this.props;
    let items = [];
    for (let index = 0; index < path.length; index++) {
      const element = path[index];
      let cls = classes.item;
      if (index == path.length - 1) {
        cls = classes.item_curr;
      }
      items.push(
        <Breadcrumb.Item>
          <span className={cls}>{path[index].title}</span>
        </Breadcrumb.Item>
      );
    }
    return items;
  }

  public render() {
    const { classes, location } = this.props;
    const selectedKeys = location.pathname.substr(1);
    const keys = selectedKeys.split("/");
    let path = [];
    for (let index = 0; index < keys.length; index++) {
      if (index == 0) {
        const element = deepPick(keys[index], menu);
        if (element) {
          path.push(element);
        }
      }
      if (index == 1) {
        const element = deepPick(`${keys[0]}/${keys[1]}`, menu);
        if (element) {
          path.push(element);
        }
      }
    }

    return (
      <div className={classes.root}>
        <Breadcrumb
          className={classes.breadcrumb}
          separator={<span className={classes.item}>></span>}
        >
          <Breadcrumb.Item>
            <span className={classes.item}>
              <Icon type="home" />
            </span>
          </Breadcrumb.Item>
          {this.renderItem(path)}
        </Breadcrumb>
        {/* <TopBarButton /> */}
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(BreadcrumbBar));
