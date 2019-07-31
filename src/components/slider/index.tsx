import * as React from 'react';
import { withStyles } from '@material-ui/styles';
import { Slider as SliderBox, Row, Col } from 'antd';
import { InputNumber } from '../input/index';

interface SliderProps {
  classes;
  defaultValue;
  showInputNumber;
  valueName;
}

const styles = (theme) => {
  return {
    root: {},
    valueName: {
      marginLeft: '5px'
    },
    inputNumber: {
      '&.ant-input-number': {
        margin: '6px 0 0 16px',
        borderRadius: '4px'
      }
    }
  };
};

class Slider extends React.Component<SliderProps, any> {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: this.props.defaultValue | 1
    };
  }

  onChange = (value) => {
    this.setState({
      inputValue: value
    });
  };

  public render() {
    let { classes, ...other } = this.props;
    const { inputValue } = this.state;

    return (
      <Row>
        <Col span={other.showInputNumber ? 12 : 16}>
          <SliderBox
            {...other}
            className={classes.SliderBox}
            value={inputValue}
            onChange={this.onChange}
          />
        </Col>
        <Col span={other.showInputNumber ? 4 : 0}>
          <InputNumber
            {...other}
            value={inputValue}
            onChange={this.onChange}
            size={'small'}
            className={classes.inputNumber}
          />
          <span className={classes.valueName} onChange={this.onChange}>
            {other.valueName}
          </span>
        </Col>
      </Row>
    );
  }
}

export default withStyles(styles)(Slider);
