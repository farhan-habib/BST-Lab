const fs = require("fs");

const { BSTree } = require("./BST.js");
const { Item } = require("./item.js");
const { ConversionUtil } = require("./Utils/Conversionutil.js");

/**
 * dataArray is an array containing strings of JSON objects
 *
 * Example:
 * {"name":"Shoes of Negligible Looks","stock":-7,"cost":"$52.81"}
 */
const dataArray = fs
	.readFileSync("./inventory.txt", "utf8")
	.toString()
	.split("\n");

let NameSortBSt = new BSTree((itemA, itemB) => {
	if (itemA.getName().localeCompare(itemB.getName()) === 0) {
		return 0;
	} else if (itemA.getName().localeCompare(itemB.getName()) > 0) {
		return 1;
	} else {
		return -1;
	}
});

for (let element of dataArray) {
	try {
		element = JSON.parse(element);
		let ItemObject = new Item(element.name);
		ItemObject.setStock(element.stock);
		ItemObject.setPrice(ConversionUtil.dollarToNumber(element.cost));

		//put into both BSTs
		NameSortBSt.add(ItemObject);
	} catch (e) {
		console.log(e);
	}
}
console.log(NameSortBSt.inOrder().map((m) => m.getName()));
