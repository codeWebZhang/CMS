import { Tabs as AntTabs } from 'antd';
import { withStyles } from '@material-ui/styles';

import * as React from 'react';

const styledBy = (property, mapping) => (props) => mapping[props[property]];

const styles: any = (theme) => {
  return {
    root: {
      '& .ant-tabs-bar': {
        borderBottom: `1px solid ${theme.palette.gray}`,
        marginBottom: theme.padding.md
      },
      '& .ant-tabs-tab': {
        width: '80px',
        height: '26px',
        border: `1px solid ${theme.palette.gray}`,
        padding: 0,
        lineHeight: '24px',
        textAlign: 'center',
        margin: '0 0 0 3px',
        color: theme.palette.white,
        backgroundColor: theme.palette.gray
      },
      '& .ant-tabs-tab:nth-child(1)': {
        marginLeft: '12px'
      },
      '& .ant-tabs-tab:hover': {
        color: theme.palette.white
      },
      '& .ant-tabs-tab-active': {
        color: theme.palette.gray,
        backgroundColor: theme.palette.white,
        borderBottom: `2px solid ${theme.palette.gray2}`
      },
      '& .ant-tabs-tab-active:hover': {
        color: theme.palette.gray
      },

      '& .ant-tabs-ink-bar': {
        height: 0
      }
    }
  };
};

interface TabsProps {
  classes;
  tabPosition?;
}

const _Tabs: React.FunctionComponent<TabsProps> = (props) => {
  let { classes, ...other } = props;
  return <AntTabs className={classes.root} {...other} />;
};

const Tabs2 = withStyles(styles)(_Tabs);
const TabPane = AntTabs.TabPane;

export { Tabs2, TabPane };
