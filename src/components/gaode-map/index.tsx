import * as React from 'react';
import { withStyles } from '@material-ui/styles';
import * as _ from 'lodash';
import { Card, Checkbox, Row, Col, Progress } from 'antd';
const CheckboxGroup = Checkbox.Group;
import CommonMap from '../common-map';

declare const AMap;

export interface GaodeMapProps {
  classes;
  height;
  data?;
  isScale?;
  mapLevel?;
  wh?;
  progressDate?;
  initCenter?;
  center?;
  isCluster?;
  showLoading?;
  selfStyle?;
  showOverView?;
  touchDelay?;
}

const transVh = (v) => {
  return (v / 810) * 100 + 'vh';
};
const transVw = (v) => {
  return (v / 1440) * 100 + 'vw';
};
const delayTime = 5;

const styles: any = (theme) => {
  return {
    root: {
      display: 'flex',
      justifyContent: 'center',
      // height: '465px',
      // border: '1px solid #dddddd',
      position: 'relative',
      '& .amap-logo': {
        display: 'none !important;'
      },
      '& .amap-toolbar': {
        zIndex: '50 !important'
      },
      '& .amap-copyright': {
        display: 'none !important;'
      },
      '& .amap-touch-toolbar .amap-zoomcontrol': {
        transform: 'rotate(90deg)',
        position: 'absolute',
        right: '18px',
        bottom: '-125px',
        zIndex: 50,
        width: '26px',
        backgroundColor: 'transparent',
        borderRadius: 0,
        boxShadow: 'none',
        border: 'none'
      },
      '& .amap-touch-toolbar .amap-zoomcontrol:after': {
        display: 'none'
      },
      '& .amap-zoom-touch-minus': {
        background: '#ffffff',
        border: '1px solid #555555',
        height: '27px',
        width: '19px',
        '& >div': {
          transform: 'rotate(90deg)'
        }
      },
      '& .amap-zoom-touch-plus>div, .amap-zoom-touch-minus>div': {
        lineHeight: '22px',
        fontSize: '16px'
      },
      '& .amap-zoom-touch-plus': {
        background: '#ffffff',
        border: '1px solid #555555',
        height: '27px',
        width: '19px'
      },
      '& .amap-overviewcontrol': {
        width: `${transVh(120)} !important`,
        height: `${transVh(120)} !important`
      },
      '& .infoBox': {
        boxShadow: '2px 2px 10px #888888',
        position: 'relative'
      },
      '& .amap-info-content': {
        minHeight: '240px',
        width: '200px',
        boxShadow: '2px 2px 9px #aaaaaa',
        '& .device': {
          borderBottom: '1px solid #cccccc',
          padding: '10px',
          display: 'flex',
          '& .img': {
            width: '45px',
            height: '55px',
            background: '#cccccc'
          },
          '& .info': {
            marginLeft: '10px',
            flex: 1,
            '& >div': {
              marginBottom: '5px'
            }
          }
        },
        '& .baseInfo': {
          padding: '16px 10px 5px',
          '& >div': {
            marginBottom: '8px'
          }
        }
      },
      '& .amap-info-content:hover': {
        boxShadow: '2px 2px 9px #9d9d9d'
      }
    },
    rootDark: {
      '& .amap-info-content': {
        background: 'linear-gradient(180deg,rgba(27,62,111,1) 0%,rgba(31,79,116,0.8) 100%)',
        border: '1px solid',
        borderImage:
          'linear-gradient(137deg, rgba(110,161,214,1), rgba(66,88,138,1), rgba(134,193,255,1), rgba(56,95,133,1)) 1 1',
        boxShadow: '2px 2px 9px rgba(0,0,0,0.3)',
        color: '#ffffff',
        '& .device': {
          borderBottom: '1px solid #4F70A3'
        }
      },
      '& .amap-info-content:hover': {
        boxShadow: '2px 2px 9px rgba(0,0,0,0.8)'
      }
    },
    amapScale: {
      '& .amap-info': {
        '& >div': {
          transform: `scale(${window.innerHeight / 810})`,
          transformOrigin: 'left'
        }
      }
    },
    amap: {},
    content: {
      flex: 'auto',
      minHeight: '0'
    },
    checkBoardScale: {
      transform: `scale(${window.innerHeight / 810})`,
      transformOrigin: 'top right',
      position: 'absolute',
      width: '155px',
      height: '150px',
      zIndex: 10,
      top: transVh(6),
      right: transVw(6),
      padding: '15px 10px',
      '& .ant-card-body': {
        padding: 0
      }
    },
    checkBoard: {
      position: 'absolute',
      width: '155px',
      height: '150px',
      zIndex: 10,
      top: '6px',
      right: '6px',
      padding: '15px 10px',
      '& .ant-card-body': {
        padding: 0
      }
    },
    checkBoardDarkScale: {
      transform: `scale(${window.innerHeight / 810})`,
      transformOrigin: 'top right',
      position: 'absolute',
      width: '155px',
      height: '150px',
      zIndex: 10,
      top: transVh(6),
      right: transVw(6),
      background: 'rgba(5,16,50,0.8)',
      borderColor: '#244674',
      padding: '15px 10px',
      '& .ant-card-body': {
        padding: 0
      },
      '& .ant-checkbox-inner': {
        backgroundColor: 'transparent',
        borderColor: '#ffffff'
      },
      '& .ant-checkbox-wrapper-checked': {
        '& .ant-checkbox-inner': {
          backgroundColor: '#ffffff',
          borderColor: '#ffffff',
          '&:after': {
            borderColor: `#051032 !important`
          }
        }
      },
      '& .ant-checkbox-wrapper:hover .ant-checkbox-inner, .ant-checkbox:hover .ant-checkbox-inner, .ant-checkbox-input:focus + .ant-checkbox-inner': {
        borderColor: '#ffffff'
        // backgroundColor: '#ffffff'
      }
    },
    checkBoardDark: {
      position: 'absolute',
      width: '155px',
      height: '150px',
      zIndex: 10,
      top: '6px',
      right: '6px',
      background: 'rgba(5,16,50,0.8)',
      borderColor: '#244674',
      padding: '15px 10px',
      '& .ant-card-body': {
        padding: 0
      },
      '& .ant-checkbox-inner': {
        backgroundColor: 'transparent',
        borderColor: '#efefef'
      }
    },
    progressBox: {
      // marginBottom: 10,
      position: 'relative',
      '& .ant-progress-inner': {
        borderRadius: 0,
        backgroundColor: '#ffffff'
      },
      '& .ant-progress-bg': {
        borderRadius: '0 !important',
        height: '22px !important'
      },
      '& .ant-progress-status-active .ant-progress-bg::before': {
        borderRadius: '0 !important'
      }
    },
    progressText: {
      position: 'absolute',
      left: '8px',
      top: '3px',
      zIndex: 11
    },
    progressTextDark: {
      position: 'absolute',
      left: '8px',
      top: '3px',
      zIndex: 11,
      color: '#fefefe'
    },
    progressBoxDark: {
      // marginBottom: 10,
      position: 'relative',
      '& .ant-progress-inner': {
        borderRadius: 0,
        backgroundColor: 'rgba(0,0,0,0)'
      },
      '& .ant-progress-bg': {
        borderRadius: '0 !important',
        height: '22px !important'
      },
      '& .ant-progress-status-active .ant-progress-bg::before': {
        borderRadius: '0 !important'
      }
    },
    loading: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 99,
      backgroundColor: 'rgba(255,255,255,0.8)',
      '& img': {
        width: '30%'
      }
    }
  };
};

class GaodeMap extends React.PureComponent<GaodeMapProps, any> {
  map: any = {};
  infoWindow: any = {};
  markers = [];
  cluster: any;
  mapTimer: any = true;
  timer: any;
  counter: number = 0;
  transVh = (v) => {
    return v * (window.innerHeight / 810);
  };
  constructor(props) {
    super(props);
    this.state = {
      center: this.props.initCenter ? this.props.initCenter : [116.397428, 39.90923],
      basePoints: this.props.data,
      points: this.props.data,
      loading: this.props.showLoading,
      mapLevel: this.props.mapLevel ? this.props.mapLevel : 11
    };
  }
  componentDidMount() {
    let styleTag = document.createElement('style');
    styleTag.type = 'text/css';
    let keyFrames =
      '\
@keyframes myAnimation {\
    0% {transform:scale(1);opacity:1;}\
    100% {transform:scale(1.5);opacity:0;}\
}\
';
    styleTag.innerHTML = keyFrames;
    document.getElementsByTagName('head')[0].appendChild(styleTag);
    this.map = new AMap.Map('amapContainer', {
      resizeEnable: true, //是否监控地图容器尺寸变化
      zoom: this.props.mapLevel ? this.props.mapLevel : 11, //初始化地图层级
      center: this.state.center, //初始化地图中心点
      scrollWheel: false
    });

    if (this.props.selfStyle) {
      this.map.setMapStyle(`amap://styles/${this.props.selfStyle}`);
    }

    if (this.props.touchDelay) {
      this.timer = setInterval(() => {
        this.counter++;
      }, 1000);
    }

    AMap.plugin(['AMap.ToolBar'], () => {
      // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
      let toolbar = new AMap.ToolBar({
        liteStyle: true,
        position: 'RB'
      });
      toolbar.on('zoomchanged', () => {
        this.setState({ mapLevel: this.map.getZoom(), center: this.map.getCenter() });
        this.infoWindow.close();
        this.counter = 0;
      });
      this.map.addControl(toolbar);
    });

    this.map.on('dragend', () => {
      this.setState({ center: this.map.getCenter() });
      this.counter = 0;
    });
    this.map.on('click', () => {
      this.counter = 0;
    });

    if (this.props.showOverView) {
    }

    this.map.on('complete', () => {
      this.addPointToMap(this.map);
      // 地图图块加载完成后触发
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.state.basePoints) {
      this.setState({
        basePoints: JSON.parse(JSON.stringify(nextProps.data))
      });
    }
    if (this.props.center && nextProps.center !== this.props.center && this.counter >= delayTime) {
      // if (nextProps.data !== this.props.data) {
      // this.map.remove(this.map.getAllOverlays('marker'));
      // this.setState({ points: nextProps.data }, () => {
      //   this.addPointToMap(this.map);
      // });
      // }
      const pointArray = this.props.selfStyle
        ? [
            './assets/images/icon-point-green-dark.svg',
            './assets/images/icon-point-blue-dark.svg',
            './assets/images/icon-point-yellow-dark.svg',
            './assets/images/icon-point-red-dark.svg'
          ]
        : [
            './assets/images/icon-point-green.svg',
            './assets/images/icon-point-blue.svg',
            './assets/images/icon-point-yellow.svg',
            './assets/images/icon-point-red.svg'
          ];
      const transVh = (v) => {
        return v * (window.innerHeight / 810);
      };

      // let _marker = _.find(this.markers,(o)=>{return o.deviceInfo.id == nextProps.center.deviceInfo.id})
      let marker = this.markers[nextProps.center.deviceInfo.id - 1];
      let icon = new AMap.Icon({
        size:
          window.innerWidth >= 1440
            ? this.props.isScale
              ? new AMap.Size(transVh(32), transVh(32))
              : new AMap.Size(32, 32)
            : new AMap.Size(32, 32), // 图标尺寸
        image: pointArray[nextProps.center.type], // Icon的图像
        // imageOffset: new AMap.Pixel(0, -60),  // 图像相对展示区域的偏移量，适于雪碧图等
        imageSize:
          window.innerWidth >= 1440
            ? this.props.isScale
              ? new AMap.Size(transVh(32), transVh(32))
              : new AMap.Size(32, 32)
            : new AMap.Size(32, 32) // 根据所设置的大小拉伸或压缩图片
      });
      marker.setIcon(icon);

      this.map.panTo([nextProps.center.address[0], nextProps.center.address[1]]);
      this.map.setZoom(17);
      this.setState({
        mapLevel: 17,
        center: [nextProps.center.address[0], nextProps.center.address[1]]
      });
      this.infoWindow.setContent(this.getWindowContent(nextProps.center));
      this.infoWindow.open(this.map, [nextProps.center.address[0], nextProps.center.address[1]]);
    }
  }

  componentWillUnmount() {
    this.map.destroy();
    clearInterval(this.timer);
  }

  getWindowContent(point) {
    const warringArray = this.props.selfStyle
      ? [
          `<div><span style='width:8px;height:8px;border-radius:5px;background:#0DB37C;margin-right:5px;display:inline-block'></span>正常</div>`,
          `<div><span style='width:8px;height:8px;border-radius:5px;background:#0F93EA;margin-right:5px;display:inline-block'></span>一般告警</div>`,
          `<div><span style='width:8px;height:8px;border-radius:5px;background:#FF8C00;margin-right:5px;display:inline-block'></span>严重告警</div>`,
          `<div><span style='width:8px;height:8px;border-radius:5px;background:#E70864;margin-right:5px;display:inline-block'></span>紧急告警</div>`
        ]
      : [
          `<div><span style='width:8px;height:8px;border-radius:5px;background:#05C400;margin-right:5px;display:inline-block'></span>正常</div>`,
          `<div><span style='width:8px;height:8px;border-radius:5px;background:#02A7F0;margin-right:5px;display:inline-block'></span>一般告警</div>`,
          `<div><span style='width:8px;height:8px;border-radius:5px;background:#FF9000;margin-right:5px;display:inline-block'></span>严重告警</div>`,
          `<div><span style='width:8px;height:8px;border-radius:5px;background:#FF0000;margin-right:5px;display:inline-block'></span>紧急告警</div>`
        ];
    let content = `
    <div>
      <div class='device'>
        <div class='img---'></div>
        <div class='info'>
          <div style='font-weight:500'>${point.deviceInfo.name}</div>
          <div>${point.deviceInfo.type}</div>
          <div>${warringArray[point.type]}</div>
        </div>
      </div>
      <div class='baseInfo'>
        <div>基本信息</div>
        <div>当前状态： ${point.deviceInfo.state}</div>
        <div>所属机构： ${point.deviceInfo.organization}</div>
      </div>
      <a style='margin-left:10px'>查看更多  >></a>
    </div>`;
    return content;
  }

  addPointToMap(map) {
    const pointArray = this.props.selfStyle
      ? [
          './assets/images/icon-point-green-dark.svg',
          './assets/images/icon-point-blue-dark.svg',
          './assets/images/icon-point-yellow-dark.svg',
          './assets/images/icon-point-red-dark.svg'
        ]
      : [
          './assets/images/icon-point-green.svg',
          './assets/images/icon-point-blue.svg',
          './assets/images/icon-point-yellow.svg',
          './assets/images/icon-point-red.svg'
        ];
    const transVh = (v) => {
      return v * (window.innerHeight / 810);
    };

    this.infoWindow = new AMap.InfoWindow({
      anchor: 'middle-left',
      offset:
        window.innerWidth >= 1440 && this.props.isScale
          ? new AMap.Pixel(transVh(20), -transVh(16))
          : new AMap.Pixel(20, -16),
      closeWhenClickMap: true
    });

    const markerClick = (e) => {
      this.infoWindow.setContent(e.target.content);
      this.infoWindow.open(map, e.target.getPosition());
    };

    let points = this.state.points;
    if (points.length == 0) {
      this.setState({ loading: false });
    }
    for (let i = 0; i < points.length; i++) {
      let icon = new AMap.Icon({
        size:
          window.innerWidth >= 1440
            ? this.props.isScale
              ? new AMap.Size(transVh(32), transVh(32))
              : new AMap.Size(32, 32)
            : new AMap.Size(32, 32), // 图标尺寸
        image: pointArray[points[i].type], // Icon的图像
        // imageOffset: new AMap.Pixel(0, -60),  // 图像相对展示区域的偏移量，适于雪碧图等
        imageSize:
          window.innerWidth >= 1440
            ? this.props.isScale
              ? new AMap.Size(transVh(32), transVh(32))
              : new AMap.Size(32, 32)
            : new AMap.Size(32, 32) // 根据所设置的大小拉伸或压缩图片
      });
      let marker = new AMap.Marker({
        map: map,
        position: [points[i].address[0], points[i].address[1]],
        // icon: pointArray[points[i].type],
        icon: icon,
        // imageSize: new AMap.Size(transVh(32), transVh(32)),
        // animation: points[i].type == 3 ? 'AMAP_ANIMATION_BOUNCE' : 'AMAP_ANIMATION_NONE',
        offset:
          window.innerWidth >= 1440
            ? this.props.isScale
              ? new AMap.Pixel(-transVh(15), -transVh(32))
              : new AMap.Pixel(-15, -32)
            : new AMap.Pixel(-15, -32)
      });

      marker.content = this.getWindowContent(points[i]);
      marker.on('click', markerClick);
      // marker.emit('click', { target: marker });
      this.markers.push(marker);
      if (i == points.length - 1) {
        // map.setZoom(map.getZoom()+1)
        setTimeout(() => {
          this.setState({ loading: false });
          this.mapTimer = false;
        }, 500);
      }
    }
    this.props.isCluster ? this.addCluster(1) : null;
  }

  _renderClusterMarker = (context) => {
    let factor = Math.pow(context.count / this.markers.length, 1 / 18);
    let div = document.createElement('div');
    let Hue = 180 - factor * 180;
    // let bgColor = 'hsla(' + Hue + ',100%,50%,0.7)';
    // let fontColor = 'hsla(' + Hue + ',100%,20%,1)';
    // let borderColor = 'hsla(' + Hue + ',100%,40%,1)';
    // let shadowColor = 'hsla(' + Hue + ',100%,50%,1)';
    let bgColor = 'rgba(15, 147, 234, 0.95)';
    let fontColor = '#ffffff';
    // let borderColor = 'hsla(' + Hue + ',100%,40%,1)';
    let shadowColor = 'hsla(' + Hue + ',100%,50%,1)';
    div.style.backgroundColor = bgColor;

    let size = Math.round(
      this.transVh(20) + Math.pow(context.count / this.markers.length, 1 / 5) * this.transVh(20)
    );
    div.style.width = div.style.height = size + 'px';
    // div.style.transform = 'translate(-50%,-50%)';
    // div.style.border = 'solid 1px ' + borderColor;
    div.style.borderRadius = '50%';
    div.style.boxShadow = '0 0 1px ' + shadowColor;
    div.innerHTML = context.count;
    div.style.lineHeight = size + 'px';
    div.style.color = fontColor;
    div.style.fontSize = `${this.transVh(14)}px`;
    div.style.textAlign = 'center';
    div.style.position = 'relative';
    let innderDiv = document.createElement('div');
    innderDiv.style.width = innderDiv.style.height = size + 'px';
    innderDiv.style.border = `${this.transVh(1.5)}px solid rgba(15, 147, 234, 1)`;
    innderDiv.style.background =
      'radial-gradient(rgba(15, 147, 234, 0.1) 50%,rgba(15, 147, 234, 1) 95%)';
    innderDiv.style.borderRadius = '50%';
    innderDiv.style.backgroundOrigin = 'content-box';
    innderDiv.style.padding = `${this.transVh(1.5)}px`;
    innderDiv.style.color = fontColor;
    innderDiv.style.animation = 'myAnimation 1.9s infinite';
    innderDiv.style.zIndex = '1';
    innderDiv.style.position = 'absolute';
    innderDiv.style.top = '0';
    // innderDiv.innerHTML = context.count;
    // innderDiv.style.lineHeight = size + 'px';
    div.appendChild(innderDiv);
    context.marker.setOffset(new AMap.Pixel(-size / 2, -size / 2));
    context.marker.setContent(div);
  };

  addCluster(tag) {
    if (this.cluster) {
      this.cluster.setMap(null);
    }
    if (tag == 1) {
      //完全自定义
      this.cluster = new AMap.MarkerClusterer(this.map, this.markers, {
        gridSize: 150,
        renderClusterMarker: this._renderClusterMarker.bind(this)
      });
    } else {
      //默认样式
      this.cluster = new AMap.MarkerClusterer(this.map, this.markers, { gridSize: 80 });
    }
  }

  onCheckboxChange(checkedValues) {
    let fmtPoint = _.filter(this.state.basePoints, (o) => {
      return _.indexOf(checkedValues, o.type) > -1;
    });
    this.infoWindow.setContent(null);
    this.infoWindow.close();
    this.counter = 0;
    this.map.setZoom(6);
    this.map.remove(this.map.getAllOverlays('marker'));
    if (this.props.isCluster) {
      this.markers = [];
    }

    // this.map.clearMap();
    this.setState(
      {
        points: fmtPoint,
        loading: true
      },
      () => {
        this.addPointToMap(this.map);
      }
    );
  }

  public render() {
    let { classes } = this.props;
    let progressDate = this.props.progressDate
      ? this.props.progressDate
      : { normal: 26.9, commonly: 21.2, serious: 19.5, urgent: 8.3 };
    return (
      <div
        className={classes.root}
        style={{ height: this.props.isScale ? transVh(this.props.height) : this.props.height }}
      >
        <div
          className={this.props.selfStyle ? classes.rootDark : null}
          style={{ height: '100%', width: '100%' }}
        >
          {this.state.loading ? (
            <div className={classes.loading}>
              <img src="./assets/images/map-loading2.gif" />
            </div>
          ) : null}
          <Card
            className={
              this.props.isScale && window.innerWidth >= 1440
                ? this.props.selfStyle
                  ? classes.checkBoardDarkScale
                  : classes.checkBoardScale
                : this.props.selfStyle
                ? classes.checkBoardDark
                : classes.checkBoard
            }
            hoverable={true}
          >
            <Checkbox.Group
              style={{ width: '100%' }}
              onChange={this.onCheckboxChange.bind(this)}
              defaultValue={[0, 1, 2, 3]}
            >
              <Row type="flex" align="middle" style={{ marginBottom: '10px' }}>
                <Col span={4}>
                  <Checkbox value={0} />
                </Col>
                <Col span={20}>
                  <div
                    className={this.props.selfStyle ? classes.progressBoxDark : classes.progressBox}
                  >
                    <div
                      className={
                        this.props.selfStyle ? classes.progressTextDark : classes.progressText
                      }
                    >
                      正常({progressDate.normal}%)
                    </div>
                    <Progress
                      percent={progressDate.normal}
                      showInfo={false}
                      strokeColor={this.props.selfStyle ? '#0DB37C' : '#05C400'}
                      status="active"
                    />
                  </div>
                </Col>
              </Row>
              <Row type="flex" align="middle" style={{ marginBottom: '10px' }}>
                {/*  */}
                <Col span={4}>
                  <Checkbox value={1} />
                </Col>
                <Col span={20}>
                  <div
                    className={this.props.selfStyle ? classes.progressBoxDark : classes.progressBox}
                  >
                    <div
                      className={
                        this.props.selfStyle ? classes.progressTextDark : classes.progressText
                      }
                    >
                      一般告警({progressDate.commonly}%)
                    </div>
                    <Progress
                      percent={progressDate.commonly}
                      showInfo={false}
                      strokeColor={this.props.selfStyle ? '#0F93EA' : '#02A7F0'}
                      status="active"
                    />
                  </div>
                </Col>
              </Row>
              <Row type="flex" align="middle" style={{ marginBottom: '10px' }}>
                <Col span={4}>
                  <Checkbox value={2} />
                </Col>
                <Col span={20}>
                  <div
                    className={this.props.selfStyle ? classes.progressBoxDark : classes.progressBox}
                  >
                    <div
                      className={
                        this.props.selfStyle ? classes.progressTextDark : classes.progressText
                      }
                    >
                      严重告警({progressDate.serious}%)
                    </div>
                    <Progress
                      percent={progressDate.serious}
                      showInfo={false}
                      strokeColor={this.props.selfStyle ? '#FF8C00' : '#FF9000'}
                      status="active"
                    />
                  </div>
                </Col>
              </Row>
              <Row type="flex" align="middle" style={{ marginBottom: '10px' }}>
                <Col span={4}>
                  <Checkbox value={3} />
                </Col>
                <Col span={20}>
                  <div
                    className={this.props.selfStyle ? classes.progressBoxDark : classes.progressBox}
                  >
                    <div
                      className={
                        this.props.selfStyle ? classes.progressTextDark : classes.progressText
                      }
                    >
                      紧急告警({progressDate.urgent}%)
                    </div>
                    <Progress
                      percent={progressDate.urgent}
                      showInfo={false}
                      strokeColor={this.props.selfStyle ? '#E70864' : '#FF0000'}
                      status="active"
                    />
                  </div>
                </Col>
              </Row>
            </Checkbox.Group>
          </Card>
          <div
            className={
              this.props.isScale && window.innerWidth >= 1440 ? classes.amapScale : classes.amap
            }
            style={{ width: '100%', height: '100%' }}
            id="amapContainer"
          />
          {this.props.showOverView && this.state.mapLevel > 15 ? (
            <div
              style={{
                position: 'absolute',
                right: 15,
                bottom: 50,
                border: '3px solid #ffffff',
                boxShadow: '1px 1px 3px rgba(0,0,0,0.5)'
              }}
            >
              <CommonMap
                containerId="dashboard-overview-map"
                dragEnable={false}
                showCenterMarker={true}
                center={this.state.center}
                showScale={false}
                mapLevel={5}
                selfStyle={this.props.selfStyle ? this.props.selfStyle : null}
                height={transVh(130)}
                width={transVh(150)}
              />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(GaodeMap);
