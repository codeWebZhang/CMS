import * as React from 'react';
import { withStyles } from '@material-ui/styles';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import {
  DeviceListButtons,
  DeviceInfoButtons,
  DeviceGroupButtons,
  DeviceBatchButtons
} from './device-buttons';
import { ProductListButtons } from './product-buttons';
import { AlarmRuleButtons } from './alarm-buttons';
import { ApplicationListButtons } from './application-buttons';
import { UserListButtons, TenantListButtons, RoleListButtons } from './system-buttons';
import { FirmwareListButtons } from './firmware-buttons';
export interface TopBarButtonProps {
  classes;
  match: any;
}
const styles: any = (theme) => {
  return {
    root: {
      lineHeight: 'normal',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  };
};

class TopBarButton extends React.Component<TopBarButtonProps, any> {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static defaultProps = {};

  public render() {
    let { classes, match } = this.props;
    return (
      <div className={classes.root}>
        <Switch>
          <Route path={`${match.url}application/list/info`} component={ApplicationListButtons} />
          {/* <Route path={`${match.url}device/list`} component={DeviceListButtons} />
          <Route path={`${match.url}device/info`} component={DeviceInfoButtons} />
          <Route path={`${match.url}device/batch/info`} component={DeviceBatchButtons} />
          <Route path={`${match.url}device/group/info`} component={DeviceGroupButtons} />
          <Route path={`${match.url}alarm/rule/info`} component={AlarmRuleButtons} />
          <Route path={`${match.url}product/list/info`} component={ProductListButtons} />
          <Route path={`${match.url}system/user/list/info`} component={UserListButtons} />
          <Route path={`${match.url}system/tenant/list/info`} component={TenantListButtons} /> */}
          {/* <Route path={`${match.url}system/role/list`} component={RoleListButtons} /> */}
          {/* <Route path={`${match.url}firmware/list/info`} component={FirmwareListButtons} /> */}
        </Switch>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(TopBarButton));
