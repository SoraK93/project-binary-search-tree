import { node } from "./node.js";
import { merge } from "../project-recursion/merge-sort.js";

const tree = function (array) {
  /** Create a tree structure using the given array
   * @array {Array} - Sorted array
   * @start {Number} - Starting Index (normally first index)
   * @end {Number} - Last Index (normally last index)
   */
  const buildTree = function (array, start, end) {
    if (start > end) return null;
    const midIndex = Math.floor((start + end) / 2);

    const currentRoot = node(array[midIndex]);

    currentRoot.left = buildTree(array, start, midIndex - 1);
    currentRoot.right = buildTree(array, midIndex + 1, end);

    return currentRoot;
  };

  /** This function will find the given value inside the tree, 
   *  else will throw an error 
   *  @rootNode {node}
   *  @value {Number}
   * */
  const find = function (rootNode, value) {
    let curr = rootNode;
    if (curr.data === value) return curr;
    while(curr != null) {
        if (curr.data > value) {
            curr = curr.left;
        } else if (curr.data < value) {
            curr = curr.right;
        } else {
            return curr;
        }
    }
    throw Error("Data not found");
  };

  // Helper Functions
  /** This will print out the entire tree */
  const prettyPrint = (node, prefix = "", isLeft = true) => {
    // console.log(node);
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

  /** Sort given array based on the situation
   * @clean {true} if providing initial array has no duplicates.
   * @insert {true} if a new node is inserted into the tree
   */
  const sortArray = function (newArray, clean = false, insert = false) {
    if (!clean) {
      const noDuplicatesSet = new Set(newArray);
      const noDuplicatesArray = [...noDuplicatesSet];
      return merge(noDuplicatesArray);
    }
    // TODO: insertion sort implementation
  };

  // Initial tree creation process
  let sortedArray = sortArray(array);
  const root = buildTree(sortedArray, 0, sortedArray.length - 1);

  return { root, find, prettyPrint };
};

const list = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const bst = tree(list);
bst.prettyPrint(bst.root);
console.log(bst.find(bst.root, 4));
