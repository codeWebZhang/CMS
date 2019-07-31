import * as React from 'react';
import { withStyles } from '@material-ui/styles';
import classNames from 'classnames';
import { Card as AntCard } from 'antd';
let AntGrid: any = AntCard.Grid;
const { Meta } = AntCard;
import _ from 'lodash';

interface CardGroupProps {
  classes;
  className?;
}
export interface CardGroupGridProps {
  classes;
  className?;
  column?;
  index?;
  curIndex?;
  title?;
  subTitle?;
  content?;
  hasDelete?;
  titleHasDelete?;
  deleteFn?;
  onClick?;
}
const styledBy: any = (property, mapping) => (props) => mapping[props[property]];
const styles: any = (theme) => {
  return {
    card: {
      '& .ant-card-body': {
        padding: '0 0 1px 0',
        marginRight: '1px'
      },
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
    delBtn: {
      display: 'none',
      '&:hover': {
        cursor: 'pointer'
      }
    },
    title: {
      color: theme.font.color.dark,
      fontWeight: 'bold',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      paddingBottom: '5px'
    },
    titleWarp: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      paddingBottom: '5px',
      display: 'flex',
      justifyContent: 'space-between'
    },
    subTitle: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      paddingBottom: '15px'
    },
    ellipsis: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      width: '100%'
    }
  };
};

const CardGroupGridComponent: React.FunctionComponent<CardGroupGridProps> = (props) => {
  let {
    classes,
    column = 3,
    title,
    subTitle,
    content,
    hasDelete,
    titleHasDelete,
    deleteFn,
    className = '',
    index,
    curIndex,
    ...other
  } = props;
  const cls = classNames(classes.gridStyle, className, {
    active: index && curIndex && index == curIndex
  });

  let clickDelete = (event) => {
    event.stopPropagation();
    if (deleteFn) {
      deleteFn();
    }
  };

  return (
    <AntGrid className={cls} {...other}>
      <div className={classes.contentBox}>
        <div className={classes.titleWarp}>
          <div className={classes.title}>{title}</div>
          {titleHasDelete && (
            <span
              className={classNames(classes.delBtn, 'iconfont', 'icon-del')}
              onClick={clickDelete}
            />
          )}
        </div>
        <div className={classes.subTitle}>{subTitle}</div>
        <div className={classes.footBox}>
          <div className={classes.ellipsis}>{content}</div>
          {hasDelete && (
            <span
              className={classNames(classes.delBtn, 'iconfont', 'icon-del')}
              onClick={clickDelete}
            />
          )}
        </div>
      </div>
    </AntGrid>
  );
};

const CardGroupGrid = withStyles(styles)(CardGroupGridComponent);

const CardGroupComponent: React.FunctionComponent<CardGroupProps> = (props) => {
  let { classes, className = '', ...other } = props;
  const cls = classNames(classes.card, className);
  return (
    <AntCard bordered={false} className={cls} {...other}>
      {props.children}
    </AntCard>
  );
};
const CardGroup = withStyles(styles)(CardGroupComponent);

export { AntCard as Card, AntGrid as Grid, CardGroup, CardGroupGrid, Meta };
