import * as React from 'react';
import { withStyles } from '@material-ui/styles';
import classNames from 'classnames';
import { Timeline as AntTimeline } from 'antd';

const AntItem = AntTimeline.Item;

interface TimelineProps {
  classes;
  className?;
  mode?;
}

interface TimelineItemProps {
  classes;
  className?;
  dot?;
  color?;
  index?;
  curIndex?;
  hasDelete?;
  deleteFn?;
  clickFn?;
  simple?;
}

const styledBy = (property) => (props) => {
  return props[property];
};
const styles: any = (theme) => {
  return {
    timeline: {
      padding: '5px 18px 0px',
      '&.ant-timeline.ant-timeline-alternate .ant-timeline-item-right .ant-timeline-item-content,&.ant-timeline.ant-timeline-right .ant-timeline-item-right .ant-timeline-item-content': {
        left: '-18px',
        marginLeft: '0px'
      }
    },
    timelineItem: {
      '& .ant-timeline-item-tail': {
        borderLeft: `2px solid ${theme.palette.gray2}`
      },
      '& .ant-timeline-item-head': {
        '& .iconfont': {
          fontWeight: 'bold',
          fontSize: '14px'
        }
      },
      '& .ant-timeline-item-head-blue': {
        color: theme.palette.gray2,
        borderColor: theme.palette.gray2,
        '& .iconfont': {
          color: theme.palette.dark
        }
      },
      '& .ant-timeline-item-content': {
        color: theme.font.color.dark,
        fontWeight: 'bold',
        backgroundColor: theme.palette.gray3,
        padding: '0px',
        border: `1px solid ${theme.palette.gray2}`,
        borderRadius: '4px',
        cursor: 'pointer'
      },
      '& .ant-timeline-item-content:hover': {
        backgroundColor: theme.palette.gray,
        color: theme.font.color.white,
        border: `1px solid ${theme.palette.black}`,
        boxShadow: `0 2px 8px ${theme.palette.gray}`
      },
      '&.ant-timeline-item-last > .ant-timeline-item-content': {
        minHeight: '32px'
      },
      '&.active .ant-timeline-item-content': {
        backgroundColor: theme.palette.gray,
        color: theme.font.color.white,
        border: `1px solid ${theme.palette.black}`,
        boxShadow: `0 2px 8px ${theme.palette.gray}`
      },
      '&.active .icon-close': {
        display: 'block'
      },
      '& .timelineItemContent': { padding: `${theme.padding.sm} ${theme.padding.ls}` }
    },
    simpleTimelineItem: {
      '& .ant-timeline-item-tail': {
        borderLeft: `2px solid ${theme.palette.gray2}`
      },
      '& .ant-timeline-item-head-blue': {
        color: theme.palette.gray2,
        borderColor: theme.palette.gray2,
        '& .iconfont': {
          color: theme.palette.dark
        }
      },
      '& .ant-timeline-item-content': {
        cursor: 'pointer'
      },
      '&.active .icon-close': {
        display: 'block'
      },
      '& .timelineItemContent': { padding: `${theme.padding.xxs} ${theme.padding.ls}` }
    },
    delBtn: {
      display: 'none',
      position: 'absolute',
      top: '-5px',
      right: '-5px',
      width: '16px',
      height: '16px',
      lineHeight: '16px',
      borderRadius: '8px',
      textAlign: 'center',
      backgroundColor: theme.palette.black,
      '&:hover': {
        cursor: 'pointer'
      }
    }
  };
};

const TimelineComponent: React.FunctionComponent<TimelineProps> = (props) => {
  let { classes, className = '', ...other } = props;
  const cls = classNames(classes.timeline, className);
  return (
    <AntTimeline className={cls} {...other}>
      {props.children}
    </AntTimeline>
  );
};
const Timeline = withStyles(styles)(TimelineComponent);

const TimelineItemComponent: React.FunctionComponent<TimelineItemProps> = (props) => {
  let {
    classes,
    className = '',
    index,
    curIndex,
    hasDelete,
    deleteFn,
    clickFn,
    simple,
    ...other
  } = props;
  let cls;
  if (simple) {
    cls = classNames(classes.simpleTimelineItem, className, {
      active: index && curIndex && index == curIndex
    });
  } else {
    cls = classNames(classes.timelineItem, className, {
      active: index && curIndex && index == curIndex
    });
  }

  let clickDelete = (event) => {
    event.stopPropagation();
    if (deleteFn) {
      deleteFn();
    }
  };
  let clickItem = (event) => {
    event.stopPropagation();
    if (clickFn) {
      clickFn();
    }
  };

  return (
    <AntItem className={cls} {...other}>
      <div className="timelineItemContent" onClick={clickItem}>
        {props.children}
      </div>
      {hasDelete && (
        <span
          className={classNames(classes.delBtn, 'iconfont', 'icon-close')}
          onClick={clickDelete}
        />
      )}
    </AntItem>
  );
};
const TimelineItem = withStyles(styles)(TimelineItemComponent);

export { Timeline, TimelineItem };
