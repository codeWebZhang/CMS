import * as React from 'react';
import Button from '../button';
import _ from 'lodash';

//产品列表topbar按钮

class ProductListButtons extends React.Component<any, any> {
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

export { ProductListButtons };
