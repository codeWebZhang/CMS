import * as React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import { List, Avatar, Button } from 'antd';

import Explanation from '../explanation';

export interface ProductExplanationProps {
  classes;
}

const styles = (theme) => ({
  root: {},
  box: {
    height: '66px',
    padding: '13px 20px',
    backgroundColor: '#F5F4F4',
    border: '1px solid #DDDDDD',
    '& .ant-list-item': {
      padding: '0'
    },
    '& .ant-list-item-meta-title': {
      marginBottom: '3px',
      color: '#555',
      fontSize: '14px',
      height: '20px',
      lineHeight: '20px'
    },
    '& .ant-list-item-meta-description': {
      color: '#555'
    }
  },
  spanMargin: {
    marginRight: '53px'
  }
});
const data = [
  {
    title: '说明',
    product: '产品信息：loT产品的基本属性。',
    fun: '功能定义：产品的普通属性、遥测数据、时间的管理'
  }
];
class ProductExplanation extends React.Component<ProductExplanationProps, any> {
  public render() {
    const { classes } = this.props;
    return (
         <div className={classes.box}>
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  title={item.title}
                  description={<div>
                    <span className={classes.spanMargin}>{item.product}</span><span>{item.fun}</span>
                  </div>}
                />
              </List.Item>
            )}
          />
          </div>
    );
  }
}

const mapState2Props = (state) => {
  return {};
};

export default withStyles(styles)(connect(mapState2Props)(ProductExplanation));
