import { Input as AntInput, Icon, Tooltip, InputNumber as AntInputNumber } from 'antd';
import { withStyles } from '@material-ui/styles';
import classNames from 'classnames';

import * as React from 'react';
const setBorderRadius = (property) => (props) => {
  return props[property] ? props[property] : 0;
};
const styles: any = (theme) => {
  return {
    root: {
      '&.ant-input': {
        color: theme.font.color.dark,
        border: `1px solid ${theme.palette.gray2}`,
        borderRadius: setBorderRadius('borderRadius'),
        '&:hover,&:focus': {
          boxShadow: '0 0 0 0',
          border: `1px solid ${theme.palette.primary}`
        }
      },
      '& .ant-input': {
        color: theme.font.color.dark,
        border: `1px solid ${theme.palette.gray2}`,
        borderRadius: setBorderRadius('borderRadius'),
        '&:hover,&:focus': {
          boxShadow: '0 0 0 0',
          border: `1px solid ${theme.palette.primary}`
        }
      }
    },
    number: {
      '&.ant-input-number': {
        borderRadius: setBorderRadius('borderRadius'),
        color: theme.font.color.dark,
        border: `1px solid ${theme.palette.gray2}`,
        '&:hover,&:focus': {
          boxShadow: '0 0 0 0',
          border: `1px solid ${theme.palette.primary}`
        }
      }
    }
  };
};

interface InputProps {
  classes;
  name?;
  borderRadius?;
  size?;
  className?;
  type?;
  placeholder?;
  value?;
  suffix?;
  prefix?;
  onChange?;
  fref?;
  readonly?;
  style?;
  defaultValue?;
}
interface TextAreaProps {
  classes;
  name?;
  size?;
  className?;
  placeholder?;
  value?;
  defaultValue?;
  onChange?;
  autosize?;
  onPressEnter?;
  rows?;
  fref?;
  style?;
}
interface SearchProps {
  classes;
  size?;
  className?;
  placeholder?;
  enterButton?;
  onSearch?;
  fref?;
  style?;
}
interface PassWordProps {
  classes;
  size?;
  className?;
  suffix?;
  prefix?;
  placeholder?;
  visibilityToggle?;
  fref?;
  style?;
  borderRadius?;
}
interface InputNumberProps {
  classes;
  size?;
  value?;
  className?;
  placeholder?;
  onChange?;
  fref?;
  style?;
  min?;
}
const TextAreaComponent: React.FunctionComponent<TextAreaProps> = (props) => {
  const { classes, className = '', ...other } = props;
  const cls = classNames(classes.root, className);
  return <AntInput.TextArea size="small" className={cls} {...other} />;
};
const TextArea = withStyles(styles)(TextAreaComponent);
const SearchComponent: React.FunctionComponent<SearchProps> = (props) => {
  const { classes, className = '', ...other } = props;
  const cls = classNames(classes.root, className);
  return <AntInput.Search size="small" className={cls} {...other} />;
};
const Search = withStyles(styles)(SearchComponent);

const PassWordComponent: React.FunctionComponent<PassWordProps> = (props) => {
  const { classes, className = '', ...other } = props;
  const cls = classNames(classes.root, className);
  return <AntInput.Password size="small" className={cls} {...other} />;
};
const PassWord = withStyles(styles)(PassWordComponent);

const InputNumberComponent: React.FunctionComponent<InputNumberProps> = (props) => {
  const { classes, className = '', ...other } = props;
  const cls = classNames(classes.number, className);
  return <AntInputNumber size="small" className={cls} {...other} />;
};
const InputNumber = withStyles(styles)(InputNumberComponent);

const Input: React.FunctionComponent<InputProps> = (props) => {
  const { classes, fref, className = '', ...other } = props;
  const cls = classNames(classes.root, className);
  return <AntInput ref={fref} size="small" className={cls} {...other} />;
};

export default withStyles(styles)(Input);
export { TextArea, Search, PassWord, InputNumber };
