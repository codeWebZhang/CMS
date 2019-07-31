import * as React from 'react';
import { withStyles } from '@material-ui/styles';
import classNames from 'classnames';
import { Card } from 'antd';
let Grid: any = Card.Grid;
import _ from 'lodash';
export interface CardGroupProps {
  classes;
  column;
}
const styledBy: any = (property, mapping) => (props) => mapping[props[property]];
const styles: any = (theme) => {
  return {
    root: {
      '& .ant-card-grid': {
        padding: theme.padding.md
      },
      '& .active': {
        '& .icon-del': {
          display: 'block'
        },
        position: 'relative',
        zIndex: 99,
        boxShadow:
          '1px 0 0 0 #424363, 0 1px 0 0 #424363, 1px 1px 5px 0 #424363, 1px 0 0 0 #424363 inset, 0 1px 0 0 #424363 inset !important'
      }
    },
    gridStyle: {
      width: styledBy('column', {
        2: `${100 / 2}%`,
        3: `${100 / 3}%`,
        4: `${100 / 4}%`
      })
    },
    contentBox: {
      display: 'flex',
      flexDirection: 'column',
      '& p': {
        color: theme.font.color.dark,
        marginBottom: '9px',
        lineHeight: '20px',
        fontSize: '14px'
      },
      cursor: 'pointer'
    },
    footBox: {
      display: 'flex',
      justifyContent: 'space-between',
      fontWeight: '400',
      color: theme.font.color.l2
    },
    itemcon: {
      paddingLeft: theme.padding.sm
    },
    deviceNum: {
      color: theme.palette.red
    },
    time: {
      paddingLeft: theme.padding.xs
    },
    delBtn: {
      display: 'none',
      '&:hover': {
        cursor: 'pointer'
      }
    },
    devicename: {
      color: theme.font.color.dark,
      fontWeight: 'bold'
    }
  };
};

class CardGroup extends React.Component<CardGroupProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: ''
    };
  }
  static defaultProps = {
    column: 3
  };

  setCurrentIndex(index) {
    this.setState({
      currentIndex: index
    });
  }
  renderItem() {
    let { classes } = this.props;
    return (
      <div className={classes.contentBox}>
        <p className={classes.devicename}>
          名称:<span className={classNames(classes.itemcon)}>Product0001</span>
        </p>
        <p>
          设备数量:<span className={classNames(classes.itemcon, classes.deviceNum)}>20</span>
        </p>
        <div className={classes.footBox}>
          <div>
            <span className="iconfont icon-time" />
            <span className={classes.time}>2019-04-25 09:11:45</span>
          </div>
          <span className={classNames(classes.delBtn, 'iconfont', 'icon-del')} />
        </div>
      </div>
    );
  }

  public render() {
    let { classes } = this.props;
    return (
      <section className={classes.root}>
        {_.map([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], (item, index) => {
          let cls = classNames(classes.gridStyle, {
            active: this.state.currentIndex === index
          });
          return (
            <Grid key={index} className={cls} onClick={this.setCurrentIndex.bind(this, index)}>
              {this.renderItem()}
            </Grid>
          );
        })}
      </section>
    );
  }
}

export default withStyles(styles)(CardGroup);
