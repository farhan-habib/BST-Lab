const { ConversionUtil } = require("./Utils/Conversionutil");

class Item {
	#name = ""; // Cannot be null
	#stock = 0; // All values allowed
	#price = 0.0; // Cannot be negative
	/**
	 *
	 * @param {String} name Name of item
	 */
	constructor(name = "") {
		if (!name) name = "";

		this.#name = name;
		this.#stock = 0;
		this.#price = 0.0;
	}
	// Add Appropriate getters and setters
	get name() {
		return this.#name;
	}
	set name(name) {
		if (name != null) name = "";
		this.#name = name;
	}
	set stock(stock) {
		this.#stock = stock;
	}

	get stock() {
		return this.#stock;
	}

	get price() {
		return this.#price;
	}

	set price(price) {
		if (!(price >= 0)) throw "Price can not be negative";
		this.#price = price;
	}
	/**
	 *
	 * @returns {String} Returns a stringified version of the Item. In form:
	 * {"name":"Shoes of Negligible Looks","stock":-7,"cost":"$52.81"}
	 */
	toString() {
		return `{"name":"${this.name}","stock":${
			this.stock
		},"cost":"${ConversionUtil.numberToDollar(this.price)}"}`;
	}
}
module.exports = {
	Item,
};
