function flatTree(data) {
  function iterationflatTree(data, arrs) {
    for (let i = 0; i < data.length; i++) {
      const node = data[i];
      arrs.push(node);
      if (node.children && node.children.length > 0) {
        iterationflatTree(node.children, arrs);
      }
    }
    return arrs;
  }
  return iterationflatTree(data, []);
}

export default flatTree;
