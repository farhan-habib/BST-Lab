const fs = require("fs");

const { BSTree } = require("./BST.js");
const { Item } = require("./item.js");
const { ConversionUtil } = require("./Utils/Conversionutil.js");

//		File Input
const dataArray = fs
	.readFileSync("./inventory.txt", "utf8")
	.toString()
	.split("\n");
//		BST/Logic
let NameSortBSt = new BSTree((itemA, itemB) => {
	if (itemA.name.localeCompare(itemB.name) === 0) {
		return 0;
	} else if (itemA.name.localeCompare(itemB.name) > 0) {
		return 1;
	} else {
		return -1;
	}
});

for (let i = 0; i < dataArray.length; i++) {
	let element = dataArray[i];
	if (element.trim().length > 0) {
		element = JSON.parse(element);
		let ItemObject = new Item(element.name);
		ItemObject.stock = element.stock;
		ItemObject.price = ConversionUtil.dollarToNumber(element.cost);
		let itemDup = NameSortBSt.remove(ItemObject);
		if (itemDup != null) {
			ItemObject.stock = ItemObject.stock + itemDup.stock;
			ItemObject.price = (ItemObject.price + itemDup.price) / 2;
		}
		if (ItemObject.price > 0) NameSortBSt.add(ItemObject);
	}
}

//File Output
let SortedArr = NameSortBSt.inOrder();
SortedArr = SortedArr.filter((item) => !(item.stock <= 0));

let output = `There are ${SortedArr.length} unique items in stock.\n\n\n`;

output = output + SortedArr.join("\n");
fs.writeFile("storeData.txt", output, function (err) {
	if (err) throw err;
});
