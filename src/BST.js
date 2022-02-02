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
	remove(data) {}

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

	//TODO: FIX REMOVING TWO CHILDREN
	#removeNode(parent, remove) {
		//start off by setting the node to be removed as the left child by default
		let isLeftChild = true;
		//if the node is the right child, set it as such, else leave as left.
		if (parent.right == remove) {
			isLeftChild = false;
		}
		//create pointer to the left child of the node to be node to be removed.
		let pointHere = remove.left;
		if (remove.left === null) {
			//if the left node doesn't exist, set it to the right node.
			pointHere = remove.right;
		}
		//if the node is the left child of its parent, set parent's left node to the child. Otherwise, set it to its left.
		if (isLeftChild) {
			//remove is left child
			parent.left = pointHere;
		} else {
			//remove is right child
			parent.right = pointHere;
		}

		return remove.data;
	}
	remove(data) {
		let parent = null;
		let r = this.#root;
		let i = 0;
		while (r != null) {
			if (this.#comparator(r.data, data) < 0) {
				parent = r;
				r = r.right;
			} else if (this.#comparator(r.data, data) > 0) {
				parent = r;
				r = r.left;
			} else if (parent == null) {
				//http://www.mathcs.emory.edu/~cheung/Courses/171/Syllabus/9-BinTree/BST-delete2.html
				//Had really good diagrams explaining how to do this ^^
				//TODO: Removing Root, make code more elegant
				if ((this.#root.left != null) & (this.#root.right != null)) {
					//two children

					let p = this.#root;
					let next = p.left;
					while (next.right != null) {
						p = next;
						next = next.right;
					}
					this.#root.data = next.data;
					this.#removeNode(p, next);
				} else if ((this.#root.left == null) & (this.#root.right != null)) {
					//no left child
					this.#root = this.#root.right;
				} else if ((this.#root.left != null) & (this.#root.right == null)) {
					//no right child
					this.#root = this.#root.left;
				} else {
					this.#root = null;
					//no children
				}
			} else {
				//both children are filled
				if ((r.left != null) & (r.right != null)) {
					let rp = r;
					let removeOne = rp.left;
					while (removeOne.right != null) {
						rp = removeOne;
						removeOne = removeOne.right;
					}
					let t = r.data;
					r.data = removeOne.data;
					removeOne.data = t;
				} else {
					return this.#removeNode(parent, r);
				}
			}
		}
		return null;
	} // // Private Methods -- new to ECMA2022
	// #removeNode(node) {}
	// #findNode(data) {}

	/* Other methods as needed */

	debug() {
		console.log(this.#root);
	}
}
module.exports = {
	BSTree,
};
