import * as React from 'react';
import { withStyles } from '@material-ui/styles';
import classNames from 'classnames';
import { Select as AntSelect, Spin } from 'antd';
const Option = AntSelect.Option;
const OptGroup = AntSelect.OptGroup;

const styledBy = (property) => (props) => {
  return props[property];
};

const styles: any = (theme) => {
  return {
    select: {
      minWidth: '100px',
      '&>div': {
        boxShadow: '0 0 white !important'
      },
      '& .ant-select-selection': {
        color: theme.font.color.dark,
        border: `1px solid ${theme.palette.gray2}`,
        borderRadius: styledBy('borderRadius')
      }
    },
    option: {
      '&.ant-select-dropdown': {
        borderRadius: styledBy('borderRadius')
      },
      '& .ant-select-dropdown-menu-item': {
        padding: `${theme.padding.xxs} ${theme.padding.ls}`
      },
      '& .ant-select-dropdown-menu-item:first-child': {
        borderRadius: styledBy('borderRadius')
      },
      '& .ant-select-dropdown-menu-item:last-child': {
        borderRadius: styledBy('borderRadius')
      },
      '& .ant-select-dropdown-menu-item-selected, .ant-select-dropdown-menu-item-selected:hover': {
        backgroundColor: theme.palette.primary,
        color: theme.palette.white
      },
      '& .ant-select-dropdown-menu-item-active': {
        backgroundColor: theme.palette.primary,
        color: theme.palette.white
      }
    }
  };
};

export interface SelectProps {
  classes;
  borderRadius?;
  required?;
  prefixCls?: string;
  className?: string;
  showAction?: string | string[];
  size?;
  notFoundContent?: React.ReactNode | null;
  transitionName?: string;
  choiceTransitionName?: string;
  showSearch?: boolean;
  allowClear?: boolean;
  disabled?: boolean;
  showArrow?: boolean;
  style?: React.CSSProperties;
  tabIndex?: number;
  placeholder?: string | React.ReactNode;
  defaultActiveFirstOption?: boolean;
  dropdownClassName?: string;
  dropdownStyle?: React.CSSProperties;
  dropdownMenuStyle?: React.CSSProperties;
  dropdownMatchSelectWidth?: boolean;
  onSearch?;
  getPopupContainer?;
  filterOption?;
  id?: string;
  defaultOpen?: boolean;
  open?: boolean;
  onDropdownVisibleChange?;
  autoClearSearchValue?: boolean;
  dropdownRender?;
  loading?: boolean;
  value?;
  defaultValue?;
  mode?: 'default' | 'multiple' | 'tags' | 'combobox' | string;
  optionLabelProp?: string;
  firstActiveValue?: string | string[];
  onChange?;
  onSelect?;
  onDeselect?;
  onBlur?;
  onFocus?;
  onPopupScroll?;
  onInputKeyDown?;
  onMouseEnter?;
  onMouseLeave?;
  maxTagCount?: number;
  maxTagPlaceholder?;
  optionFilterProp?: string;
  labelInValue?: boolean;
  tokenSeparators?: string[];
  getInputElement?;
  autoFocus?: boolean;
  suffixIcon?: React.ReactNode;
  removeIcon?: React.ReactNode;
  clearIcon?: React.ReactNode;
  menuItemSelectedIcon?: React.ReactNode;
  fref?;
}

const SelectComponent: React.FunctionComponent<SelectProps> = (props) => {
  const { classes, fref, borderRadius, className = '', ...other } = props;
  const cls = classNames(classes.select, className);
  return (
    <AntSelect
      ref={fref}
      size="small"
      className={cls}
      {...other}
      dropdownClassName={classNames(classes.option, other.dropdownClassName)}
    >
      {props.children}
    </AntSelect>
  );
};
const Select = withStyles(styles)(SelectComponent);

export { Select, Option, OptGroup, Spin };
