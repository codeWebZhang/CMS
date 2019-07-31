import { Select as AntSelect } from 'antd';
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

interface DeviceSelectProps {
  classes?;
  className?;
  dataSource?;
  placeholder?;
  onChange;
  value;
  getDevices;
}

class DeviceSelect extends React.Component<DeviceSelectProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      selected: {}
    };
  }
  handleSearch = (value) => {
    let { getDevices } = this.props;
    getDevices && getDevices(value);
  };
  handleChange = (value, option) => {
    let { dataSource, onChange } = this.props;
    let selected = _.find(dataSource, (o) => {
      return o.id === option.props['data-id'];
    });
    onChange && onChange(selected);
    this.setState({ selected });
  };
  getData = () => {
    return this.state.selected;
  };
  public render() {
    let { classes, className = '', placeholder, dataSource = [], value, ...other } = this.props;
    const cls = classNames(classes.root, className);
    const options = dataSource.map((item) => {
      let value = item.displayName
        ? `${item.displayName} ${item.name} ${item.organizationName}`
        : `${item.name} ${item.organizationName}`;
      return (
        <Option data-id={item.id} key={item.id} value={value}>
          {value}
        </Option>
      );
    });
    return (
      <Select
        className={cls}
        {...other}
        showSearch
        placeholder={placeholder}
        value={value}
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

export default withStyles(styles)(DeviceSelect);
