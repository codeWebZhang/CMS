import * as React from 'react';
import Button, { SpecialButton } from '../button';
import _ from 'lodash';

//系统管理用户列表topbar按钮

class UserListButtons extends React.Component<any, any> {
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
class TenantListButtons extends React.Component<any, any> {
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
class RoleListButtons extends React.Component<any, any> {
  public render() {
    return <SpecialButton onClick={() => {}}>新增</SpecialButton>;
  }
}

export { UserListButtons, TenantListButtons, RoleListButtons };
