import * as React from 'react';
import { withStyles } from '@material-ui/styles';
import classNames from 'classnames';
import { Tag as AntTag } from 'antd';

interface TagProps {
  classes;
  className?;
  closable?;
  onClose?;
  color?;
  afterClose?;
  visible?;
}

interface CheckableTagProps {
  classes;
  className?;
  checked?;
  onChange?;
}

const styledBy = (property) => (props) => {
  return props[property];
};
const styles: any = (theme) => {
  return {
    tag: {}
  };
};

const TagComponent: React.FunctionComponent<TagProps> = (props) => {
  let { classes, className = '', ...other } = props;
  const cls = classNames(classes.tag, className);
  return (
    <AntTag className={cls} {...other}>
      {props.children}
    </AntTag>
  );
};

const Tag = withStyles(styles)(TagComponent);

class CheckableTag extends React.PureComponent<CheckableTagProps, any> {
  state = { checked: true };

  handleChange = (checked) => {
    this.setState({ checked });
    if (this.props.onChange) {
      this.props.onChange();
    }
  };

  componentDidMount() {
    if (this.props.hasOwnProperty('checked')) {
      this.setState({ checked: this.props.checked });
    }
  }

  render() {
    return (
      <AntTag.CheckableTag
        {...this.props}
        checked={this.state.checked}
        onChange={this.handleChange}
      />
    );
  }
}

export { Tag, CheckableTag };
