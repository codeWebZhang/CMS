import * as React from 'react';
import { withStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import { Table, Button, Pagination } from 'antd';

import Modal from '../modal';
const confirm = Modal.confirm;

const styles = (theme) => {
  return {
    tableBox: {
      '& .ant-table': {
        color: theme.font.color.l1
      },
      '& .ant-table-bordered .ant-table-body > table': {
        border: `1px solid ${theme.border.color.l1}`,
        borderRight: '0',
        borderBottom: '0'
      },
      '& .ant-table-thead > tr > th': {
        backgroundColor: theme.palette.widget,
        borderBottom: `1px solid ${theme.border.color.l1}`,
        color: theme.font.color.l1,
        fontWeight: 'normal' as 'normal',
        padding: `${theme.padding.sm} 8px`
      },
      '& .ant-table-tbody > tr > td ': {
        borderBottom: `1px solid ${theme.border.color.l1}`,
        padding: `${theme.padding.sm} 8px`
      },
      '& .ant-table-bordered .ant-table-thead > tr > th, .ant-table-bordered .ant-table-tbody > tr > td': {
        borderRight: `1px solid ${theme.border.color.l1}`
      },
      '& .ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td': {
        backgroundColor: theme.font.color.l4
      }
    },
    paginationBox: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      paddingTop: theme.padding.sm,
      paddingBottom: theme.padding.sm,
      backgroundColor: theme.palette.widget,
      borderLeft: `1px solid ${theme.border.color.l1}`,
      borderRight: `1px solid ${theme.border.color.l1}`,
      borderBottom: `1px solid ${theme.border.color.l1}`,
      '& .ant-pagination': {
        color: theme.font.color.l1
      },
      '& .ant-pagination-prev, .ant-pagination-next, .ant-pagination-jump-prev, .ant-pagination-jump-next': {
        color: theme.font.color.l1
      },
      '& .ant-pagination-simple .ant-pagination-simple-pager input': {
        border: `1px solid ${theme.border.color.l2}`,
        backgroundColor: 'transparent'
      },
      '& .ant-pagination-prev .ant-pagination-item-link, .ant-pagination-next .ant-pagination-item-link': {
        backgroundColor: 'transparent'
      }
    },
    iconButton: {
      marginRight: theme.padding.sm,
      backgroundColor: theme.palette.black
    },
    confirmContent: {
      backgroundColor: theme.palette.widget,
      padding: '13px 20px',
      borderRadius: '10px',
      color: theme.font.color.l1
    }
  };
};

export interface ProductTableProps {
  classes;
  history;
  match;
}

class ProductTable extends React.Component<ProductTableProps, any> {
  columns = [
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button
            type="primary"
            size="small"
            className={this.props.classes.iconButton}
            onClick={this.doShowInfo(record)}
          >
            Look
          </Button>
          <Button
            type="primary"
            size="small"
            className={this.props.classes.iconButton}
            onClick={this.showConfirm(record)}
          >
            Delete
          </Button>
        </span>
      )
    },
    {
      title: '产品名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '设备数',
      dataIndex: 'device',
      key: 'device'
    },
    {
      title: '添加时间',
      dataIndex: 'time',
      key: 'time'
    }
  ];

  data = [
    {
      key: '1',
      name: 'John Brown',
      device: 32,
      time: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      device: 42,
      time: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      device: 32,
      time: 'Sidney No. 1 Lake Park'
    }
  ];

  doShowInfo = (record) => (event) => {
    let { history, match } = this.props;
    history.push(`/product/info/${record.key}`);
  };
  showConfirm = (record) => (event) => {
    confirm({
      title: '提示',
      children: (
        <div className={this.props.classes.confirmContent}>
          该产品有关联设备，无法删除，请到 设备管
        </div>
      ),
      okText: '确认',
      cancelText: '取消',
      width: 250,
      onOk() {},
      onCancel() {}
    });
  };

  componentDidMount() {}
  public render() {
    let { classes } = this.props;

    return (
      <div className={classes.tableBox}>
        <Table columns={this.columns} dataSource={this.data} bordered={true} pagination={false} />
        <div className={classes.paginationBox}>
          <Pagination simple defaultCurrent={2} total={50} />
        </div>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(ProductTable));
