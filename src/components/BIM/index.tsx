import { withStyles } from '@material-ui/styles';
import * as React from 'react';
// declare const AMap: any;
declare const window: any;
const BimfaceSDKLoaderConfig: any = window.BimfaceSDKLoaderConfig;
const BimfaceConfigrationOption: any = window.BimfaceConfigrationOption;
const BimfaceSDKLoader: any = window.BimfaceSDKLoader;
// declare const Glodon: any;

const styles: any = (theme) => {
  return {
    root: {
      display: 'flex',
      justifyContent: 'center',
      // height: '465px',
      border: `1px solid ${theme.palette.gray2}`,
      position: 'relative',
      '& .bf-loading-gif': {
        display: 'none !important'
      }
    }
  };
};

interface BIMProps {
  classes;
  height?;
  width?;
  containerId?;
  autoRotate?;
  viewToken?;
}

class BIM extends React.Component<BIMProps, any> {
  map: any = {};
  state = {};
  app: any = {};
  viewer3D: any = {};
  timer;
  componentDidMount() {}

  public render() {
    let { classes, height, width, ...other } = this.props;
    return (
      <div
        className={classes.root}
        style={{ height: height ? height : '600', width: width ? width : '600' }}
      >
        <iframe style={{ width: '100%', height: '100%' }} src="./assets/BIM.html" frameBorder="0" />
      </div>
    );
  }
}

export default withStyles(styles)(BIM);
