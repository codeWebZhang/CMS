export default class WebsocketHeartbeat {
  opts;
  ws;
  repeat;
  onclose;
  onerror;
  onopen;
  onmessage;
  onreconnect;
  lockReconnect;
  forbidReconnect;
  pingTimeoutId;
  pongTimeoutId;
  constructor({
    url,
    pingTimeout = 15000,
    pongTimeout = 10000,
    reconnectTimeout = 2000,
    pingMsg = "heartbeat",
    repeatLimit = null
  }) {
    this.opts = {
      url: url,
      pingTimeout: pingTimeout,
      pongTimeout: pongTimeout,
      reconnectTimeout: reconnectTimeout,
      pingMsg: pingMsg,
      repeatLimit: repeatLimit
    };
    this.ws = null; //websocket实例
    this.repeat = 0;

    //override hook function
    this.onclose = () => {};
    this.onerror = () => {};
    this.onopen = () => {};
    this.onmessage = () => {};
    this.onreconnect = () => {};

    this.createWebSocket();
  }

  createWebSocket = () => {
    try {
      this.ws = new WebSocket(this.opts.url);
      this.initEventHandle();
    } catch (e) {
      this.reconnect();
      throw e;
    }
  };
  initEventHandle = () => {
    this.ws.onclose = () => {
      this.onclose();
      this.reconnect();
    };
    this.ws.onerror = () => {
      this.onerror();
      this.reconnect();
    };
    this.ws.onopen = () => {
      this.repeat = 0;
      this.onopen();
      //心跳检测重置
      this.heartCheck();
    };
    this.ws.onmessage = event => {
      this.onmessage(event);
      //如果获取到消息，心跳检测重置
      //拿到任何消息都说明当前连接是正常的
      this.heartCheck();
    };
  };
  reconnect = () => {
    if (this.opts.repeatLimit > 0 && this.opts.repeatLimit <= this.repeat)
      return; //limit repeat the number
    if (this.lockReconnect || this.forbidReconnect) return;
    this.lockReconnect = true;
    this.repeat++; //必须在lockReconnect之后，避免进行无效计数
    this.onreconnect();
    //没连接上会一直重连，设置延迟避免请求过多
    setTimeout(() => {
      this.createWebSocket();
      this.lockReconnect = false;
    }, this.opts.reconnectTimeout);
  };
  send = msg => {
    this.ws.send(msg);
  };
  heartCheck = () => {
    this.heartReset();
    this.heartStart();
  };
  heartStart = () => {
    if (this.forbidReconnect) return; //不再重连就不再执行心跳
    this.pingTimeoutId = setTimeout(() => {
      //这里发送一个心跳，后端收到后，返回一个心跳消息，
      //onmessage拿到返回的心跳就说明连接正常
      this.ws.send(this.opts.pingMsg);
      //如果超过一定时间还没重置，说明后端主动断开了
      this.pongTimeoutId = setTimeout(() => {
        //如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
        this.ws.close();
      }, this.opts.pongTimeout);
    }, this.opts.pingTimeout);
  };
  heartReset = () => {
    clearTimeout(this.pingTimeoutId);
    clearTimeout(this.pongTimeoutId);
  };
  close = () => {
    //如果手动关闭连接，不再重连
    this.forbidReconnect = true;
    this.heartReset();
    this.ws.close();
  };
}
