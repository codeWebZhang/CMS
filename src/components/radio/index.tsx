import * as React from 'react';
import { withStyles } from '@material-ui/styles';
import classNames from 'classnames';
import { Radio as AntRadio } from 'antd';
const AntRadioGroup = AntRadio.Group;
const RadioButton = AntRadio.Button;
interface RadioProps {
  classes;
  className?;
  color?;
  value?;
}

interface RadioGroupProps {
  classes;
  className?;
  size?;
  name?;
  defaultValue?;
  onChange?;
  buttonStyle?;
}

const styledBy = (property) => (props) => {
  return props[property];
};
const styles: any = (theme) => {
  return {
    radio: {
      fontSize: theme.font.size.sm,
      '& .ant-radio-inner': {
        borderColor: styledBy('color')
      },
      '& .ant-radio-checked::after': {
        borderColor: styledBy('color')
      },
      '& .ant-radio-inner::after': {
        backgroundColor: styledBy('color')
      },
      '& .ant-radio-disabled .ant-radio-inner': {
        borderColor: `${theme.border.color.l1} !important`,
        backgroundColor: theme.palette.gray5
      },
      '& .ant-radio-wrapper:hover .ant-radio, .ant-radio:hover .ant-radio-inner, .ant-radio-input:focus + .ant-radio-inner': {
        borderColor: styledBy('color')
      }
    },
    radioGroup: {
      '&.ant-radio-group-outline': {
        '& .ant-radio-button-wrapper': {
          borderColor: theme.palette.gray1,
          color: theme.font.color.gray1,
          '&:not(:first-child)::before': {
            backgroundColor: theme.palette.gray1
          },
          '&:not(.ant-radio-button-wrapper-disabled):hover': {
            color: theme.palette.primary
          }
        },
        '& .ant-radio-button-wrapper-checked': {
          color: theme.palette.primary,
          borderColor: theme.palette.primary
        }
      },
      '&.ant-radio-group-solid': {
        '& .ant-radio-button-wrapper': {
          borderColor: theme.palette.gray1,
          color: theme.font.color.gray1,
          '&:not(:first-child)::before': {
            backgroundColor: theme.palette.gray1
          },
          '&:not(.ant-radio-button-wrapper-disabled):hover': {
            color: theme.palette.black
          }
        },
        '& .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled)': {
          borderColor: theme.palette.black,
          color: theme.palette.white,
          backgroundColor: theme.palette.black,
          '&:not(.ant-radio-button-wrapper-disabled):hover': {
            color: theme.palette.white
          }
        }
      }
    }
  };
};

const RadioComponent: React.FunctionComponent<RadioProps> = (props) => {
  let { classes, className = '', ...other } = props;
  const cls = classNames(classes.radio, className);
  return (
    <AntRadio className={cls} {...other}>
      {props.children}
    </AntRadio>
  );
};
const Radio = withStyles(styles)(RadioComponent);

const RadioGroupComponent: React.FunctionComponent<RadioGroupProps> = (props) => {
  let { classes, className = '', ...other } = props;
  const cls = classNames(classes.radioGroup, className);
  return (
    <AntRadioGroup className={cls} {...other}>
      {props.children}
    </AntRadioGroup>
  );
};
const RadioGroup = withStyles(styles)(RadioGroupComponent);

export { Radio, RadioGroup, RadioButton };
