import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import App from "../../routes";

import { Col, Row } from "antd";

import { Layout } from "antd";
const { Content } = Layout;

import Topbar from "./topbar";
import Footbar from "./footbar";
export interface MainAppProps {
  match;
  getOrganizations;
  getAllProducts;
  getRoles;
}
class MainApp extends React.Component<MainAppProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      loadOrg: false,
      loadProduct: false,
      loadRoles: false
    };
  }
  getNav = () => {
    return <Topbar />;
  };
  componentDidMount() {
    // this.props.getOrganizations({
    //   cb: (err, res) => {
    //     this.setState({ loadOrg: true });
    //   }
    // });
    // this.props.getAllProducts({
    //   cb: (err, res) => {
    //     this.setState({ loadProduct: true });
    //   }
    // });
    // this.props.getRoles({
    //   cb: (err, res) => {
    //     this.setState({ loadRoles: true });
    //   }
    // });
  }
  public render() {
    const { match } = this.props;
    // let { loadOrg, loadProduct, loadRoles } = this.state;
    // if (!loadOrg || !loadProduct || !loadRoles) {
    //   return <div />;
    // }
    return (
      <Layout>
        <Layout>
          {this.getNav()}
          <div
            style={{
              marginTop: "60px",
              display: "flex",
              justifyContent: "center",
              minHeight: "calc(100vh - 62px)",
              backgroundColor: "#fff"
            }}
          >
            <Content>
              <App match={match} />
            </Content>
          </div>
          <Footbar />
        </Layout>
      </Layout>
    );
  }
}

const mapState2Props = ({}) => ({});
const mapDispatch2Props = ({}) => ({});

export default withRouter(
  connect(
    mapState2Props,
    mapDispatch2Props
  )(MainApp)
);
// export default withRouter(MainApp);
