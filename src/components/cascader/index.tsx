import * as React from 'react';
import { withStyles } from '@material-ui/styles';
import classNames from 'classnames';
import { Cascader as AntCascader } from 'antd';

interface CascaderProps {
  classes;
  className?;
  popupClassName?;
  borderRadius?;
  options?;
  onChange?;
  placeholder?;
  defaultValue?;
  style?;
  value?;
  borderColor?;
  width?;
  fieldNames?;
  disabled?;
}

const styledBy = (property) => (props) => {
  return props[property];
};
const styles: any = (theme) => {
  return {
    cascader: {
      '& .ant-input': {
        color: theme.font.color.dark,
        border: `1px solid  ${theme.palette.gray2}`,
        borderRadius: styledBy('borderRadius'),
        boxShadow: '0 0 white !important'
      },
      '&.fullBox': {
        width: '100%',
        height: '100%',
        '& .ant-input': {
          border: 'none'
        },
        '& .ant-input:focus': {
          border: 'none',
          boxShadow: 'none'
        }
      },
      '&.ant-cascader-picker-disabled': {
        color: theme.font.color.dark,
        background: 'transparent',
        cursor: 'text',
        '& .ant-cascader-picker-arrow': {
          display: 'none'
        }
      },
      '& .ant-input[disabled]': {
        cursor: 'text'
      }
    },
    popup: {
      '&.ant-cascader-menus': {
        borderRadius: styledBy('borderRadius')
      },
      '& .ant-cascader-menu:first-child': {
        borderRadius: styledBy('borderRadius')
      },
      '& .ant-cascader-menu:last-child': {
        borderRadius: styledBy('borderRadius')
      },
      '& .ant-cascader-menu-item': {
        padding: `${theme.padding.xxs} ${theme.padding.ls}`
      },
      '& .ant-cascader-menu-item-expand': {
        paddingRight: '24px'
      },
      '& .ant-cascader-menu-item-active:not(.ant-cascader-menu-item-disabled), .ant-cascader-menu-item-active:not(.ant-cascader-menu-item-disabled):hover': {
        backgroundColor: theme.palette.primary,
        color: theme.palette.white,
        '& .ant-cascader-menu-item-expand-icon': {
          color: theme.palette.white
        }
      },
      '& .ant-cascader-menu-item:hover': {
        backgroundColor: theme.palette.primary,
        color: theme.palette.white,
        '& .ant-cascader-menu-item-expand-icon': {
          color: theme.palette.white
        }
      }
    }
  };
};

const Cascader: React.FunctionComponent<CascaderProps> = (props) => {
  let { classes, borderRadius, className = '', popupClassName = '', ...other } = props;
  const cls = classNames(classes.cascader, className);
  const popupcls = classNames(classes.popup, popupClassName);
  return <AntCascader size="small" className={cls} popupClassName={popupcls} {...other} />;
};

export default withStyles(styles)(Cascader);
