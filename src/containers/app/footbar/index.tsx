import * as React from "react";
import { withStyles } from "@material-ui/styles";
import CenterContent from "../../../components/center-content";

import { Layout } from "antd";
const { Footer } = Layout;
export interface FootbarProps {
  classes;
}
const styles: any = theme => {
  return {
    root: {
      position: "fixed",
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 99,
      height: "22px",
      lineHeight: "16px",
      padding: `2px ${theme.padding.lg}`,
      backgroundColor: theme.palette.dark,
      borderTop: `1px solid ${theme.palette.black}`,
      borderBottom: `1px solid ${theme.palette.black}`
    },
    content: {
      fontSize: theme.font.size.sm,
      color: theme.font.color.l6,
      display: "flex"
    },
    copyright: {
      flexGrow: 1,
      display: "flex",
      justifyContent: "center"
    }
  };
};

class Footbar extends React.PureComponent<FootbarProps, any> {
  public render() {
    let { classes } = this.props;
    return (
      <Footer className={classes.root}>
        <CenterContent>
          <div className={classes.content}>
            {/* <span>日海智能&感知平台 {`v${process.env.version}`}</span> */}
            <span className={classes.copyright}>
              Copyright © 2019 SunseaAIOT. All Rights Reserved.
            </span>
          </div>
        </CenterContent>
      </Footer>
    );
  }
}

export default withStyles(styles)(Footbar);
