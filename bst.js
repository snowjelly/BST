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

  function buildTree(
    l = 0,
    h = sortedArray.length - 1,
    sortedArr = sortedArray
  ) {
    if (l > h) return null;

    const mid = Math.floor((l + h) / 2);
    const nodeOb = node(sortedArr[mid]);

    nodeOb.left = buildTree(l, mid - 1, sortedArr);
    nodeOb.right = buildTree(mid + 1, h, sortedArr);
    return nodeOb;
  }

  let root = buildTree();

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

    if (value < rootNode.data) {
      rootNode.left = del(value, rootNode.left);
      return rootNode;
    } else if (value > rootNode.data) {
      rootNode.right = del(value, rootNode.right);
      return rootNode;
    }

    if (rootNode.left === null && rootNode.right === null) {
      rootNode = null;
      return rootNode;
    } else if (rootNode.left === null) {
      const tmp = rootNode.right;
      rootNode = tmp;
      return rootNode;
    } else {
      let tmp = rootNode;
      rootNode = rootNode.right;
      while (rootNode.left !== null) {
        rootNode = rootNode.left;
      }
      let tmpData = rootNode.data;

      tmp = del(rootNode.data, tmp);
      tmp.data = tmpData;
      return tmp;
    }
  }

  function find(value, rootNode = root) {
    while (value !== rootNode.data) {
      if (value < rootNode.data) {
        rootNode = rootNode.left;
      } else if (value > rootNode.data) {
        rootNode = rootNode.right;
      }
    }
    return rootNode;
  }

  function levelOrder(cb = null, queue = [root]) {
    const orderedArray = [];

    while (queue.length !== 0) {
      const deQueue = queue.shift();
      orderedArray.push(deQueue);

      if (deQueue.left !== null) {
        queue.push(deQueue.left);
      }
      if (deQueue.right !== null) {
        queue.push(deQueue.right);
      }

      if (cb !== null) {
        cb(deQueue);
      }
    }
    if (cb === null) {
      return orderedArray;
    }
  }

  function levelOrderRecursive(cb = null, queue = [root], orderedArray = []) {
    if (queue.length === 0 && cb === null) {
      return orderedArray;
    }
    if (queue.length === 0) {
      return;
    }

    const deQueue = queue.shift();
    if (cb !== null) {
      cb(deQueue);
    }

    if (deQueue.left !== null) {
      queue = [...queue, deQueue.left];
    }
    if (deQueue.right !== null) {
      queue = [...queue, deQueue.right];
    }

    if (cb !== null) {
      levelOrderRecursive(cb, queue);
    } else {
      orderedArray = levelOrderRecursive(cb, queue, [...orderedArray, deQueue]);
      return orderedArray;
    }
  }

  function inorder(cb = null, queue = [root], orderedArray = []) {
    if (queue.length === 0) {
      return;
    }

    const deQueue = queue.shift();

    if (deQueue.left !== null) {
      queue = [...queue, deQueue.left];
      inorder(cb, queue, orderedArray);
    }
    if (cb !== null) {
      cb(deQueue);
    }
    orderedArray.push(deQueue);

    if (deQueue.right !== null) {
      queue = [...queue, deQueue.right];
      inorder(cb, queue, orderedArray);
    }

    if (queue.length === 0 && cb === null) {
      return orderedArray;
    }
  }

  function preorder(cb = null, queue = [root], orderedArray = []) {
    if (queue.length === 0) return;

    const deQueue = queue.shift();

    if (cb !== null) {
      cb(deQueue);
    }
    orderedArray.push(deQueue);

    if (deQueue.left !== null) {
      queue = [...queue, deQueue.left];
      preorder(cb, queue, orderedArray);
    }

    if (deQueue.right !== null) {
      queue = [...queue, deQueue.right];
      preorder(cb, queue, orderedArray);
    }

    if (queue.length === 0 && cb === null) {
      return orderedArray;
    }
  }

  function postorder(cb = null, queue = [root], orderedArray = []) {
    if (queue.length === 0) return;

    const deQueue = queue.shift();

    if (deQueue.left !== null) {
      queue = [...queue, deQueue.left];
      postorder(cb, queue, orderedArray);
    }

    if (deQueue.right !== null) {
      queue = [...queue, deQueue.right];
      postorder(cb, queue, orderedArray);
    }

    if (cb !== null) {
      cb(deQueue);
    }
    orderedArray.push(deQueue);

    if (queue.length === 0 && cb === null) {
      return orderedArray;
    }
  }

  function height(node) {
    if (node === null) return 0;
    const leftHeight = height(node.left);
    const rightHeight = height(node.right);
    if (leftHeight > rightHeight) {
      return leftHeight + 1;
    } else {
      return rightHeight + 1;
    }
  }

  function depth(node, rootNode = root) {
    let counter = 0;
    while (node !== rootNode.data) {
      counter++;
      if (node < rootNode.data) {
        rootNode = rootNode.left;
      } else if (node > rootNode.data) {
        rootNode = rootNode.right;
      }
    }
    return counter;
  }

  function isBalanced() {
    let balanced;
    inorder((result) => {
      if (balanced === false) return;
      const difference = height(result.left) - height(result.right);
      if (difference < 1) {
        balanced = true;
      } else {
        balanced = false;
        return;
      }
    });
    return balanced;
  }

  function rebalance() {
    const arr = [];
    inorder((result) => {
      arr.push(result.data);
    });
    this.root = buildTree(0, arr.length - 1, arr);
    root = this.root;
    return this.root;
  }

  return {
    insert,
    del,
    buildTree,
    root,
    find,
    levelOrder,
    levelOrderRecursive,
    inorder,
    preorder,
    postorder,
    height,
    depth,
    isBalanced,
    rebalance,
  };
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
  34, 35, 543, 3452, 34, 654, 20, 32, 30, 36, 40, 50, 70, 80, 85, 75, 60, 65,
]);

function driver() {
  function getRandLessThan100() {
    return Math.floor(Math.random() * 100) + 1;
  }

  function getRandGreaterThan100() {
    return Math.floor(Math.random() * 100) + 1 + 100;
  }

  function populateArray(arr = [], lessThan100 = true) {
    if (arr.length === 20) return arr;
    let rand;
    if (lessThan100) {
      rand = getRandLessThan100();
      while (arr.indexOf(rand) !== -1) {
        rand = getRandLessThan100();
      }
    } else {
      rand = getRandGreaterThan100();
      while (arr.indexOf(rand) !== -1) {
        rand = getRandGreaterThan100();
      }
    }

    arr.push(rand);
    if (lessThan100) {
      populateArray(arr);
    } else {
      populateArray(arr, false);
    }
    return arr;
  }

  const arr = populateArray();
  const tree = Tree(arr);

  function insertArray(arr) {
    while (arr.shift() !== undefined) {
      tree.insert(arr[0]);
    }
  }

  prettyPrint(tree.root);
  console.log(tree.isBalanced());
  tree.levelOrderRecursive((result) => {
    console.log({ levelOrder: result });
  });
  tree.preorder((result) => {
    console.log({ preOrder: result });
  });
  tree.postorder((result) => {
    console.log({ postOrder: result });
  });
  tree.inorder((result) => {
    console.log({ inOrder: result });
  });

  const greaterThan100Arr = populateArray([], false);
  insertArray(greaterThan100Arr);

  prettyPrint(tree.root);
  console.log(tree.isBalanced());

  tree.rebalance();

  prettyPrint(tree.root);
  console.log(tree.isBalanced());

  tree.levelOrderRecursive((result) => {
    console.log({ levelOrder: result });
  });
  tree.preorder((result) => {
    console.log({ preOrder: result });
  });
  tree.postorder((result) => {
    console.log({ postOrder: result });
  });
  tree.inorder((result) => {
    console.log({ inOrder: result });
  });
}
driver();
