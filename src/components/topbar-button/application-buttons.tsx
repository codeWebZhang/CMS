import * as React from 'react';
import Button, { SpecialButton } from '../button';
import _ from 'lodash';

//产品列表topbar按钮

class ApplicationListButtons extends React.Component<any, any> {
  public render() {
    let { history, match } = this.props;
    let base = _.join(_.dropRight(match.url.split('/')), '/');
    return (
      <div>
        <SpecialButton>SDK下载</SpecialButton>
        <SpecialButton>API参考指南</SpecialButton>
      </div>
    );
  }
}
class ApplicationCardButtons extends React.Component<any, any> {
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

export { ApplicationListButtons, ApplicationCardButtons };
