import * as React from 'react';
import Button, { SpecialButton } from '../button';
import _ from 'lodash';

//设备详情topbar按钮
class DeviceInfoButtons extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <SpecialButton>重启</SpecialButton>
        <SpecialButton>校时</SpecialButton>
      </div>
    );
  }
}

//设备列表topbar按钮

class DeviceListButtons extends React.Component<any, any> {
  public render() {
    let { history, match } = this.props;
    let base = _.join(_.dropRight(match.url.split('/')), '/');
    return (
      <Button
        type="primary"
        onClick={() => {
          history.push(`${base}/create`);
        }}
      >
        新增
      </Button>
    );
  }
}

class DeviceGroupButtons extends React.Component<any, any> {
  public render() {
    let { history, match } = this.props;
    let base = _.join(match.url.split('/'), '/');
    return (
      <Button
        type="primary"
        onClick={() => {
          history.push(`${base}/create`);
        }}
      >
        新增
      </Button>
    );
  }
}

class DeviceBatchButtons extends React.Component<any, any> {
  public render() {
    let { history, match } = this.props;
    let base = _.join(match.url.split('/'), '/');
    return (
      <Button
        type="primary"
        onClick={() => {
          history.push(`${base}/create`);
        }}
      >
        新增
      </Button>
    );
  }
}

export { DeviceListButtons, DeviceInfoButtons, DeviceGroupButtons, DeviceBatchButtons };
