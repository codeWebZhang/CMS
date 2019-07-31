import * as React from 'react';
import { withStyles } from '@material-ui/styles';

interface ContentInfoProps {
  classes;
}

const styles: any = (theme) => {
  return {
    root: {
      border: `1px solid ${theme.palette.gray2}`,
      padding: `${theme.padding.ls} ${theme.padding.md}`,
      background: theme.palette.gray3,
      margin: `${theme.padding.ls} 0`
    }
  };
};

const ContentInfo: React.FunctionComponent<ContentInfoProps> = (props) => {
  const { classes, ...other } = props;
  return (
    <div className={classes.root} {...other}>
      {props.children}
    </div>
  );
};

export default withStyles(styles)(ContentInfo);
