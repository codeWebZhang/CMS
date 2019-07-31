import * as React from 'react';
import { withRouter } from 'react-router';

export interface ScrollToTopProps {
  location;
}

class ScrollToTop extends React.Component<ScrollToTopProps, any> {
  componentDidUpdate(prevProps: any, prevState) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  public render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
