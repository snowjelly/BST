function merge(array, leftSide, rightSide, l, h, sortedArray = []) {
  if (l === h) {
    return sortedArray;
  }
  if (leftSide[l] < rightSide[l]) {
    const cut = leftSide.splice(l, 1)[0];
    sortedArray.push(cut);
    if (leftSide.length === 0) {
      sortedArray.push(...rightSide);
    }
    return merge(array, leftSide, rightSide, l, h, sortedArray);
  } else if (rightSide[l] < leftSide[l]) {
    const cut = rightSide.splice(l, 1)[0];
    sortedArray.push(cut);
    if (rightSide.length === 0) {
      sortedArray.push(...leftSide);
    }
    return merge(array, leftSide, rightSide, l, h, sortedArray);
  } else if (leftSide[l] === rightSide[l]) {
    const cut = leftSide.splice(l, 1)[0];
    if (leftSide.length === 0) {
      sortedArray.push(...rightSide);
    }
    return merge(array, leftSide, rightSide, l, h, sortedArray);
  }
  return sortedArray;
}

function mergeSort(array) {
  const l = 0;
  const h = array.length - 1;
  if (array.length < 2) {
    return array;
  }

  const mid = Math.round((l + h) / 2);
  const leftSide = mergeSort(array.slice(l, mid));
  const rightSide = mergeSort(array.slice(mid));
  const sortedArray = merge(array, leftSide, rightSide, l, h);
  return sortedArray;
}

const node = (data) => {
  return { data, left: null, right: null };
};

const Tree = (arr) => {
  const sortedArray = mergeSort(arr);

  function del(value) {}

  function buildTree(l = 0, h = sortedArray.length - 1) {
    if (l > h) return null;

    const mid = Math.floor((l + h) / 2);
    const nodeOb = node(sortedArray[mid]);

    nodeOb.left = buildTree(l, mid - 1);
    nodeOb.right = buildTree(mid + 1, h);
    return nodeOb;
  }

  function insert(value) {
    let tmp = root;
    if (tmp === null) {
      return;
    }
    const newNode = node(value);
    while (tmp !== null) {
      if (tmp.data === newNode.data) {
        return new Error("Cannot add duplicate items");
      }
      if (newNode.data < tmp.data && tmp.left !== null) {
        tmp = tmp.left;
        console.log(tmp);
      }
      if (tmp === null) break;
      if (newNode.data > tmp.data) {
        if (tmp.right === null || tmp.right.right === null) break;
        tmp = tmp.right;
        console.log(tmp);
      }
      if (tmp.left === null) {
        break;
      }
    }
    if (tmp === null) return;
    console.log({ newNode: newNode.data, tmp: tmp.data });
    if (newNode.data < tmp.data) {
      tmp.left = newNode;
    }
    if (newNode.data > tmp.data) {
      const tmpRight = tmp.right;
      newNode.right = tmpRight;
      tmp.right = newNode;
    }
    if (newNode.data < tmp.right.data) {
      tmp.left = newNode;
    }
  }

  return { insert, del, buildTree, root: buildTree(0, sortedArray.length - 1) };
};

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const tree = Tree([45, 40, 400, 23, 800, 900, 4, 3, 5, 7, 9, 67, 6345, 324]);
const root = tree.buildTree();
prettyPrint(root);
