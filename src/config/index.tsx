const menu = [
  {
    key: "dashboard",
    title: "概览"
  },
  {
    key: "product",
    title: "产品管理"
  },
  {
    key: "device",
    title: "设备管理",
    children: [
      {
        key: "device/list",
        title: "设备列表"
      },
      {
        key: "device/group",
        title: "分组管理"
      },
      {
        key: "device/batch",
        title: "批次管理"
      }
    ]
  },
  {
    key: "alarm",
    title: "告警管理",
    children: [
      {
        key: "alarm/board",
        title: "告警看板"
      },
      {
        key: "alarm/search",
        title: "告警查询"
      },
      {
        key: "alarm/rule",
        title: "告警规则"
      }
    ]
  },
  {
    key: "workflow",
    title: "工单管理"
  },
  {
    key: "firmware",
    title: "固件管理",
    children: [
      {
        key: "firmware/firmwareManage",
        title: "固件列表"
      },
      {
        key: "firmware/version",
        title: "版本分布"
      }
    ]
  },
  {
    key: "application",
    title: "应用管理"
  },
  {
    key: "system",
    title: "系统管理",
    children: [
      {
        key: "system/user",
        title: "用户管理"
      },
      {
        key: "system/role",
        title: "角色管理"
      },
      {
        key: "system/organization",
        title: "组织机构"
      },
      {
        key: "system/tenant",
        title: "租户管理"
      },
      {
        key: "system/log",
        title: "日志管理"
      }
    ]
  }
];

const deviceKey = {
  devno: "设备编号",
  status: "锁把手状态",
  switch: "锁开关状态",
  wind_dir: "风向",
  wind_speed: "风速",
  temp: "温度",
  humi: "湿度",
  temperature: "温度",
  humidity: "湿度",
  pressure: "大气气压",
  noise: "噪音",
  pm25: "PM2.5 浓度",
  pm10: "PM10 浓度",
  a1_V: "a1_V",
  a1_A: "A1 路电流",
  a1_W: "A1 路有功功率",
  a1_KWH: "A1 路有功电能",
  a1_switch: "A1 路开关状态",

  fre: "数据上报间隔",

  stDevBattery: "电池电量",
  stDevCMD: "智件操作码",
  stDevID: "智件ID",
  stDevSignal: "信号强度",
  stDevStates: "设置状态",
  stDevType: "智件类型",
  stMesg_L: "消息长度",
  stMesgSN: "消息类型",

  smokeScope: "烟雾浓度",
  smokeDetectorBatteryLevel: "烟感电池电量百分比",
  smokeScopeThreshold: "烟雾浓度阈值",
  temperatureThreshold: "温度阈值",
  humidityThreshold: "相对湿度阈值",
  smokeDetectorBatteryLevelThreshold: "烟感电池电量阈值百分比",
  nbBatteryLevelThreshold: "NB电池电量阈值百分比",
  mute: "静音",
  selfCheck: "自检",
  reset: "重启",
  longitude: "经度",
  latitude: "纬度",
  warning: "报警状态",
  ordinaryReportCycle: "普通上报周期",
  urgentReportCycle: "紧急上报周期",
  ICCID: "ICCID",
  mazeContamination: "迷宫污染度",
  mcuVersion: "MCU版本号",
  smokeDetectorVersion: "烟感版本号",
  nbVersion: "NB模块版本号",
  RSRP: "RSRP",
  RSRQ: "RSRQ",
  SNR: "SNR",
  ECL: "ECL",
  smokeTemperatureSwitch: "烟温切换",
  productType: "产品类型",
  CellId: "CellId",
  PowerState: "电源状态",
  PowerVoltage: "电源电压值",
  MotorState: "阀门状态",
  AralmState: "告警状态",
  IMSI: "460113017939951",
  Flow: "水表水流数",
  Version: "软件版本",
  Other: "其他值",

  batteryVoltage: "内置电池电压",
  beanType: "数据类型",
  cellId: "基站Id",
  ecode: "错误码",
  height: "海拔高度",
  imei: "imei",
  imsi: "内置物联网卡号",
  lac: "位置区位码",
  lat: "纬度",
  lng: "经度",
  powerVoltage: "电瓶电压",
  satelliteCount: "卫星数量",
  sensity: "震动灵敏度",
  seq: "指令序列号",
  signal: "信号强度",
  speed: "车速",
  isPower: "电瓶是否插入",
  isElectricLock: "钥匙是否插入并启动",
  isDefenseModel: "是否设防",
  isVibrate: "是否震动",
  isWheelRolling: "车轮是否转动",
  isTrackModel: "是否追踪模式",
  isTempNormal: "温度是否正常",
  isBusy: "是否忙时模式"
};

const config = {
  menu,
  deviceKey
};
export default config;
