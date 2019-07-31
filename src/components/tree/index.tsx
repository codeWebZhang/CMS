import * as React from "react";
import { withStyles } from "@material-ui/styles";
import { Tree as AntTree, Divider, Icon } from "antd";
const AntTreeNode = AntTree.TreeNode;
import Input from "../input";
import Button from "../button";
import * as _ from "lodash";

const styles: any = theme => {
  return {
    searchBox: {
      marginBottom: "13px"
    },
    input: {
      width: "calc(100% - 30px)",
      borderRadius: "2px",
      marginRight: theme.padding.xs,
      // marginRight: '4px',
      height: "21px"
    },
    tree: {
      "& li:not(:last-child)::before": {
        borderColor: `${theme.palette.gray4} !important`
      },
      "& li .ant-tree-node-content-wrapper:hover": {
        backgroundColor: theme.palette.primary,
        color: theme.palette.white
      },
      "& li .ant-tree-node-content-wrapper.ant-tree-node-selected": {
        backgroundColor: theme.palette.primary,
        color: theme.palette.white
      }
    },
    divider: {
      margin: "0",
      borderTopColor: theme.palette.gray1
    }
  };
};

export interface TreeProps {
  classes;
  className?;
  showSearch?;
  data?;
  onSelect?;
  placeholder?;
  openAllNode?;
  selectedKeys?;
}

class Tree extends React.Component<TreeProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      expandedKeys: null,
      searchValue: "",
      autoExpandParent: true
    };
  }

  onExpand = expandedKeys => {
    this.setState({
      expandedKeys,
      autoExpandParent: false
    });
  };

  getParentKey = (id, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children) {
        if (node.children.some(item => item.id === id)) {
          parentKey = node.id;
        } else if (this.getParentKey(id, node.children)) {
          parentKey = this.getParentKey(id, node.children);
        }
      }
    }
    return parentKey;
  };

  componentWillReceiveProps(nextProps) {
    let { data } = this.props;
    if (!_.isEqual(data, nextProps.data)) {
      this.setState(
        {
          data: nextProps.data,
          expandedKeys: null,
          searchValue: "",
          autoExpandParent: true
        },
        () => {
          this.doExpand();
        }
      );
    }
  }

  doExpand() {
    const { openAllNode } = this.props;
    if (openAllNode) {
      this.setState({
        expandedKeys: this.childNodeKey
      });
    } else {
      const { data } = this.state;
      if (data && data[0]) {
        const _key = data[0].id;
        this.setState({
          expandedKeys: [_key]
        });
      }
    }
  }

  childNodeKey = [];
  dataList = [];
  generateList = data => {
    for (let i = 0; i < data.length; i++) {
      const node = data[i];
      const id = node.id;
      const name = node.name;
      this.dataList.push({ id, name });
      if (node.children && node.children.length > 0) {
        this.generateList(node.children);
      } else {
        this.childNodeKey.push(node.id);
      }
    }
  };

  onChange = e => {
    const value = e.target.value;
    const expandedKeys = this.dataList
      .map(item => {
        if (item.name.indexOf(value) > -1) {
          return this.getParentKey(item.id, this.state.data);
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true
    });
    this.dataList = [];
  };

  componentDidMount() {
    this.doExpand();
  }
  render() {
    this.generateList(this.state.data);
    const { searchValue, expandedKeys, autoExpandParent, data } = this.state;
    const {
      classes,
      onSelect,
      showSearch,
      placeholder,
      selectedKeys,
      ...other
    } = this.props;
    const loop = data =>
      data.map(item => {
        const index = item.name.indexOf(searchValue);
        const beforeStr = item.name.substr(0, index);
        const afterStr = item.name.substr(index + searchValue.length);
        const title =
          index > -1 ? (
            <span>
              {beforeStr}
              <span style={{ color: "#f50" }}>{searchValue}</span>
              {afterStr}
            </span>
          ) : (
            <span>{item.name}</span>
          );
        if (item.children) {
          return (
            <AntTreeNode key={item.id} title={title}>
              {loop(item.children)}
            </AntTreeNode>
          );
        }
        return <AntTreeNode key={item.id} title={title} />;
      });
    return (
      <div>
        {showSearch && (
          <div>
            <div className={classes.searchBox}>
              <Input
                className={classes.input}
                placeholder={placeholder || "Search"}
                size="small"
                suffix={<Icon type="search" />}
                style={{ width: "100%" }}
                onChange={this.onChange}
              />
              {/* <Button type="primary" icon="search" /> */}
            </div>
            <Divider dashed className={classes.divider} />
          </div>
        )}
        {data.length && (
          <AntTree
            {...other}
            className={classes.tree}
            onExpand={this.onExpand}
            expandedKeys={expandedKeys}
            selectedKeys={selectedKeys}
            autoExpandParent={autoExpandParent}
            onSelect={onSelect}
          >
            {loop(data)}
          </AntTree>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(Tree);
