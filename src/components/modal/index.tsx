import * as React from 'react';
import ReactDOM from 'react-dom';
import { Modal as AntModal, Button } from 'antd';
import { withStyles } from '@material-ui/styles';

const styles: any = (theme) => {
  return {
    root: {
      '& .ant-modal-content': {
        boxShadow: '0px 6px 18px 0px rgba(124,125,127,1)',

        border: '1px solid rgba(221,221,221,1)',
        borderRadius: 0,
        '& .ant-modal-close-x': {
          width: '25px',
          height: '25px',
          lineHeight: '25px',
          color: '#FFFFFFFF',
          '& svg': {
            width: '8px'
          }
        },

        '& .ant-modal-header': {
          height: '25px',
          background: 'rgba(61,71,96,1)',
          borderRadius: 0,
          borderBottom: 0,
          padding: '4px 24px 4px 12px',
          '& .ant-modal-title': {
            fontSize: '12px', //12px
            lineHeight: '17px',
            color: '#FFFFFFFF',
            fontWeight: '400'
          }
        },
        '& .ant-modal-body': { padding: '26px', borderRight: '1px solid #FFFFFFFF' },
        '& .ant-modal-footer': {
          height: '49px',
          borderRight: '1px solid #FFFFFFFF',
          padding: '11px 12px',
          '& button': {
            height: '25px',
            minWidth: '72px'
          }
        }
      }
    },
    cancelBtn: {
      color: '#3d4760'
    },
    footerContanier: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    confirmroot: {
      '& .ant-modal-content': {
        borderRadius: 0
      }
    }
  };
};

// export interface ModalCustomProps {
//   classes;
//   // width;
//   // title;
//   footerLeft;
//   // visible;
//   handleOk;
//   handleCancel;
//   cancelText;
//   okText;
//   // showConfirm;
//   // title;
// }

class ModalCustomComponent extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }
  static defaultProps = {
    width: 520
  };

  handleCancel() {
    this.props.handleCancel;
  }

  render() {
    let {
      classes,
      footerLeft,
      cancelText,
      okText,
      onOk,
      onCancel,
      type,
      ...other
    }: any = this.props;
    let footerHtml = (
      <div className={classes.footerContanier}>
        {footerLeft || <div />}
        <div className={classes.footerBtnGroup}>
          {onOk && (
            <Button key="submit" type="primary" onClick={onOk}>
              {okText || '确认'}
            </Button>
          )}
          {onCancel && type !== 'info' && (
            <Button key="back" onClick={onCancel} className={classes.cancelBtn}>
              {cancelText || '取消'}
            </Button>
          )}
        </div>
      </div>
    );
    return (
      <AntModal
        className={classes.root}
        onOk={onOk}
        onCancel={onCancel}
        footer={footerHtml}
        centered
        {...other}
      >
        {this.props.children}
      </AntModal>
    );
  }
}

export interface ConfirmDialogProps {
  onOk;
  onCancel;
  title;
  content;
  width;
  divElement;
}

class ConfirmDialogComponent extends React.Component<ConfirmDialogProps, any> {
  state = {
    visible: true
  };
  static defaultProps = {
    width: 370,
    title: '提示'
  };
  handleOk() {
    this.clearDivElement();
    this.setState({ visible: false });
    this.props.onOk();
  }
  clearDivElement() {
    let divElement = this.props.divElement;
    const unmountResult = ReactDOM.unmountComponentAtNode(divElement);
    if (unmountResult && divElement.parentNode) {
      divElement.parentNode.removeChild(divElement);
    }
  }

  handleCancel() {
    this.clearDivElement();
    this.setState({ visible: false });
    this.props.onCancel();
  }
  public render() {
    let { title, content, onCancel, onOk, children, divElement, ...other } = this.props;
    let childrenCustom = children ? (
      children
    ) : (
      <div className="ant-modal-confirm-body">
        <i
          aria-label="icon: question-circle"
          className="anticon anticon-question-circle"
          style={{ color: '#faad14' }}
        >
          <svg
            viewBox="64 64 896 896"
            className=""
            data-icon="question-circle"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
            <path d="M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0 1 30.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1 0 80 0 40 40 0 1 0-80 0z" />
          </svg>
        </i>
        <span className="ant-modal-confirm-title">{title}</span>
        <div className="ant-modal-confirm-content">{content}</div>
      </div>
    );
    return (
      <ModalCustomComponent
        onOk={onOk && this.handleOk.bind(this)}
        onCancel={onCancel && this.handleCancel.bind(this)}
        visible={this.state.visible}
        // width={width}
        children={childrenCustom}
        title={title}
        {...other}
      />
    );
  }
}

const ConfirmDialog = withStyles(styles)(ConfirmDialogComponent);
const ModalCustom = withStyles(styles)(ModalCustomComponent);

class Modal extends React.Component<any, any> {
  static confirm = (params) => {
    var div = document.createElement('div');
    document.body.appendChild(div);
    function render() {
      ReactDOM.render(<ConfirmDialog divElement={div} {...params} />, div);
    }
    render();
  };
  static info = (params) => {
    var div = document.createElement('div');
    document.body.appendChild(div);
    function render() {
      ReactDOM.render(<ConfirmDialog divElement={div} {...params} />, div);
    }
    render();
  };

  public render() {
    return <ModalCustom {...this.props} />;
  }
}

export default Modal;
