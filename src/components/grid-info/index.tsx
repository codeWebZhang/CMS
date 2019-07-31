import * as React from 'react';
import { Row, Col } from 'antd';
import { withStyles } from '@material-ui/styles';
import classNames from 'classnames';
interface IGridInfoProps {
  classes;
}
interface IGridInfoItemProps {
  title;
  content;
  span;
  classes;
  lb?;
  mode?;
}
const styledBy: any = (property, mapping) => (props) => mapping[props[property]];
const styles: any = (theme) => {
  return {
    root: {
      borderTop: `1px solid ${theme.palette.gray2}`
    },
    item: {
      display: styledBy('span', {
        '2': 'flex'
      }),
      clear: styledBy('span', {
        '2': 'both'
      })
    },
    title: {
      border: `1px solid ${theme.palette.gray2}`,
      background: theme.palette.gray3,
      borderTop: `0px`,
      padding: `${theme.padding.sm} ${theme.padding.ls}`,
      borderLeft: styledBy('lb', {
        none: '0px'
      }),
      fontWeight: 'bold',
      minHeight: '30px',
      display: 'flex',
      alignItems: 'center'
    },
    content: {
      minHeight: '30px',
      border: `1px solid ${theme.palette.gray2}`,
      borderLeft: `0px`,
      borderTop: `0px`,
      padding: `${theme.padding.sm} ${theme.padding.ls}`,
      '& input': {
        border: '0px !important'
      },
      '& .ant-input-number': {
        border: '0px !important'
      },
      '& .ant-select-selection': {
        border: '0px !important'
      },
      '& textarea': {
        border: '0px !important',
        paddingLeft: '7px'
      }
    },
    editBorder: {
      '&:hover, &:active, &:focus': {
        boxShadow: `inset 0px 0px 1px 1px ${theme.palette.blue}`
      }
    }
  };
};

const GridInfoComponent: React.FunctionComponent<IGridInfoProps> = (props) => {
  return <Row className={props.classes.root}>{props.children}</Row>;
};

const GridInfoItemComponent: React.FunctionComponent<IGridInfoItemProps> = (props) => {
  let _spanR = 18;
  let _spanT = 6;
  if (props.span == 1) {
    _spanR = 6;
  }
  if (props.span == 3) {
    _spanT = 3;
    _spanR = 5;
  }
  if (props.span == 13) {
    _spanT = 3;
    _spanR = 13;
  }

  let contentCls = classNames(props.classes.content, {
    [props.classes.editBorder]: props.mode == 'edit'
  });
  return (
    <div className={props.classes.item}>
      <Col span={_spanT} className={props.classes.title}>
        {props.title}
      </Col>
      <Col span={_spanR} className={contentCls}>
        {props.content}
      </Col>
    </div>
  );
};
const GridInfo = withStyles(styles)(GridInfoComponent);
const GridInfoItem = withStyles(styles)(GridInfoItemComponent);

export { GridInfo, GridInfoItem };
