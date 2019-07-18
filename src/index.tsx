import React from "react";
import ReactDom from "react-dom";
import "./styles";

import Root from "./root";

var container = document.getElementById("root");

const render = Component => {
  ReactDom.render(<Component />, container);
};

render(Root);
