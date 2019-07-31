import * as React from 'react';
import { Row, Col } from 'antd';
import { withStyles } from '@material-ui/styles';
import classnames from 'classnames';
interface ColorComponentProps {
  classes;
}
const styles = (theme) => {
  return {
    root: {
      marginBottom: '10px'
    },
    card: {
      minHeight: '40px',
      borderRadius: '3px',
      padding: '4px'
    },
    primary: {
      color: theme.palette.primary
    },
    primaryBg: {
      backgroundColor: theme.palette.primary
    },
    secondaryColor: {
      backgroundColor: theme.palette.secondary
    },
    blueColor: {
      backgroundColor: theme.palette.blue
    },
    orangeColor: {
      backgroundColor: theme.palette.orange
    },
    yellowColor: {
      backgroundColor: theme.palette.yellow
    },
    redColor: {
      backgroundColor: theme.palette.red
    },
    greenColor: {
      backgroundColor: theme.palette.green
    },
    white: {
      color: theme.font.color.white
    },
    sm: {
      fontSize: theme.font.size.sm
    },
    dark: {
      color: theme.font.color.dark
    },
    gray: {
      color: theme.font.color.gray
    },
    gray1: {
      color: theme.font.color.gray1
    },
    gray2: {
      color: theme.font.color.gray2
    },
    gray3: {
      color: theme.font.color.gray3
    },
    gray4: {
      color: theme.font.color.gray4
    },
    darkBg: {
      backgroundColor: theme.font.color.dark
    },
    grayBg: {
      backgroundColor: theme.font.color.gray
    },
    gray1Bg: {
      backgroundColor: theme.font.color.gray1
    },
    gray2Bg: {
      backgroundColor: theme.font.color.gray2
    },
    gray3Bg: {
      backgroundColor: theme.font.color.gray3
    },
    gray4Bg: {
      backgroundColor: theme.font.color.gray4
    }
  };
};
const _ColorComponent1: React.FunctionComponent<ColorComponentProps> = ({ classes }) => {
  return (
    <div>
      <Row gutter={4}>
        <Col span={12}>
          <div className={classnames(classes.card, classes.sm, classes.primaryBg, classes.white)}>
            Primary
          </div>
        </Col>
        <Col span={12}>
          <div
            className={classnames(classes.card, classes.sm, classes.secondaryColor, classes.white)}
          >
            Secondary
          </div>
        </Col>
      </Row>
    </div>
  );
};

const _ColorComponent2: React.FunctionComponent<ColorComponentProps> = ({ classes }) => {
  return (
    <div>
      <Row gutter={4}>
        <Col span={4}>
          <div className={classnames(classes.card, classes.sm, classes.blueColor, classes.white)}>
            blue
          </div>
        </Col>
        <Col span={4}>
          <div className={classnames(classes.card, classes.sm, classes.orangeColor, classes.white)}>
            orange
          </div>
        </Col>
        <Col span={4}>
          <div className={classnames(classes.card, classes.sm, classes.yellowColor, classes.white)}>
            yellow
          </div>
        </Col>
        <Col span={4}>
          <div className={classnames(classes.card, classes.sm, classes.redColor, classes.white)}>
            red
          </div>
        </Col>
        <Col span={4}>
          <div className={classnames(classes.card, classes.sm, classes.greenColor, classes.white)}>
            green
          </div>
        </Col>
      </Row>
    </div>
  );
};

const _ColorComponent4: React.FunctionComponent<ColorComponentProps> = ({ classes }) => {
  return (
    <div>
      <Row gutter={4}>
        <Col span={4}>
          <div className={classnames(classes.card, classes.sm, classes.darkBg, classes.white)}>
            dark
            <br />
            #555555
          </div>
        </Col>
        <Col span={4}>
          <div className={classnames(classes.card, classes.sm, classes.grayBg, classes.white)}>
            gray
            <br />
            #666666
          </div>
        </Col>
        <Col span={4}>
          <div className={classnames(classes.card, classes.sm, classes.gray1Bg, classes.white)}>
            gray1-边框颜色
            <br />
            #A9A9A9
          </div>
        </Col>
        <Col span={4}>
          <div className={classnames(classes.card, classes.sm, classes.gray2Bg, classes.dark)}>
            gray2-表格高亮背景
            <br />
            #DDDDDD
          </div>
        </Col>
        <Col span={4}>
          <div className={classnames(classes.card, classes.sm, classes.gray3Bg, classes.dark)}>
            gray3-次要标题背景
            <br />
            #F5F5F5
          </div>
        </Col>
        <Col span={4}>
          <div className={classnames(classes.card, classes.sm, classes.gray4Bg, classes.white)}>
            gray4-元素禁用
            <br />
            #C4C5CD
          </div>
        </Col>
      </Row>
    </div>
  );
};

const _ColorComponent3: React.FunctionComponent<ColorComponentProps> = ({ classes }) => {
  return (
    <div>
      <div className={classnames(classes.primary, classes.sm)}>主标题@primary</div>
      <div className={classnames(classes.dark, classes.sm)}>副标题@dark</div>
      <div className={classnames(classes.gray1, classes.sm)}>描述@gray1</div>
    </div>
  );
};
const ColorComponent1 = withStyles(styles)(_ColorComponent1);
const ColorComponent2 = withStyles(styles)(_ColorComponent2);
const ColorComponent3 = withStyles(styles)(_ColorComponent3);
const ColorComponent4 = withStyles(styles)(_ColorComponent4);
export { ColorComponent1, ColorComponent2, ColorComponent3, ColorComponent4 };
