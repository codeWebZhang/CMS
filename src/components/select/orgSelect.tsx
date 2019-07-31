import { Select as AntSelect, Icon } from 'antd';
const Option = AntSelect.Option;
import { Select } from './index';
import { withStyles } from '@material-ui/styles';
import classNames from 'classnames';
import _ from 'lodash';
import * as React from 'react';

const styles: any = (theme) => {
  return {
    root: {
      // width: '160px',
      '& .ant-select-selection': {
        color: theme.font.color.dark,
        border: `1px solid ${theme.palette.gray2}`,
        borderRadius: '0px'
      }
    }
  };
};

interface OrgSelectProps {
  classes?;
  className?;
  dataSource?;
  placeholder?;
  onChange;
  value;
}

class OrgSelect extends React.Component<OrgSelectProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
      selected: {}
    };
  }
  handleSearch = (value) => {
    let { dataSource } = this.props;
    let result;

    if (value) {
      result = _.filter(dataSource, function(item) {
        return item.name.indexOf(value) >= 0;
      });
    }
    this.setState({ result });
  };
  handleChange = (value, option) => {
    let { dataSource, onChange } = this.props;
    let selected = {};
    if (option.props['data-id']) {
      selected = _.find(dataSource, (o) => {
        return o.id === option.props['data-id'];
      });
    }
    onChange && onChange(selected);
    this.setState({ selected });
  };
  getData = () => {
    return this.state.selected;
  };
  public render() {
    let { result = [], selected } = this.state;
    let { classes, className = '', placeholder, dataSource, value, ...other } = this.props;
    const cls = classNames(classes.root, className);
    // 根据页面传进来的organizationId过滤被选中的数据，显示该条数据的name
    let selectedItem = selected || {};
    if (value) {
      selectedItem = _.find(dataSource, (o) => {
        return o.id == value;
      });
    }
    const options = result.map((item) => (
      <Option data-id={item.id} key={item.id} value={item.name}>
        {item.name}
      </Option>
    ));
    options.unshift(
      <Option key="" value="">
        全部
      </Option>
    );
    return (
      <Select
        className={cls}
        {...other}
        showSearch
        placeholder={placeholder}
        value={selectedItem.name}
        defaultActiveFirstOption={false}
        showArrow={false}
        onSearch={this.handleSearch}
        onChange={this.handleChange}
        notFoundContent={null}
      >
        {options}
      </Select>
    );
  }
}

export default withStyles(styles)(OrgSelect);
