import * as React from 'react';
import { withStyles } from '@material-ui/styles';
import { Row, Col } from 'antd';
import classnames from 'classnames';

import CustomScrollbars from '../custom-scrollbars';

interface ITwoColProps {
  classes;
  leftChildren;
  rightChildren;
  leftSpan?;
  rightSpan?;
}
const styles = (theme) => {
  return {
    root: {
      height: 'calc(100vh - 82px)',
      maxHeight: 'calc(100vh - 82px)'
    },
    rightLine: {
      borderRight: `1px solid ${theme.palette.dark}`
    }
  };
};

const TwoCol: React.FunctionComponent<ITwoColProps> = ({
  classes,
  leftChildren,
  rightChildren,
  leftSpan,
  rightSpan
}) => {
  return (
    <Row>
      <Col span={leftSpan || 12} className={classnames(classes.root, classes.rightLine)}>
        <CustomScrollbars>{leftChildren}</CustomScrollbars>
      </Col>
      <Col span={rightSpan || 12} className={classes.root}>
        <CustomScrollbars>{rightChildren}</CustomScrollbars>
      </Col>
    </Row>
  );
};

export default withStyles(styles)(TwoCol);
