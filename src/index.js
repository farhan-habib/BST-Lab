const fs = require("fs");

const { BSTree } = require("./BST.js");

/**
 * dataArray is an array containing strings of JSON objects
 *
 * Example:
 * {"name":"Shoes of Negligible Looks","stock":-7,"cost":"$52.81"}
 */
// const dataArray = fs
// 	.readFileSync("./inventory.txt", "utf8")
// 	.toString()
// 	.split("\n");

// for (const element of dataArray) {
// 	try {
// 		jsonArray.push(JSON.parse(element));
// 		//put into both BSTs
// 	} catch (e) {
// 		/* */
// 	}
// }

let x = new BSTree((a, b) => {
	// < 0 if a < b
	// = 0 if a == b
	// > 0 if a > b
	if (a < b) return -1;
	if (a == b) return 0;
	if (a > b) return 1;
});

let arr = [1, -10, 3, 2, 4];

for (let index = 0; index < arr.length; index++) {
	x.add(arr[index]);
}
console.log(x.inOrder());
x.remove(1);
console.log(x.inOrder());
