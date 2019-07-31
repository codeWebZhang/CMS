import { withStyles } from '@material-ui/styles';

import * as React from 'react';
import emitter from '../../utils/emit';
// declare const AMap: any;
declare const window: any;
const AMap = window.AMap;

const styles: any = (theme) => {
  return {
    root: {
      display: 'flex',
      justifyContent: 'center',
      // height: '465px',
      border: `1px solid ${theme.palette.gray2}`,
      position: 'relative',
      '& .amap-logo': {
        display: 'none !important;'
      },
      '& .amap-copyright': {
        display: 'none !important;'
      },
      '& .amap-marker-label': {
        borderColor: theme.palette.dark
      },
      '& .amap-touch-toolbar .amap-zoomcontrol': {
        transform: 'rotate(90deg)',
        position: 'absolute',
        right: '18px',
        bottom: '-125px',
        zIndex: 500,
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
        background: theme.palette.white,
        border: `1px solid ${theme.palette.dark}`,
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
        background: theme.palette.white,
        border: `1px solid ${theme.palette.dark}`,
        height: '27px',
        width: '19px'
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
    }
  };
};

interface CommonMapProps {
  classes;
  height?;
  width?;
  containerId?;
  dragEnable?;
  doubleClickZoom?;
  content?;
  mapLevel?;
  center?;
  showScale?;
  points?;
  showInfoLable?;
  showInfoWindow?;
  customContent?;
  defaultOpen?;
  getAddress?;
  getLnglat?;
  searchValue?;
  selfStyle?;
  showCenterMarker?;
  inputAutocomplete?;
  getInputAutocompletValue?;
}

class CommonMap extends React.Component<CommonMapProps, any> {
  map: any = {};
  infoWindow: any = {};
  geocoder: any = {};
  regeoCodeMarker: any = {};
  centerMarker: any = {};
  eventEmitter;
  eventEmitter2;
  state = {
    points: this.props.points ? this.props.points : []
  };
  componentDidMount() {
    const AMap = window.AMap;
    let {
      mapLevel,
      center,
      containerId,
      getAddress,
      selfStyle,
      getLnglat,
      searchValue
    } = this.props;
    let _Id = containerId ? containerId : 'amapContainer',
      showScale = typeof this.props.showScale == 'boolean' ? this.props.showScale : true;

    this.map = new AMap.Map(_Id, {
      resizeEnable: true, //是否监控地图容器尺寸变化
      zoom: mapLevel ? mapLevel : 11, //初始化地图层级
      center: center ? center : [116.397428, 39.90923], //初始化地图中心点
      scrollWheel: false,
      dragEnable: typeof this.props.dragEnable == 'boolean' ? this.props.dragEnable : true,
      doubleClickZoom: typeof this.props.dragEnable == 'boolean' ? this.props.dragEnable : true
    });
    if (selfStyle) {
      this.map.setMapStyle(`amap://styles/${selfStyle}`);
    }

    if (showScale) {
      AMap.plugin(['AMap.ToolBar'], () => {
        // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
        this.map.addControl(
          new AMap.ToolBar({
            liteStyle: true,
            position: 'RB'
          })
        );
      });
    }

    if (getAddress) {
      this.map.on('click', (e) => {
        this.regeoCode(e.lnglat);
      });
    }

    if (this.state.points.length > 0) {
      this.addPointToMap(this.map);
    }
    this.eventEmitter = emitter.addListener('changeAdSearchMessage', (message, cb) => {
      AMap.plugin('AMap.Autocomplete', () => {
        let autoOptions = {
          city: '全国'
        };
        let autoComplete = new AMap.Autocomplete(autoOptions);
        autoComplete.search(message, (status, result) => {
          cb(result.tips ? result.tips : []);
        });
      });
    });
    this.eventEmitter2 = emitter.addListener('changeMapCenterPoint', (address, cb) => {
      if (!this.centerMarker.CLASS_NAME) {
        this.map.remove(this.map.getAllOverlays('marker'));
        let icon = new AMap.Icon({
          size: new AMap.Size(32, 32), // 图标尺寸
          image: '../../assets/images/icon-point-blue.svg', // Icon的图像
          imageSize: new AMap.Size(32, 32) // 根据所设置的大小拉伸或压缩图片
        });
        this.centerMarker = new AMap.Marker({
          map: this.map,
          position: address,
          icon: icon,
          offset: new AMap.Pixel(-15, -32)
        });
        this.map.add(this.centerMarker);
      }
      this.map.panTo(address);
      this.centerMarker.setPosition(address);
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.searchValue !== this.props.searchValue) {
      this.geoCode(nextProps.searchValue);
    }
    if (this.props.center && nextProps.center !== this.props.center) {
      this.map.panTo(nextProps.center);
      if (this.props.showCenterMarker) {
        if (!this.centerMarker.CLASS_NAME) {
          // this.centerMarker = new AMap.Rectangle({
          //   map: this.map,
          //   // bounds:AMap.Bounds([nextProps.center[0]-0.1,nextProps.center[1]-0.1], [nextProps.center[0]+0.1,nextProps.center[1]+0.1])
          // })
          let icon = new AMap.Icon({
            size: new AMap.Size(25, 25), // 图标尺寸
            image: '../../assets/images/icon-point-red.svg', // Icon的图像
            imageSize: new AMap.Size(25, 25) // 根据所设置的大小拉伸或压缩图片
          });
          this.centerMarker = new AMap.Marker({
            map: this.map,
            position: nextProps.center,
            icon: icon,
            offset: new AMap.Pixel(-13, -13)
          });
          this.map.add(this.centerMarker);
        }
        this.centerMarker.setPosition(nextProps.center);
      }
    }
    if (
      (nextProps.inputAutocomplete || nextProps.inputAutocomplete == '') &&
      this.props.inputAutocomplete != nextProps.inputAutocomplete
    ) {
      AMap.plugin('AMap.Autocomplete', () => {
        // 实例化Autocomplete
        let autoOptions = {
          city: '全国'
        };
        let autoComplete = new AMap.Autocomplete(autoOptions);
        autoComplete.search(nextProps.inputAutocomplete, (status, result) => {
          // 搜索成功时，result即是对应的匹配数据
          // console.log(result, '=========>result');
          this.props.getInputAutocompletValue &&
            this.props.getInputAutocompletValue(result.tips ? result.tips : []);
        });
      });
    }
  }

  componentWillUnmount() {
    this.map.destroy();
  }

  addPointToMap(map) {
    const AMap = window.AMap;
    const pointArray = [
      require('../../assets/images/icon-point-green.svg'),
      require('../../assets/images/icon-point-blue.svg'),
      require('../../assets/images/icon-point-yellow.svg'),
      require('../../assets/images/icon-point-red.svg')
    ];

    let points = this.state.points;
    for (let i = 0; i < points.length; i++) {
      let icon = new AMap.Icon({
        size: new AMap.Size(32, 32), // 图标尺寸
        image: pointArray[points[i].type], // Icon的图像
        imageSize: new AMap.Size(32, 32) // 根据所设置的大小拉伸或压缩图片
      });
      let marker = new AMap.Marker({
        map: map,
        position: points[i].address,
        icon: icon,
        offset: new AMap.Pixel(-15, -32)
      });

      // 设置label标签
      if (this.props.showInfoLable) {
        // 设置鼠标划过点标记显示的文字提示
        marker.setTitle(points[i].lable);
        // 样式className为：amap-marker-label
        marker.setLabel({
          offset: new AMap.Pixel(0, -10), //设置文本标注偏移量
          content: `<div class='info'>${points[i].lable}</div>`, //设置文本标注内容
          direction: 'right' //设置文本标注方位
        });
      }

      // 设置信息窗口
      if (this.props.showInfoWindow) {
        this.infoWindow = new AMap.InfoWindow({
          anchor: 'middle-left',
          offset: new AMap.Pixel(20, -16),
          closeWhenClickMap: true
        });

        const markerClick = (e) => {
          this.infoWindow.setContent(e.target.content);
          this.infoWindow.open(map, e.target.getPosition());
        };

        marker.content = this.props.customContent
          ? this.props.customContent(points[i])
          : this.getWindowContent(points[i]);
        marker.on('click', markerClick);
        if (this.props.defaultOpen) {
          marker.emit('click', { target: marker });
        }
      }
    }
  }

  getWindowContent(point) {
    let content = `
    <div>
      <div class='baseInfo'>
        默认模版
        <div>${point.content.toString()}</div>
      </div>
    </div>`;
    return content;
  }

  regeoCode(lnglat?) {
    const AMap = window.AMap;
    if (!this.geocoder.CLASS_NAME) {
      this.geocoder = new AMap.Geocoder({
        // city: "010", //城市设为北京，默认：“全国”
        radius: 100000 //范围，默认：500
      });
    }
    if (lnglat) {
      if (!this.regeoCodeMarker.CLASS_NAME) {
        this.regeoCodeMarker = new AMap.Marker();
        this.map.add(this.regeoCodeMarker);
      }
      this.regeoCodeMarker.setPosition(lnglat);

      this.geocoder.getAddress(lnglat, (status, result) => {
        if (status === 'complete' && result.regeocode) {
          let address = result.regeocode.formattedAddress;
          this.props.getAddress({ address, lnglat: [lnglat.lng, lnglat.lat] });
        } else {
        }
      });
    }
  }

  geoCode(value?) {
    const AMap = window.AMap;
    if (!this.geocoder.CLASS_NAME) {
      this.geocoder = new AMap.Geocoder({
        // city: "010", //城市设为北京，默认：“全国”
        radius: 100000 //范围，默认：500
      });
    }
    this.geocoder.getLocation(value, (status, result) => {
      if (status === 'complete' && result.geocodes.length) {
        let lnglat = result.geocodes[0].location;
        if (this.props.getLnglat) {
          this.props.getLnglat({ lnglat: [lnglat.lng, lnglat.lat] });
        }
        if (!this.regeoCodeMarker.CLASS_NAME) {
          this.regeoCodeMarker = new AMap.Marker();
          this.map.add(this.regeoCodeMarker);
        }
        this.regeoCodeMarker.setPosition(lnglat);
        this.map.setFitView(this.regeoCodeMarker);
      } else {
        if (this.props.getLnglat) {
          this.props.getLnglat({});
        }
      }
    });
  }

  public render() {
    let { classes, height, width, ...other } = this.props;
    return (
      <div
        className={classes.root}
        style={{ height: height ? height : '600', width: width ? width : '600' }}
      >
        <div
          style={{ width: '100%', height: '100%' }}
          id={this.props.containerId ? this.props.containerId : 'amapContainer'}
        />
      </div>
    );
  }
}

export default withStyles(styles)(CommonMap);
