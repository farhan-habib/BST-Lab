class Item {
	#name = ""; // Cannot be null
	#stock = 0; // All values allowed
	#price = 0.0; // Cannot be negative

	constructor(name = "") {
		if (!name) name = "";

		this.#name = name;
		this.#stock = 0;
		this.#price = 0.0;
	}
	// Add Appropriate getters and setters

	getName() {
		return this.#name;
	}
	setName(name) {
		if (name != null) name = "";
		this.#name = name;
	}

	setStock(stock) {
		this.#stock = stock;
	}
	getStock(stock) {
		return this.#stock;
	}

	setPrice(price) {
		if (!(price >= 0)) throw "Price can not be negative";
		this.#price = price;
	}
	getPrice() {
		return this.#price;
	}

	DEBUG() {
		return this.getName() + " : " + this.getStock() + " : " + this.getPrice();
	}
}
module.exports = {
	Item,
};
