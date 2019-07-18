import * as _ from "lodash";

function deepPick(key, items) {
  let found;

  for (let i = 0; i < items.length; i++) {
    if (items[i].key === key) {
      return items[i];
    } else if (_.isArray(items[i].children)) {
      found = deepPick(key, items[i].children);
      if (found) {
        return found;
      }
    }
  }
}

export default deepPick;
