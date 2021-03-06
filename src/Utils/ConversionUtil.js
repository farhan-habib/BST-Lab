/**
 * Contains simple Conversion utility.
 */
class ConversionUtil {
	/**
	 *
	 * @param {String} String The dollar amount that is turned into a number. Note: Dollar amount must be in the form $0.00
	 * @returns {Number}
	 */
	static dollarToNumber(String) {
		return +String.substring(1); //first it removes the first char of the string "$0.00" -> "0.00". Then, uses the unary operator in order to turn it into a number.
	}
	/**
	 *
	 * @param {Number} Number Turns the inputted Number into a string, then adds a $ to the start, and returns it
	 * @returns
	 */
	static numberToDollar(Number) {
		return "$" + Number;
	}
}

module.exports = {
	ConversionUtil,
};
