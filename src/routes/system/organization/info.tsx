import * as React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import ContentWapper from "../../../components/content-wapper";
import InfoPanel from "../../../components/info-panel";
import Button from "../../../components/button";
import UserInfo from "./user";
import { GridInfo, GridInfoItem } from "../../../components/grid-info";
import _ from "lodash";
import Modal from "../../../components/modal";
import Input from "../../../components/input";
import { Row, Col } from "antd";
import moment from "moment";
// import DeleteInfoPanel from "../../../components/delete-info-panel";
import { message } from "antd";

import flatTree from "../../../utils/flatTree";
export interface IInfoProps {
  classes;
  location;
  history;
  match;
  getOrganizationById;
  editOrganization;
  createOrganization;
  getOrganizations;
  delOrganization;
  getUserByOrganizationId;
  users;
  clearOrganization;
}

const styles = theme => {
  return {
    infoPanelBtn: {
      marginRight: theme.padding.xs
    },
    modalContent: {
      padding: "12px",
      marginTop: "10px",
      borderRadius: "10px",
      backgroundColor: theme.palette.gray5
    },
    userinfo: {
      "& .user": {
        marginBottom: "20px"
      }
    },
    card: {
      marginTop: "15px"
    },
    orgtext: {
      color: theme.palette.primary
    }
  };
};

class Info extends React.Component<IInfoProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      addOrgVisible: false, //新增下级机构弹框
      editOrgVisible: false, //编辑组织机构弹框
      name: null,
      updatedAt: null,
      list: [
        {
          id: "383898ad-f6e6-474f-a48a-7b3443e1abb1",
          name: "创新大厦",
          createdAt: 1563761233984,
          children: []
        }
      ],
      oriList: [
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
      ]
    };
  }
  componentWillMount() {
    this.getOrganizationById();
  }
  componentDidUpdate(preProps, preState, snapshot) {
    if (preProps.match.url !== this.props.match.url) {
      this.getOrganizationById();
    }
  }
  componentWillUnmount() {
    this.props.clearOrganization();
  }
  getOrganizationById = () => {
    let { organizationId } = this.props.match.params;
    const { oriList } = this.state;
    let data = flatTree(oriList);
    data = _.filter(
      data,
      d => d.id == (organizationId || "383898ad-f6e6-474f-a48a-7b3443e1abb1")
    );
    this.setState({ list: data });
    // if (organizationId) {
    //   this.props.getOrganizationById({
    //     id: organizationId,
    //     cb: (err, data) => {
    //       if (data) {
    //         this.setState({
    //           name: data.name,
    //           new_name: data.name,
    //           updatedAt: data.updatedAt
    //         });
    //       }
    //     }
    //   });
    //   this.props.getUserByOrganizationId({
    //     id: organizationId,
    //     cb: (err, data) => {
    //       // console.log(data);
    //       // if (data) {
    //       //   this.setState({
    //       //     name: data.name,
    //       //     new_name: data.name,
    //       //     updatedAt: data.updatedAt
    //       //   });
    //       // }
    //     }
    //   });
    // }
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  //删除确认框
  showDeleteConfirm() {
    let { classes } = this.props;
    let { organizationId } = this.props.match.params;
    Modal.confirm({
      children: (
        <div>test</div>
        // <DeleteInfoPanel
        //   title={"确定要删除该机构吗？"}
        //   subTitle={"删除后不可恢复。"}
        // />
      ),
      onOk: () => {
        this.props.delOrganization({
          id: organizationId,
          cb: err => {
            if (!err) {
              message.success("删除成功");
              this.props.getOrganizations({});
            } else {
              message.error(err.message);
            }
          }
        });
      },
      onCancel() {}
    });
  }

  public render() {
    let { organizationId } = this.props.match.params;
    let { classes } = this.props;
    console.log("info");
    return (
      <ContentWapper>
        <InfoPanel
          className={classes.panel}
          title={"基本信息"}
          actions={
            <div>
              <Button
                type="primary"
                className={classes.infoPanelBtn}
                onClick={() => {
                  this.setState({ addOrgVisible: true });
                }}
              >
                新增下级机构
              </Button>
              <Button
                type="primary"
                className={classes.infoPanelBtn}
                onClick={() => {
                  this.setState({ editOrgVisible: true });
                }}
              >
                编辑
              </Button>
              <Button
                type="primary"
                onClick={this.showDeleteConfirm.bind(this)}
              >
                删除
              </Button>
            </div>
          }
        >
          <GridInfo>
            <GridInfoItem
              title={<span>机构名称</span>}
              span={1}
              content={this.state.list[0].name}
            />
            <GridInfoItem
              title={<span>添加时间</span>}
              span={1}
              content={
                this.state.updatedAt
                  ? moment(this.state.updatedAt).format("YYYY-MM-DD HH:mm:ss")
                  : "-"
              }
              lb="none"
            />
          </GridInfo>
        </InfoPanel>
        <InfoPanel className={classes.userinfo} title={"用户信息"}>
          <Row gutter={20} className={classes.card}>
            {this.state.list.map((user, key) => {
              return (
                <Col span={6} key={key}>
                  <UserInfo key={user.id} role={user.name} name={user.name} />
                </Col>
              );
            })}
          </Row>
        </InfoPanel>
        {/* 新增下级机构弹框 */}
        {this.state.name ? (
          <Modal
            width="400px"
            title="新增下级机构"
            visible={this.state.addOrgVisible}
            destroyOnClose={true}
            onOk={() => {
              this.props.createOrganization({
                currId: organizationId,
                name: this.state.sub_name,
                cb: err => {
                  if (!err) {
                    message.success("新增成功");
                    this.props.getOrganizations({});
                  } else {
                    message.error(err.message);
                  }
                }
              });
              this.setState({ addOrgVisible: false });
            }}
            onCancel={() => {
              this.setState({ addOrgVisible: false });
            }}
          >
            <div className={classes.orgtext}>
              上级机构: <span>{this.state.name}</span>
              <div className={classes.modalContent}>
                <Input
                  placeholder="请输入下级机构名称"
                  onChange={this.handleChange("sub_name")}
                />
              </div>
            </div>
          </Modal>
        ) : (
          ""
        )}

        {/* 编辑组织机构弹框 */}
        {this.state.name ? (
          <Modal
            width="400px"
            title="编辑组织机构"
            visible={this.state.editOrgVisible}
            destroyOnClose={true}
            onOk={() => {
              this.props.editOrganization({
                id: organizationId,
                name: this.state.new_name,
                cb: err => {
                  if (!err) {
                    message.success("更新成功");
                    this.props.getOrganizations({});
                  } else {
                    message.error(err.message);
                  }
                }
              });
              this.setState({
                editOrgVisible: false,
                name: this.state.new_name
              });
            }}
            onCancel={() => {
              this.setState({
                editOrgVisible: false,
                new_name: this.state.name
              });
            }}
          >
            <div>
              <div className={classes.modalContent}>
                <Input
                  placeholder="请输入组织机构名称"
                  defaultValue={this.state.name}
                  onChange={this.handleChange("new_name")}
                />
              </div>
            </div>
          </Modal>
        ) : (
          ""
        )}
      </ContentWapper>
    );
  }
}

// const mapState2Props = ({ organization: { users } }) => ({ users });
const mapState2Props = ({ organization: {} }) => ({});
const mapDispatch2Props = ({}) => ({});

export default withStyles(styles)(
  connect(
    mapState2Props,
    mapDispatch2Props
  )(Info)
);
