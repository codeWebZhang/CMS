import * as React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

// import axios from 'axios';
// import store from 'store';

import { Layout, Popover } from "antd";
const { Header } = Layout;
import { withStyles } from "@material-ui/styles";

// import Modal from '../../../components/modal';

import HorizontalNav from "./horizontalNav";
import BreadcrumbBar from "./breadcrumbBar";

export interface TopbarProps {
  classes;
  history;
}

const styles: any = theme => {
  return {
    root: {
      position: "fixed",
      left: 0,
      right: 0,
      top: 0,
      zIndex: 99,
      height: "31px",
      padding: `0 ${theme.padding.sm}`,
      lineHeight: 1,
      backgroundColor: theme.palette.primary,
      display: "flex",
      borderBottom: "solid",
      borderBottomColor: "#000000",
      borderBottomWidth: "1px"
    },
    logo: {
      padding: `${theme.padding.sm} 0`,
      "& img": { height: "19px", padding: `4px ${theme.padding.sm}` }
    },
    menu: {
      flexGrow: 1
    },
    act: {
      listStyle: "none",
      margin: 0,
      padding: `${theme.padding.sm} 0`,
      display: "flex",
      alignItems: "center",
      "& a": {
        color: "white !important"
      }
    },
    user: {
      marginRight: "25px",
      fontSize: "14px",
      color: "white",
      cursor: "pointer"
    },
    notify: {
      marginRight: "20px",
      cursor: "pointer"
    },
    btn_close: {
      cursor: "pointer",
      width: "20px",
      height: "20px"
    }
  };
};
class Topbar extends React.Component<TopbarProps, any> {
  //   logOut = () => {
  //     var self = this;
  //     Modal.info({
  //       title: '提示',
  //       children: <div>您确定要现在退出本系统吗？</div>,
  //       okText: '确定',
  //       cancelText: '取消',
  //       onOk() {
  //         self.clearToken();
  //       },
  //       onCancel() {}
  //     });
  //   };

  //   clearToken = () => {
  //     store.set('AUTH', '');
  //     axios.defaults.headers.common['Authorization'] = '';
  //     this.props.history.push('/login');
  //   };

  public render() {
    const { classes } = this.props;
    return (
      <>
        <Header className={classes.root}>
          <div className={classes.logo}>
            {/* <img src="./src/assets/images/logo-light.png" /> */}
            <img src={require("../../../assets/images/logo-light.png")} />
          </div>
          <div className={classes.menu}>
            <HorizontalNav />
          </div>
          <ul className={classes.act}>
            {/* <li className={classes.notify}>
              <Link to="/system/log/list">
                <Badge dot>
                  <Icon type="bell" style={{ fontSize: '14px' }} />
                </Badge>
              </Link>
            </li> */}

            <li className={classes.user}>
              <Link to="/user/profile">
                <span
                  className="iconfont icon-user"
                  style={{ fontSize: "14px" }}
                />
              </Link>
            </li>
            {/* <li onClick={this.logOut}>
              <img
                className={classes.btn_close}
                src="./assets/images/icon-close.png"
                alt="close"
              />
            </li> */}
          </ul>
        </Header>
        <BreadcrumbBar />
      </>
    );
  }
}

export default withStyles(styles)(withRouter(Topbar));
