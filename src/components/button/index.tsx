import * as React from 'react';
import { withStyles } from '@material-ui/styles';
import { Button as AntButton } from 'antd';
import classNames from 'classnames';
export interface ButtonProps {
  classes;
  className?;
  color?;
  bgcolor?;
  icon?;
  disabled?;
  type?;
  bordercolor?;
  iconbgcolor?;
  onClick?;
  block?;
  htmlType?;
  size?;
  loading?;
  style?;
}
export interface SpecialButtonProps {
  classes;
  icon?;
  onClick?;
}
// Like https://github.com/brunobertolini/styled-by
const styledBy = (property, mapping) => (props) => mapping[props[property]];

const styles: any = (theme) => {
  return {
    root: {
      '&[disabled]': {
        borderColor: `${theme.font.color.gray4} !important`
      },
      height: '21px',
      //按钮背景色
      background: styledBy('bgcolor', {
        green: theme.palette.secondary,
        primary: theme.palette.primary,
        dark: theme.font.color.black
      }),

      //文字颜色
      color: styledBy('color', {
        white: theme.font.color.white
      }),

      borderColor: styledBy('bgcolor', {
        green: theme.palette.secondary,
        primary: theme.palette.primary,
        dark: theme.font.color.black
      }),
      border: styledBy('disabled', {
        true: `1px solid ${theme.font.color.gray4} !important`
      }),
      '&:hover, &:focus, &:active': {
        background: styledBy('bgcolor', {
          green: '#429e8b',
          dark: '#3a3838',
          primary: theme.palette.primary
        }),
        borderColor: styledBy('bgcolor', {
          green: '#429e8b',
          primary: theme.palette.primary,
          dark: '#3a3838'
        }),
        color: styledBy('bgcolor', {
          green: theme.font.color.white,
          dark: theme.font.color.white
        })
      }
    },
    icon: {
      padding: '0 3.5px !important',
      background: styledBy('iconbgcolor', {
        dark: theme.palette.black
      }),
      borderColor: styledBy('iconbgcolor', {
        dark: theme.palette.black
      })
    },
    special: {
      position: 'relative',
      background: theme.palette.secondary,
      color: theme.font.color.white,
      borderColor: theme.palette.black,
      '&:hover, &:focus, &:active': {
        background: '#429e8b',
        color: theme.font.color.white,
        borderColor: theme.palette.black
      }
    },
    borderDiv: {
      border: '1px solid rgba(255, 255, 255, .2)',
      display: 'inline-block',
      borderRadius: '4px'
    }
  };
};

class Button extends React.Component<ButtonProps, any> {
  public render() {
    const { classes, className = '', color, bgcolor, icon, children, ...other } = this.props;
    let cls = classNames(classes.root, className);
    if (icon) {
      cls = classNames(classes.root, className, classes.icon);
    }
    return (
      <AntButton size="small" className={cls} {...other}>
        {icon ? <span className={`iconfont icon-${icon}`} /> : children}
      </AntButton>
    );
  }
}

class SpecialComponent extends React.Component<SpecialButtonProps, any> {
  public render() {
    const { classes, icon, children, ...other } = this.props;
    let cls = classNames(classes.root, { [classes.icon]: icon }, classes.special);
    return (
      <span className={classes.borderDiv}>
        <AntButton size="small" className={cls} {...other}>
          {icon ? <span className={`iconfont icon-${icon}`} /> : children}
        </AntButton>
      </span>
    );
  }
}
const SpecialButton = withStyles(styles)(SpecialComponent);
export default withStyles(styles)(Button);
export { SpecialButton };
