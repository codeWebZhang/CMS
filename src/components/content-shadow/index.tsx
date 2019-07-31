import * as React from 'react';
import { withStyles } from '@material-ui/styles';
import classNames from 'classnames';
interface ContentShadowProps {
  classes;
  className?;
}

const styles: any = (theme) => {
  return {
    root: {
      border: `1px solid ${theme.palette.gray2}`,
      boxShadow: '2px 2px 2px #E3E4E9'
    }
  };
};

const ContentShadow: React.FunctionComponent<ContentShadowProps> = (props) => {
  const { classes, className = '', ...other } = props;
  const cls = classNames(classes.root, className);
  return (
    <div className={cls} {...other}>
      {props.children}
    </div>
  );
};

export default withStyles(styles)(ContentShadow);
