class BSTree {
	static BSTNode = class {
		constructor(data) {
			this.data = data;
			this.left = null;
			this.right = null;
		}
	};

	// Private -- new to ECMA2022
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

	add(data) {}
	remove(data) {}
	inOrder() {}

	// Private Methods -- new to ECMA2022
	#removeNode(node) {}
	#findNode(data) {}

	/* Other methods as needed */
}
module.exports = { BSTree };
