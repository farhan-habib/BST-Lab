const fs = require("fs");

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

jsonArray = [];
for (const element of dataArray) {
	try {
		jsonArray.push(JSON.parse(element));
	} catch (e) {
		/* */
	}
}
//jsonArray is an array that contains javascript objects with the form {"name":"Shoes of Negligible Looks","stock":-7,"cost":"$52.81"}
