import * as React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";
import { Menu, Icon } from "antd";

import { Link } from "react-router-dom";
import _ from "lodash";

import config from "../../../config";
const { menu } = config;

export interface HorizontalNavProps {
  classes;
  location;
}
const styles: any = theme => {
  return {
    root: {
      lineHeight: "30px",
      backgroundColor: theme.palette.primary
    },
    menu_item: {
      borderRight: "1px solid #000000 !important",
      borderLeft: "1px solid #677681 !important",
      fontSize: "12px",
      cursor: "pointer",
      width: "140px",
      textAlign: "center",
      "&.ant-menu-item-active": {
        backgroundColor: "#000000 !important"
      },
      "&.ant-menu-item-selected": {
        backgroundColor: `${theme.palette.primary}  !important`
      },
      "&.ant-menu-item-selected > a": {
        color: "rgba(255,255,255, .65)"
      }
    },
    submenuText: {
      borderRight: "1px solid #000000",
      borderLeft: "1px solid #677681",
      fontSize: "12px",
      padding: "0 20px",
      cursor: "pointer"
    },
    submenu: {
      fontSize: "12px",
      "& .ant-menu-submenu-title": {
        padding: "0px",
        width: "140px",
        textAlign: "center",
        color: "rgba(255, 255, 255, .65)"
      },
      "&.ant-menu-submenu-open": {
        backgroundColor: "#000000",
        "& .ant-menu-submenu-title": {
          color: "#fff"
        }
      },
      "&.ant-menu-submenu": {
        "& .ant-menu": {
          boxShadow: "4px 2px 8px rgba(0, 0, 0, 0.65) !important"
        }
      },
      "& .ant-menu-sub": {
        backgroundColor: "#F5F5F5",
        borderRadius: "1px",
        marginTop: "-5px",
        "& .ant-menu-item": {
          margin: "0px auto",
          height: "30px",
          lineHeight: "30px",
          paddingLeft: "10px",
          borderBottom: "1px solid #DDDDDD"
        },
        "& .ant-menu-item-selected": {
          backgroundColor: "transparent"
        },
        "& .ant-menu-item > a": {
          color: "#555555"
        }
      }
    },
    submenuBg: {
      "&:hover": {
        backgroundColor: "#1D90FF !important"
      }
    },
    linkText: {
      "&:hover": {
        color: "#fff !important"
      }
    },
    noLeft: {
      borderLeft: "0px !important"
    },
    noRight: {
      borderRight: "0px !important"
    }
  };
};
class HorizontalNav extends React.Component<HorizontalNavProps, any> {
  renderChildren(children) {
    let { classes } = this.props;
    return _.map(children, item => {
      return (
        <Menu.Item key={item.key} className={classes.submenuBg}>
          <Link className={classes.linkText} to={`/${item.key}`}>
            {item.title}
          </Link>
        </Menu.Item>
      );
    });
  }
  renderItems(selectedKeys) {
    const { classes } = this.props;
    let items = [];
    for (let index = 0; index < menu.length; index++) {
      const item = menu[index];
      if (_.has(item, "children")) {
        let cls;
        if (index == 0) {
          cls = classNames(classes.submenu, classes.noLeft);
        } else if (index == menu.length - 1) {
          cls = classNames(classes.submenu, classes.noRight);
        } else {
          cls = classNames(classes.submenu);
        }
        items.push(
          <Menu.SubMenu
            key={item.key}
            className={cls}
            title={<div className={classes.submenuText}>{item.title}</div>}
          >
            {this.renderChildren(item.children)}
          </Menu.SubMenu>
        );
      } else {
        let cls;
        if (index == 0) {
          cls = classNames(classes.menu_item, classes.noLeft);
        } else if (index == menu.length - 1) {
          cls = classNames(classes.menu_item, classes.noRight);
        } else {
          cls = classNames(classes.menu_item);
        }
        items.push(
          <Menu.Item className={cls} key={item.key}>
            <Link to={`/${item.key}`}>{item.title}</Link>
          </Menu.Item>
        );
      }
    }
    return items;
  }

  public render() {
    const { classes, location } = this.props;
    const _selectedKeys = location.pathname.substr(1).split("/");
    let selectedKeys = [_.slice(_selectedKeys, 0, 2).join("/")];
    selectedKeys.push(_selectedKeys[0]);
    return (
      <Menu
        selectedKeys={selectedKeys}
        // openKeys={selectedKeys}
        mode="horizontal"
        theme="dark"
        selectable={true}
        className={classes.root}
      >
        {this.renderItems(selectedKeys)}
      </Menu>
    );
  }
}

export default withRouter(withStyles(styles)(HorizontalNav));
