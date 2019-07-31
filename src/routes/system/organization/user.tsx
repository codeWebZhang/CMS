import * as React from "react";
import { withStyles } from "@material-ui/styles";
import { Card } from "antd";

// import ColorHash from "../../../utils/ColorHash";

export interface UserInfoProps {
  classes;
  role;
  name;
}
const styles: any = theme => ({
  card: {
    width: "100%",
    minWidth: "122px",
    marginBottom: "20px",
    fontSize: "12px",
    color: theme.palette.dark,
    "& .ant-card-body": {
      padding: "0px"
    }
  },
  grid: {
    width: "100%",
    minHeight: "100px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    "&.ant-card-grid": {
      padding: "20px"
    }
  },
  avatar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: "0",
    width: "50px",
    height: "50px",
    lineHeight: "50px",
    borderRadius: "50%",
    color: theme.palette.white,
    fontSize: "26px",
    fontWeight: "bold",
    marginRight: "14px"
  },
  wrap: {
    display: "flex",
    minWidth: "42px",
    alignItems: "center",
    flexDirection: "column",
    flexShrink: "1"
  },
  role: {
    width: "100%",
    marginBottom: "8px",
    margin: "0",
    padding: "0",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  name: {
    width: "100%",
    margin: "0",
    padding: "0",
    fontSize: "24px",
    fontWeight: "bold",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  }
});

const UserInfo: React.FunctionComponent<UserInfoProps> = props => {
  const { classes, role, name } = props;
  //   let colorHash = new ColorHash();
  //   let bgColor = colorHash.hex(name);
  return (
    <Card className={classes.card} bordered={false}>
      <Card.Grid className={classes.grid}>
        {/* <div className={classes.avatar} style={{ backgroundColor: bgColor }}> */}
        <div className={classes.avatar}>{name.charAt(0)}</div>
        <div className={classes.wrap}>
          <p className={classes.role}>{role}</p>
          <p className={classes.name}>{name}</p>
        </div>
      </Card.Grid>
    </Card>
  );
};

export default withStyles(styles)(UserInfo);
