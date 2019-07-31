import * as React from 'react';
import { withStyles } from '@material-ui/styles';
import classNames from 'classnames';
import { Pagination as AntPagination } from 'antd';

const styledBy: any = (property, mapping) => (props) => mapping[props[property]];

const styles: any = (theme) => {
  return {
    paginationBox: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      paddingTop: theme.padding.xs,
      paddingBottom: theme.padding.xs,
      backgroundColor: styledBy('skin', {
        light: theme.palette.gray3,
        dark: theme.palette.gray
      }),
      borderLeft: styledBy('skin', {
        light: `1px solid ${theme.palette.gray2}`,
        dark: `1px solid ${theme.palette.gray2}`
      }),
      borderRight: styledBy('skin', {
        light: `1px solid ${theme.palette.gray2}`,
        dark: `1px solid ${theme.palette.gray2}`
      }),
      borderBottom: styledBy('skin', {
        light: `1px solid ${theme.palette.gray2}`,
        dark: `1px solid ${theme.palette.gray2}`
      }),
      '&  .ant-pagination-simple': {
        color: styledBy('skin', {
          light: theme.font.color.dark,
          dark: theme.font.color.white
        })
      },
      '& .ant-pagination-simple .ant-pagination-prev, .ant-pagination-simple .ant-pagination-next': {
        minWidth: '18px',
        height: '18px',
        lineHeight: '18px',
        color: styledBy('skin', {
          light: theme.font.color.dark,
          dark: theme.font.color.white
        })
      },
      '& .ant-pagination-simple .ant-pagination-simple-pager': {
        height: '18px'
      },
      '& .ant-pagination-prev, .ant-pagination-next, .ant-pagination-jump-prev, .ant-pagination-jump-next': {
        borderRadius: '0px'
      },
      '& .ant-pagination-prev .ant-pagination-item-link': {
        borderRadius: '0px',
        backgroundColor: 'transparent',
        height: '18px'
      },
      '& .ant-pagination-next .ant-pagination-item-link': {
        borderRadius: '0px',
        backgroundColor: 'transparent',
        height: '18px'
      },
      '& .ant-pagination-prev:focus .ant-pagination-item-link, .ant-pagination-next:focus .ant-pagination-item-link, .ant-pagination-prev:hover .ant-pagination-item-link, .ant-pagination-next:hover .ant-pagination-item-link': {
        color: styledBy('skin', {
          light: theme.font.color.dark,
          dark: theme.font.color.white
        })
      },
      '& .ant-pagination-prev a, .ant-pagination-next a': {
        color: styledBy('skin', {
          light: theme.font.color.dark,
          dark: theme.font.color.white
        })
      },
      '& .ant-pagination-simple .ant-pagination-simple-pager input': {
        borderRadius: '3px',
        backgroundColor: styledBy('skin', {
          light: 'transparent',
          dark: theme.palette.white
        }),
        color: styledBy('skin', {
          light: theme.font.color.dark,
          dark: theme.font.color.dark
        }),
        borderColor: styledBy('skin', {
          light: theme.font.color.dark,
          dark: 'transparent'
        })
      },
      '& .ant-pagination-simple .ant-pagination-disabled a, .ant-pagination-simple .ant-pagination-disabled:hover a, .ant-pagination-simple .ant-pagination-disabled:focus a': {
        color: theme.font.color.gray4
      },
      '& .ant-pagination-simple .ant-pagination-disabled .ant-pagination-item-link, .ant-pagination-simple .ant-pagination-disabled:hover .ant-pagination-item-link, .ant-pagination-simple .ant-pagination-disabled:focus .ant-pagination-item-link': {
        color: theme.font.color.gray4
      }
    },
    iconE: {
      minWidth: '18px',
      height: '18px',
      lineHeight: '18px',
      textAlign: 'center',
      color: styledBy('skin', {
        light: theme.font.color.dark,
        dark: theme.font.color.white
      }),
      '&.ml': {
        marginLeft: '5px'
      },
      '&.mr': {
        marginRight: '5px'
      },
      '&:focus': {
        color: styledBy('skin', {
          light: theme.font.color.dark,
          dark: theme.font.color.white
        })
      },
      '&:hover': {
        color: styledBy('skin', {
          light: theme.font.color.dark,
          dark: theme.font.color.white
        })
      },
      '&.disabled': {
        color: theme.font.color.gray4,
        cursor: 'not-allowed'
      },
      '&:focus.disabled': {
        color: theme.font.color.gray4,
        cursor: 'not-allowed'
      },
      '&:hover.disabled': {
        color: theme.font.color.gray4,
        cursor: 'not-allowed'
      }
    }
  };
};

interface PaginationProps {
  classes;
  className?;
  skin?: 'dark' | 'light';
  total;
  current?;
  pageSize?;
  onChange?;
}

class Pagination extends React.Component<PaginationProps, any> {
  state = {
    current: 1,
    pageSize: 10
  };
  componentDidMount() {
    let { current, pageSize } = this.props;
    if (current) {
      this.setState({
        current: current
      });
    }
    if (pageSize) {
      this.setState({
        pageSize: pageSize
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.current !== this.props.current) {
      this.setState({
        current: nextProps.current
      })
    }
  }
  jumpFirst = () => {
    if (this.state.current <= 1) {
      return;
    }
    this.setState({
      current: 1
    });
    if (this.props.onChange) {
      this.props.onChange(1);
    }
  };

  jumpLast = () => {
    let { total } = this.props;
    let { current, pageSize } = this.state;
    if (current >= Math.ceil(total / pageSize)) {
      return;
    }
    this.setState(
      {
        current: Math.ceil(total / pageSize)
      },
      () => {
        if (this.props.onChange) {
          this.props.onChange(this.state.current);
        }
      }
    );
  };

  itemRender = (current, type, originalElement) => {
    if (type === 'prev') {
      return (
        <a className="ant-pagination-item-link">
          <span className="iconfont icon-previous" />
        </a>
      );
    }
    if (type === 'next') {
      return (
        <a className="ant-pagination-item-link">
          <span className="iconfont icon-next" />
        </a>
      );
    }
    return originalElement;
  };

  onChange = (page) => {
    this.setState({
      current: page
    });
    if (this.props.onChange) {
      this.props.onChange(page);
    }
  };

  public render() {
    let {
      classes,
      skin,
      className = '',
      current,
      total,
      onChange,
      pageSize,
      ...other
    } = this.props;
    return (
      <div className={classes.paginationBox}>
        <a
          className={classNames(classes.iconE, {
            mr: true,
            disabled: this.state.current <= 1
          })}
          onClick={this.jumpFirst}
        >
          <span className="iconfont icon-previous_e" />
        </a>
        <AntPagination
          simple
          current={this.state.current}
          pageSize={this.state.pageSize}
          total={total}
          onChange={this.onChange}
          {...other}
          itemRender={this.itemRender}
        />
        <a
          className={classNames(classes.iconE, {
            ml: true,
            disabled: this.state.current >= Math.ceil(total / this.state.pageSize)
          })}
          onClick={this.jumpLast}
        >
          <span className="iconfont icon-next_e" />
        </a>
      </div>
    );
  }
}

export default withStyles(styles)(Pagination);
