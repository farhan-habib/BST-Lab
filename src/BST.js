class BSTree {
	/**
	 * A BST Node class that contains 2 children (left & right), and a data variable, containing the data stored in it
	 */
	static BSTNode = class {
		constructor(data) {
			this.data = data;
			this.left = null;
			this.right = null;
		}
	};

	#root = null;

	// comparator must be a function(a,b)
	// which returns:
	// < 0 if a < b
	// = 0 if a == b
	// > 0 if a > b
	#comparator = function (a, b) {
		throw "Comparator not defined!";
	};
	/**
	 *
	 * @param {Function} comparator
	 * comparator must be a function(a,b)
	 * which returns:
	 * < 0 if a < b
	 * = 0 if a == b
	 * > 0 if a > b
	 */
	constructor(comparator) {
		this.#root = null;

		if (comparator != null) {
			this.#comparator = comparator;
		} else {
			throw "Comparator method is necessary";
		}
	}
	/**
	 *
	 * @param {*} data The Data to be inserted into the binary search tree.
	 * @returns {BSTree} returns the Binary Search Tree object in order to allow function chaining
	 */
	add(data) {
		const addHelper = (parent, data) => {
			if (this.#comparator(parent.data, data) >= 0) {
				//do this if parent is greater than or equal to new data
				if (parent.left != null) {
					addHelper(parent.left, data);
				} else {
					parent.left = new BSTree.BSTNode(data);
				}
			} else {
				//do this if parent is less than new data
				if (parent.right != null) {
					addHelper(parent.right, data);
				} else {
					parent.right = new BSTree.BSTNode(data);
				}
			}
		};

		if (this.#root === null) {
			this.#root = new BSTree.BSTNode(data);
			return this;
		} else {
			addHelper(this.#root, data);
		}
	}

	//Traversals
	/**
	 *
	 * @returns an array containing the elements in the order of an in-order traversal
	 */
	inOrder() {
		const returnValue = [];
		const inOrderTraversalHelper = (node) => {
			if (node?.left) inOrderTraversalHelper(node.left);
			if (node) returnValue.push(node.data);
			if (node?.right) inOrderTraversalHelper(node.right);
		};
		inOrderTraversalHelper(this.#root);
		return returnValue;
	}
	/**
	 *
	 * @returns an array containing the elements in the order of an pre-order traversal
	 */
	preOrder() {
		const returnValue = [];
		const preOrderTraversalHelper = (node) => {
			if (node) returnValue.push(node.data);
			if (node?.left) preOrderTraversalHelper(node.left);
			if (node?.right) preOrderTraversalHelper(node.right);
		};
		preOrderTraversalHelper(this.#root);
		return returnValue;
	}
	/**
	 *
	 * @returns an array containing the elements in the order of an post-order traversal
	 */
	postOrder() {
		const returnValue = [];
		const postOrderTraversalHelper = (node) => {
			if (node?.left) postOrderTraversalHelper(node.left);
			if (node?.right) postOrderTraversalHelper(node.right);
			if (node) returnValue.push(node.data);
		};
		postOrderTraversalHelper(this.#root);
		return returnValue;
	}
	/**
	 *
	 * @param {Object} data The data you wish to remove from the array
	 * @returns {Object} The value of the BSTNode
	 */
	remove(data) {
		function removeNode(parent, remove) {
			let isLeftChild = true;
			if (parent.right === remove) {
				isLeftChild = false;
			}
			let pointHere = remove.left;
			if (remove.left === null) {
				pointHere = remove.right;
			}
			if (isLeftChild) {
				parent.left = pointHere;
			} else {
				parent.right = pointHere;
			}
			return remove.data;
		}
		let parent = null;
		let root = this.#root;
		while (root !== null) {
			if (this.#comparator(root.data, data) < 0) {
				parent = root;
				root = root.right;
			} else if (this.#comparator(root.data, data) > 0) {
				parent = root;
				root = root.left;
			} else {
				if (parent === null) {
					if (root.left !== null && root.right !== null) {
						//http://www.mathcs.emory.edu/~cheung/Courses/171/Syllabus/9-BinTree/BST-delete2.html
						//Helped out a lot ^
						let rightmostleft = root.left;
						let rightmostleftParent = root;
						while (rightmostleft.right !== null) {
							rightmostleftParent = rightmostleft;
							rightmostleft = rightmostleft.right;
						}
						let data = root.data;
						root.data = rightmostleft.data;
						rightmostleft.data = data;
						return removeNode(rightmostleftParent, rightmostleft);
					} else if (root.left === null && root.right === null) {
						//root has zero children, set to null.
						let pointer = root.data;
						this.#root = null;
						return pointer;
					} else {
						// one child, replace root with child.
						if (root.left !== null) {
							//left child
							let pointer = root.data;
							root = root.left;
							return pointer;
						} else {
							//right child
							let pointer = root.data;
							root = root.right;
							return pointer;
						}
					}
				} else {
					if (root.left !== null && root.right !== null) {
						//do the two childron removal special stuff
						let rp = root;
						let removeOne = rp.left;
						while (removeOne.right !== null) {
							rp = removeOne;
							removeOne = removeOne.right;
						}
						let t = root.data;
						root.data = removeOne.data;
						removeOne.data = t;
						return removeNode(rp, removeOne);
					} else {
						return removeNode(parent, root);
					}
				}
			}
		}
		return data;
	}
}
module.exports = {
	BSTree,
};
