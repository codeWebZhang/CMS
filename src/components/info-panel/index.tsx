import * as React from "react";
import { withStyles } from "@material-ui/styles";
import classNames from "classnames";
export interface InfoPanelProps {
  classes;
  className?;
  title?;
  subTitle?;
  actions?;
}

const styles: any = theme => {
  return {
    content: {
      marginBottom: theme.padding.md
    },
    root: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: theme.padding.ls,
      flexWrap: "wrap"
    },
    titleBox: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexShrink: "0"
    },
    title: {
      fontWeight: "bold" as "bold",
      color: theme.palette.primary,
      paddingRight: theme.padding.sm
    },
    subTitle: {},
    pic: {
      width: "8px",
      height: "8px",
      margin: "-2px 5px 0 0 "
    },
    toolBox: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      flexShrink: "1"
    }
  };
};

class InfoPanel extends React.Component<InfoPanelProps, any> {
  public render() {
    let { classes, className, title, subTitle, actions } = this.props;
    const cls = classNames(classes.content, className);
    return (
      <div className={cls}>
        <div className={classes.root}>
          <div className={classes.titleBox}>
            <img
              className={classes.pic}
              src={require("../../assets/images/icon-diamond.png")}
            />
            <div className={classes.title}>{title}</div>
            <div className={classes.subTitle}>{subTitle}</div>
          </div>
          <div className={classes.toolBox}>{actions}</div>
        </div>
        <div>{this.props.children}</div>
      </div>
    );
  }
}

export default withStyles(styles)(InfoPanel);
