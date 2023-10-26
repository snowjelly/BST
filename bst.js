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

  function buildTree(l = 0, h = sortedArray.length - 1) {
    if (l > h) return null;

    const mid = Math.floor((l + h) / 2);
    const nodeOb = node(sortedArray[mid]);

    nodeOb.left = buildTree(l, mid - 1);
    nodeOb.right = buildTree(mid + 1, h);
    return nodeOb;
  }

  function insert(value, rootNode = root) {
    if (rootNode === null) {
      return;
    }
    if (value === rootNode.data) {
      return rootNode;
    }
    const newNode = node(value);

    if (value < rootNode.data) {
      if (rootNode.left === null) {
        rootNode.left = newNode;
        return rootNode;
      }
      rootNode.left = insert(value, rootNode.left);
      return rootNode;
    } else if (value > rootNode.data) {
      if (rootNode.right === null) {
        rootNode.right = newNode;
        return rootNode;
      }
      rootNode.right = insert(value, rootNode.right);
      return rootNode;
    }
  }

  function del(value, rootNode = root) {
    if (rootNode === null) {
      return;
    }

    if (rootNode.left === null && rootNode.right === null) {
      rootNode = null;
      return rootNode;
    }

    if (value < rootNode.data) {
      rootNode.left = del(value, rootNode.left);
      return rootNode;
    } else if (value > rootNode.data) {
      rootNode.right = del(value, rootNode.right);
      return rootNode;
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

const tree = Tree([
  45, 40, 400, 23, 800, 900, 20, 2, 4, 5, 7, 9, 67, 6345, 324,
]);
const root = tree.buildTree();
prettyPrint(root);
tree.del(800);
prettyPrint(root);
