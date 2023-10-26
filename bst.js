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

  function insert(value) {}

  function del(value) {}

  function buildTree(l = 0, h = sortedArray.length - 1) {
    if (l > h) return null;

    const mid = Math.floor((l + h) / 2);
    const nodeOb = node(sortedArray[mid]);

    nodeOb.left = buildTree(l, mid - 1);
    nodeOb.right = buildTree(mid + 1, h);
    return nodeOb;
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

const tree = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
const root = tree.buildTree();
prettyPrint(root);
