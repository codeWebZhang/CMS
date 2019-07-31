import * as React from 'react';
import { Card } from 'antd';
import { withStyles } from '@material-ui/styles';

const styles = (theme) => {
  return {
    root: {
      '& .ant-card-head': {
        minHeight: '27px',
        padding: `0 ${theme.padding.sm}`,
        background: theme.palette.widget,
        '& .ant-card-head-title': {
          color: theme.font.color.l1,
          fontSize: theme.font.size.sm,
          padding: `${theme.padding.sm} 0`
        }
      },
      '& .ant-card-extra': {
        padding: '0',
        '& .ant-switch': {
          backgroundColor: theme.palette.secondary,
          borderRadius: '2px',
          '&::after': {
            borderRadius: '2px'
          }
        }
      }
    }
  };
};
const Widget: React.FunctionComponent<any> = ({
  title,
  cover,
  extra,
  actions,
  classes,
  children
}) => {
  return (
    <Card className={classes.root} title={title} actions={actions} cover={cover} extra={extra}>
      {children}
    </Card>
  );
};

export default withStyles(styles)(Widget);
