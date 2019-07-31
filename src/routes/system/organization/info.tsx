// import * as React from "react";
// import { connect } from "react-redux";
// import { withStyles } from "@material-ui/styles";
// import ContentWapper from "../../../components/content-wapper";
// // import InfoPanel from "../../../components/info-panel";
// import Button from "../../../components/button";
// import UserInfo from "./user";
// import { GridInfo, GridInfoItem } from "../../../components/grid-info";
// import _ from "lodash";
// import Modal from "../../../components/modal";
// import Input from "../../../components/input";
// import { Row, Col } from "antd";
// import moment from "moment";
// // import DeleteInfoPanel from "../../../components/delete-info-panel";
// import { message } from "antd";
// export interface IInfoProps {
//   classes;
//   location;
//   history;
//   match;
//   getOrganizationById;
//   editOrganization;
//   createOrganization;
//   getOrganizations;
//   delOrganization;
//   getUserByOrganizationId;
//   users;
//   clearOrganization;
// }

// const styles: any = theme => {
//   return {
//     infoPanelBtn: {
//       marginRight: theme.padding.xs
//     },
//     modalContent: {
//       padding: "12px",
//       marginTop: "10px",
//       borderRadius: "10px",
//       backgroundColor: theme.palette.gray5
//     },
//     userinfo: {
//       "& .user": {
//         marginBottom: "20px"
//       }
//     },
//     card: {
//       marginTop: "15px"
//     },
//     orgtext: {
//       color: theme.palette.primary
//     }
//   };
// };

// class Info extends React.Component<IInfoProps, any> {
//   constructor(props) {
//     super(props);
//     this.state = {
//       addOrgVisible: false, //新增下级机构弹框
//       editOrgVisible: false, //编辑组织机构弹框
//       name: null,
//       updatedAt: null
//     };
//   }
//   componentWillMount() {
//     this.getOrganizationById();
//   }
//   componentDidUpdate(preProps, preState, snapshot) {
//     if (preProps.match.url !== this.props.match.url) {
//       this.getOrganizationById();
//     }
//   }
//   componentWillUnmount() {
//     this.props.clearOrganization();
//   }
//   getOrganizationById = () => {
//     let { organizationId } = this.props.match.params;
//     if (organizationId) {
//       this.props.getOrganizationById({
//         id: organizationId,
//         cb: (err, data) => {
//           if (data) {
//             this.setState({
//               name: data.name,
//               new_name: data.name,
//               updatedAt: data.updatedAt
//             });
//           }
//         }
//       });
//       this.props.getUserByOrganizationId({
//         id: organizationId,
//         cb: (err, data) => {
//           // console.log(data);
//           // if (data) {
//           //   this.setState({
//           //     name: data.name,
//           //     new_name: data.name,
//           //     updatedAt: data.updatedAt
//           //   });
//           // }
//         }
//       });
//     }
//   };

//   handleChange = name => event => {
//     this.setState({ [name]: event.target.value });
//   };
//   //删除确认框
//   showDeleteConfirm() {
//     let { classes } = this.props;
//     let { organizationId } = this.props.match.params;
//     // Modal.confirm({
//     //   children: (
//     //     <DeleteInfoPanel
//     //       title={"确定要删除该机构吗？"}
//     //       subTitle={"删除后不可恢复。"}
//     //     />
//     //   ),
//     //   onOk: () => {
//     //     this.props.delOrganization({
//     //       id: organizationId,
//     //       cb: err => {
//     //         if (!err) {
//     //           message.success("删除成功");
//     //           this.props.getOrganizations({});
//     //         } else {
//     //           message.error(err.message);
//     //         }
//     //       }
//     //     });
//     //   },
//     //   onCancel() {}
//     // });
//   }

//   public render() {
//     let { organizationId } = this.props.match.params;
//     let { classes, users } = this.props;
//     return (
//       <ContentWapper>
//         <InfoPanel
//           className={classes.panel}
//           title={"基本信息"}
//           actions={
//             <div>
//               <Button
//                 type="primary"
//                 className={classes.infoPanelBtn}
//                 onClick={() => {
//                   this.setState({ addOrgVisible: true });
//                 }}
//               >
//                 新增下级机构
//               </Button>
//               <Button
//                 type="primary"
//                 className={classes.infoPanelBtn}
//                 onClick={() => {
//                   this.setState({ editOrgVisible: true });
//                 }}
//               >
//                 编辑
//               </Button>
//               <Button
//                 type="primary"
//                 onClick={this.showDeleteConfirm.bind(this)}
//               >
//                 删除
//               </Button>
//             </div>
//           }
//         >
//           <GridInfo>
//             <GridInfoItem
//               title={<span>机构名称</span>}
//               span={1}
//               content={this.state.name}
//             />
//             <GridInfoItem
//               title={<span>添加时间</span>}
//               span={1}
//               content={
//                 this.state.updatedAt
//                   ? moment(this.state.updatedAt).format("YYYY-MM-DD HH:mm:ss")
//                   : "-"
//               }
//               lb="none"
//             />
//           </GridInfo>
//         </InfoPanel>
//         <InfoPanel className={classes.userinfo} title={"用户信息"}>
//           <Row gutter={20} className={classes.card}>
//             {users.map(user => {
//               return (
//                 <Col span={6}>
//                   <UserInfo
//                     key={user.id}
//                     role={user.roleName}
//                     name={user.name}
//                   />
//                 </Col>
//               );
//             })}
//           </Row>
//         </InfoPanel>
//         {/* 新增下级机构弹框 */}
//         {this.state.name ? (
//           <Modal
//             width="400px"
//             title="新增下级机构"
//             visible={this.state.addOrgVisible}
//             destroyOnClose={true}
//             onOk={() => {
//               this.props.createOrganization({
//                 currId: organizationId,
//                 name: this.state.sub_name,
//                 cb: err => {
//                   if (!err) {
//                     message.success("新增成功");
//                     this.props.getOrganizations({});
//                   } else {
//                     message.error(err.message);
//                   }
//                 }
//               });
//               this.setState({ addOrgVisible: false });
//             }}
//             onCancel={() => {
//               this.setState({ addOrgVisible: false });
//             }}
//           >
//             <div className={classes.orgtext}>
//               上级机构: <span>{this.state.name}</span>
//               <div className={classes.modalContent}>
//                 <Input
//                   placeholder="请输入下级机构名称"
//                   onChange={this.handleChange("sub_name")}
//                 />
//               </div>
//             </div>
//           </Modal>
//         ) : (
//           ""
//         )}

//         {/* 编辑组织机构弹框 */}
//         {this.state.name ? (
//           <Modal
//             width="400px"
//             title="编辑组织机构"
//             visible={this.state.editOrgVisible}
//             destroyOnClose={true}
//             onOk={() => {
//               this.props.editOrganization({
//                 id: organizationId,
//                 name: this.state.new_name,
//                 cb: err => {
//                   if (!err) {
//                     message.success("更新成功");
//                     this.props.getOrganizations({});
//                   } else {
//                     message.error(err.message);
//                   }
//                 }
//               });
//               this.setState({
//                 editOrgVisible: false,
//                 name: this.state.new_name
//               });
//             }}
//             onCancel={() => {
//               this.setState({
//                 editOrgVisible: false,
//                 new_name: this.state.name
//               });
//             }}
//           >
//             <div>
//               <div className={classes.modalContent}>
//                 <Input
//                   placeholder="请输入组织机构名称"
//                   defaultValue={this.state.name}
//                   onChange={this.handleChange("new_name")}
//                 />
//               </div>
//             </div>
//           </Modal>
//         ) : (
//           ""
//         )}
//       </ContentWapper>
//     );
//   }
// }

// const mapState2Props = ({ organization: { users } }) => ({ users });
// const mapDispatch2Props = ({
//   organization: {
//     getOrganizationById,
//     editOrganization,
//     createOrganization,
//     delOrganization,
//     getUserByOrganizationId,
//     clearOrganization
//   },
//   common: { getOrganizations }
// }) => ({
//   getOrganizationById,
//   editOrganization,
//   createOrganization,
//   getOrganizations,
//   delOrganization,
//   getUserByOrganizationId,
//   clearOrganization
// });

// export default withStyles(styles)(
//   connect(
//     mapState2Props,
//     mapDispatch2Props
//   )(Info)
// );
