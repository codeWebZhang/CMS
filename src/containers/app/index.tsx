import * as React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import { withRouter } from "react-router-dom";
import MainApp from "./main";
// import loadable from 'react-loadable';
// import LoadingComponent from '../../components/loading';

// import axios from 'axios';
// import store from 'store';
// if (store.get('AUTH')) {
//   axios.defaults.headers.common['Authorization'] = store.get('AUTH');
// }
// axios.defaults.headers.common[
//   'Authorization'
// ] = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvcmdhbml6YXRpb25JZCI6IjAwNjY5YjYyLWEyYTktNGQ5Mi1iNDZlLTk0MzA3N2EwNWI4OSIsInRlbmFudElkIjoiMDA2NjliNjItYTJhOS00ZDkyLWI0NmUtOTQzMDc3YTA1Yjg5IiwiZXhwIjoxNTYyMTY0NzYxLCJ1c2VySWQiOiIyMGJlMTlkMy1jNWIzLTQxYjItODY1Zi05ZjBhNzI5MjdjMjQifQ.AaMVIkl8c-oI-V_56rp5JDoCRogfD4mxQs7y1oHxWyY`;
// }
// axios.interceptors.response.use(
//   function(response) {
//     // 对响应数据做点什么
//     return response;
//   },
//   function(err) {
//     if (err && err.response && err.response.status == 401) {
//       window.location.href = '/#/login';
//     }
//     return Promise.reject(err);
//   }
// );

// let Login = loadable({
//   loader: () => import(/* webpackChunkName: "login" */ '../login'),
//   loading: LoadingComponent
// });

// let ResetPassword = loadable({
//   loader: () => import(/* webpackChunkName: "resetPassword" */ '../resetPassword'),
//   loading: LoadingComponent
// });

export interface AppProps {
  classes;
  match;
  history;
  location;
}

const RestrictedRoute = ({ component: Component, authUser, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authUser ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

class App extends React.Component<AppProps, any> {
  public render() {
    const { match } = this.props;
    return (
      <Switch>
        {/* <Route exact path="/login" component={Login} />
          <Route exact path="/resetPassword" component={ResetPassword} /> */}
        <RestrictedRoute
          path={`${match.url}`}
          authUser={{ id: "demo" }}
          component={MainApp}
        />
      </Switch>
      //   <MainApp />
    );
  }
}

export default withRouter(App);

(function(doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = "orientationchange" in window ? "orientationchange" : "resize",
    recalc = function() {
      var clientWidth = docEl.clientWidth;
      console.log(docEl.clientWidth, "--00-");
      if (!clientWidth) return;
      if (clientWidth >= 640) {
        docEl.style.fontSize = "100px";
      } else {
        docEl.style.fontSize = 100 * (clientWidth / 640) + "px";
      }
    };

  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener("DOMContentLoaded", recalc, false);
})(document, window);

// rem 就是帮我们把设计图实现一个等比缩放的过程，
// 假如设计图是按  640px 来设计的，那么我把设计图分成 10份（随你自己分），
// 也就是 640px = 10rem，那么就是 1rem = 64px， 在根元素 html 上设置的 font-size 实际就是给网页的一个标准，它的px是多少，那么子级的 1rem 就等于多少
// 那么在 640px的屏幕下，根元素 html 的font-size 就可以计算为  640/10，
// 但是屏幕是不指定大小的，如果屏幕缩小的，那么根元素的值也要按百分比来缩小，如：
// 屏幕如果缩到了一半 320  ， （320/640）*（640/10）（屏幕宽度/设计图） *（设计图/设计图的总分成）
// 我们公司是按苹果5宽度 320px 的设计图来做的，然后我把设计图分成16份，也就是16rem，
// 那么我的 1rem = 320/16 = 20px，那么公式就是  （屏幕宽度/320） *（320/16）
