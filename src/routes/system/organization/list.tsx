import * as React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import { matchPath } from "react-router";

import ContentWapper from "../../../components/content-wapper";
import TwoCol from "../../../components/layout/twoCol";
import { Route, Switch, Redirect } from "react-router-dom";
import Info from "./info";

import Tree from "../../../components/tree";

const styles: any = theme => {
  return {};
};
export interface IListProps {
  classes;
  match;
  history;
  location;
}

class List extends React.Component<IListProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      selectedKeys: []
    };
  }

  onSelect = (selectedKeys): any => {
    if (selectedKeys.length == 0) {
      return false;
    }
    this.setState({ selectedKeys: selectedKeys }, () => {
      this.doShow(selectedKeys[0]);
    });
  };

  componentDidMount() {
    // let { organizations } = this.props;
    // if (organizations.list.length) {
    //   this.doShow(organizations.list[0].id);
    // }
  }
  componentWillReceiveProps(nextProps: any) {
    let { location } = nextProps;
    const match = matchPath(location.pathname, {
      path: "/system/organization/list/info/:organizationId",
      strict: false
    });
    if (match && match.params && match.params.organizationId) {
      this.setState({ selectedKeys: [match.params.organizationId] }, () => {});
    } else {
      this.setState({ selectedKeys: [] });
    }
  }

  doShow = id => {
    let { history, match } = this.props;
    history.push(`${match.url}/info/${id}`);
  };

  leftComponent = () => {
    const list = [
      {
        id: "383898ad-f6e6-474f-a48a-7b3443e1abb1",
        name: "创新大厦",
        createdAt: 1563761233984,
        children: [
          {
            id: "276e4261-703b-41f4-874d-d3a88a9ea7b7",
            name: "15层-2",
            createdAt: 1563870796817,
            children: []
          },
          {
            id: "375784c9-d841-4337-8b67-412624aaa935",
            name: "15层",
            createdAt: 1563870788781,
            children: []
          },
          {
            id: "6e22329a-0f67-4ed3-b0c3-3898c3c26475",
            name: "16层-1",
            createdAt: 1563864625018,
            children: []
          },
          {
            id: "b034bdba-c531-4eea-a4f6-ad7151bc6c48",
            name: "17层",
            createdAt: 1563864457054,
            children: []
          }
        ]
      }
    ];
    // const { organizations = {} } = this.props;
    // organizations.list = list;
    // if (organizations.list.length == 0) {
    //   return "";
    // }
    return (
      <ContentWapper>
        <Tree
          placeholder={"请输入组织名称"}
          showSearch={true}
          showLine
          data={list}
          onSelect={this.onSelect}
          selectedKeys={this.state.selectedKeys}
          openAllNode={true}
        />
      </ContentWapper>
    );
  };
  rightComponent = () => {
    let { match } = this.props;
    return (
      <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/info`} />
        <Route path={`${match.url}/info/:organizationId?`} component={Info} />
      </Switch>
    );
  };
  public render() {
    console.log("test");
    return (
      <TwoCol
        leftSpan={5}
        rightSpan={19}
        leftChildren={this.leftComponent()}
        rightChildren={this.rightComponent()}
      />
    );
  }
}

const mapState2Props = ({ common: {} }) => ({});
const mapDispatch2Props = ({ common: {} }) => ({});

export default withStyles(styles)(
  connect(
    mapState2Props,
    mapDispatch2Props
  )(List)
);
