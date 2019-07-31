import * as React from 'react';
import { withStyles } from '@material-ui/styles';

export interface ExplanationProps {
  classes;
  title;
}

const styles = (theme) => {
  return {
    root: {}
  };
};

const Explanation: React.FunctionComponent<ExplanationProps> = (props) => {
  let { classes, title } = props;
  return (
    <div>
      {title}
      <div>{props.children}</div>
    </div>
  );
};

export default withStyles(styles)(Explanation);
