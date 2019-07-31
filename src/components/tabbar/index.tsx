import { Tabs } from 'antd';
import { withStyles } from '@material-ui/styles';

const TabPane = Tabs.TabPane;

import * as React from 'react';

export interface TabbarProps {
  classes;
}
const styles = (theme) => {
  return {
    root: {
      '& .ant-tabs-nav-wrap': {
        marginBottom: '1px'
      },
      '& .ant-tabs-bar': {
        backgroundColor: '#F2F2F2',
        borderBottom: '1px solid #000000',
        margin: '0',
        '& .ant-tabs-ink-bar': {
          display: 'none !important'
        },
        '& .ant-tabs-tab': {
          height: '29px',
          padding: `${theme.padding.sm} 59px`,
          margin: '0',
          borderRight: '1px solid #BBBBBB !important',
          borderLeft: '1px solid #EEEEEE !important',
          background:
            'linear-gradient(180deg,rgba(239,239,239,1) 0%,rgba(255,255,255,1) 35%,rgba(218,218,218,1) 83%,rgba(208,208,208,1) 100%) !important'
        },
        '& .ant-tabs-tab-active': {
          background: '#FFFFFF !important',
          color: `${theme.font.color.l1}`
        }
      }
    }
  };
};
class Tabbar extends React.PureComponent<TabbarProps, any> {
  public render() {
    let { classes } = this.props;
    return (
      <Tabs className={classes.root} defaultActiveKey="2">
        <TabPane tab="产品列表" key="1" />
        <TabPane tab="选中效果" key="2" />
      </Tabs>
    );
  }
}

export default withStyles(styles)(Tabbar);
