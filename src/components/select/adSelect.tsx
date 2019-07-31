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
      width: '100%',
      '& .ant-select-selection': {
        color: theme.font.color.dark,
        border: `1px solid ${theme.palette.gray2}`,
        borderRadius: '0px'
      }
    }
  };
};

interface AdSelectProps {
  classes?;
  className?;
  dataSource?;
  placeholder?;
  onChange?;
  onSearch?;
}

class AdSelect extends React.Component<AdSelectProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      selected: {}
    };
  }
  handleSearch = (value) => {
    this.props.onSearch && this.props.onSearch(value);
  };
  handleChange = (value, option) => {
    let { dataSource } = this.props;
    let selected = _.find(dataSource, (o) => {
      return o.id === option.props['data-id'];
    });
    this.props.onChange && this.props.onChange(selected);
    this.setState({ selected });
  };
  public render() {
    let { classes, dataSource, className = '', placeholder, ...other } = this.props;
    const cls = classNames(classes.root, className);
    const options = dataSource.map((item) => (
      <Option data-id={item.id} key={item.id} value={item.title}>
        {item.title}
      </Option>
    ));
    return (
      <Select
        className={cls}
        {...other}
        showSearch
        placeholder={placeholder}
        defaultActiveFirstOption={false}
        showArrow={false}
        defaultOpen={true}
        onSearch={this.handleSearch}
        onChange={this.handleChange}
        notFoundContent={null}
      >
        {options}
      </Select>
    );
  }
}

export default withStyles(styles)(AdSelect);
