import * as React from 'react';
import { withStyles } from '@material-ui/styles';
import classNames from 'classnames';
import { Upload as AntUpload, Icon as AntIcon, Button } from 'antd';
const AntDragger = AntUpload.Dragger;

const styles: any = (theme) => ({
  root: {
    '& .ant-upload ': {
      float: 'left'
    },
    '& .ant-upload-list': {
      height: '24px',
      float: 'left',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: '14px'
    },
    '& .ant-upload-list-item': {
      color: '#A9A9A9',
      marginTop: '0',
      lineHeight: '22px',
      '& .ant-upload-list-item-name': {
        paddingRight: '10px'
      },
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, .2)',
        color: '#fff'
      }
    },
    '& .ant-btn': {
      border: '1px dashed #ccc',
      color: theme.palette.dark,
      width: '90px'
    }
  }
});
export interface UploadProps {
  classes;
  type?;
  name?: string;
  defaultFileList?;
  fileList?;
  action?;
  directory?: boolean;
  data?;
  headers?;
  showUploadList?;
  multiple?: boolean;
  accept?: string;
  beforeUpload?;
  onChange?;
  listType?;
  className?: string;
  onPreview?;
  onRemove?;
  supportServerRender?: boolean;
  style?: React.CSSProperties;
  disabled?: boolean;
  prefixCls?: string;
  customRequest?;
  withCredentials?: boolean;
  openFileDialogOnClick?: boolean;
  locale?;
  id?: string;
}
export interface DraggerProps extends UploadProps {
  height?: number;
}

const UploadComponent: React.FunctionComponent<UploadProps> = (props) => {
  const { classes, className = '', action, ...other } = props;
  const cls = classNames(classes.root, className);

  return (
    <AntUpload className={cls} action={action} {...other}>
      {props.children && props.children}
      {!props.children && (
        <Button size="small">
          <AntIcon type="upload" /> 上传文件
        </Button>
      )}
    </AntUpload>
  );
};

const Upload = withStyles(styles)(UploadComponent);

const DraggerComponent: React.FunctionComponent<DraggerProps> = (props) => {
  const { classes, className = '', action, ...other } = props;
  const cls = classNames(classes.root, className);
  return (
    <AntDragger className={cls} action={action} {...other}>
      {props.children && props.children}
      {!props.children && <span>将文件拖拽到这里上传</span>}
    </AntDragger>
  );
};

const Dragger = withStyles(styles)(DraggerComponent);

export { Upload, Dragger };
