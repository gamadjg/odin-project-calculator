// Create display arr
let displayArr = [];
let errors = [];
let history = [];
let parenCount = 0;

// Find the element with the id, display, and update its inner html
const updateDisplay = (operation) => {
	$("#display").html(operation);
};

const calculate = (operation) => {
	// If there are an uneven number of open and closed parenthesis in the operation
	if (parenCount != 0) {
		errors.push("Incorrect parenthesis.");
	}

	// If the last character in displayArr is an operator, operation not complete.
	if (
		isNaN(displayArr[displayArr.length - 1]) &&
		displayArr[displayArr.length - 1] != ")" &&
		displayArr[displayArr.length - 1] != "("
	) {
		errors.push("Incomplete operation.");
	}

	// Operation g2g, evaluate, update displayArr with result and update dom
	if (errors.length > 0) {
		errors.forEach((error) => {
			$("<div></div>").html(error).addClass("text-red-400").appendTo("#errors");
		});
		errors = [];
	} else {
		$("#errors").html("");

		operation = operation.join("");
		console.log(operation);
		const result = eval(operation);

		displayArr = [result];
		updateDisplay(result);

		history.push(operation);
		$("#history").html("");
		history.forEach((item) => {
			$("<li></li>").html(item).addClass("").appendTo("#history");
		});
	}
};

const keySelect = (event) => {
	// if 'e' is a number, add it to the displayArr
	if (!isNaN(event)) {
		displayArr.push(event);
		updateDisplay(displayArr);
	}
	// If 'e' is not a number
	else {
		if (event == "Enter") {
			event = "=";
		}
		switch (event) {
			// Clear display
			case "Clear":
				displayArr = [];
				parenCount = 0;
				updateDisplay(displayArr);
				break;
			// Remove the last character in displayArr and update display
			case "Del":
				displayArr.pop();
				updateDisplay(displayArr);
				break;
			// Calculate operation, pass into displayArr and update display
			case "=":
				calculate(displayArr);
				break;
			case "(":
				console.log("close parens");
				displayArr.push(event);
				updateDisplay(displayArr);
				parenCount++;
				break;
			// Check to see if there was a corresponding parenthesis before proceeding
			case ")":
				console.log("close parens");
				displayArr.push(event);
				updateDisplay(displayArr);
				parenCount--;
				break;
			// All basic operands resort to default state, +, -, *, /
			default:
				// If the last character in the displayArr is an operator, replace it.
				if (
					isNaN(displayArr[displayArr.length - 1]) &&
					displayArr[displayArr.length - 1] != ")" &&
					displayArr[displayArr.length - 1] != "(" &&
					event != "."
				) {
					displayArr.pop();
				}
				// Regular operand push onto displayArr
				displayArr.push(event);
				updateDisplay(displayArr);
				break;
		}
	}
};

$(document).ready(function () {
	$("button").click((event) => {
		keySelect(event.target.innerHTML);
	});
	$(document).keypress((event) => {
		event.preventDefault();
		// console.log(event);
		keySelect(event.key);
	});
});
